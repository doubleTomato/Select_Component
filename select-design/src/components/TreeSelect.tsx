import { useState } from "react";
import type { Option } from '../shared/types/select';
import { BaseSelect } from "./BaseSelect";

// 자식 재귀호출
const RecursiveTreeNode = ({ 
  item, 
  depth, 
  selectedValues, 
  onToggle 
}: { 
  item: Option; 
  depth: number; 
  selectedValues: Option[]; 
  onToggle: (item: Option) => void 
}) => {
  const isSelected = selectedValues.some((sel) => sel.id === item.id);

  return (
    <div className="text-left">
      <div
        className="py-2.5 border-b cursor-pointer hover:bg-gray-50 flex items-center"
        style={{ paddingLeft: `${depth * 20 + 20}px` }} //깊이가 깊어질 때마다 20px
        onClick={(e) => {
          e.stopPropagation(); // 버블링 방지
          onToggle(item);
        }}
      >
        <input type="checkbox" checked={isSelected} readOnly />
        <span className={`inline-block ml-2.5 ${item.disabled ? 'text-gray-400' : ''}`}>
          {item.label}
        </span>
      </div>

      {/* 자식이 있다면 다시 호출  */}
      {item.children?.map((child) => (
        <RecursiveTreeNode
          key={child.id}
          item={child}
          depth={depth + 1} // 깊이 증가
          selectedValues={selectedValues}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export const TreeSelect = ({ options }: { options: Option[] }) => {
  const [selectedValues, setSelectedValues] = useState<Option[]>([]);

  // 부모의 모든 하위 자손 id를 수집 => 여러 deps에도 동작하도록
  const getAllChildren = (item: Option): Option[] => {
    let result: Option[] = [];
    item.children?.forEach((child) => {
      result.push(child);
      result = [...result, ...getAllChildren(child)];
    });
    return result;
  };

  const handleToggle = (clickedItem: Option) => {
    if (clickedItem.disabled) return;

    // disabled가 아닌 자손들만 수집 - deps상관없이 찾기
    const getMutableChildren = (item: Option): Option[] => {
      let result: Option[] = [];
      item.children?.forEach((child) => {
        if (!child.disabled) {
          result.push(child);
        }
        result = [...result, ...getMutableChildren(child)];
      });
      return result;
    };


    setSelectedValues((prev) => {
      const isAlreadySelected = prev.some((item) => item.id === clickedItem.id);
      
      // 클릭한 부모의 자손을 묶기
      const itemsToToggle = [clickedItem, ...getMutableChildren(clickedItem)];
      let updatedValues = [...prev];

      if (isAlreadySelected) {
        updatedValues = updatedValues.filter((p) => !itemsToToggle.some((t) => t.id === p.id));
      } else {
        itemsToToggle.forEach((item) => {
          if (!updatedValues.some((v) => v.id === item.id)) {
            updatedValues.push(item);
          }
        });
      }

      // 자식 - 부모 동기화 (재귀적으로 부모까지 검사)
      const syncParents = (currentValues: Option[]): Option[] => {
        let nextVal = [...currentValues];
        let changed = false;

        // 모든 부모 후보 찾기
        const findParents = (list: Option[], parentMap: Map<string, Option>) => {
          list.forEach(p => {
            if (p.children) {
              p.children.forEach(c => parentMap.set(c.id, p));
              findParents(p.children, parentMap);
            }
          });
        };

        const parentMap = new Map<string, Option>();
        findParents(options, parentMap);

        parentMap.forEach((parent) => {
          if (parent.disabled) return; // 부모가 disabled면 리턴
          const children = parent.children || [];

          // disabled가 아닌 자식들만 필터링
          const mutableChildren = children.filter(c => !c.disabled);
          
          if (mutableChildren.length === 0) return;


          const allChildrenSelected = mutableChildren.every(c => nextVal.some(v => v.id === c.id));
          const isParentSelected = nextVal.some(v => v.id === parent.id);

          if (allChildrenSelected && !isParentSelected) {
            nextVal.push(parent);
            changed = true;
          } else if (!allChildrenSelected && isParentSelected) {
            nextVal = nextVal.filter(v => v.id !== parent.id);
            changed = true;
          }
        });

        return changed ? syncParents(nextVal) : nextVal; // 변화가 없을 때까지 재귀 검사
      };

      updatedValues = syncParents(updatedValues);

      // deps 로 순서 정렬
      const getOrderedIds = (list: Option[]): string[] => {
        let ids: string[] = [];
        list.forEach(item => {
          ids.push(item.id);
          if (item.children) ids = [...ids, ...getOrderedIds(item.children)];
        });
        return ids;
      };

      const orderedIds = getOrderedIds(options);
      updatedValues.sort((a, b) => orderedIds.indexOf(a.id) - orderedIds.indexOf(b.id));

      return updatedValues;
    });
  };

  const selectedItems = selectedValues.map((x) => x.label).join(',');

  return (
    <BaseSelect<Option>
      items={options}
      value={selectedValues}
      onChange={() => {}} // 재귀 컴포넌트에서 관리
      closeOnSelect={false}
      isItemSelected={(item) => selectedValues.some((sel) => sel.id === item.id)}
      onClear={selectedValues.length > 0 ? () => setSelectedValues([]) : undefined}
      renderTrigger={() => (
        <p title={selectedItems} className="truncate">
          {selectedValues.length > 0 ? selectedItems : "항목을 선택해주세요."}
        </p>
      )}
      renderList={(items) => (
        <div className="max-h-80 overflow-y-auto z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto ">
          {items.map((item) => (
            <RecursiveTreeNode
              key={item.id}
              item={item}
              depth={0}
              selectedValues={selectedValues}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}
      classN="w-120"
    />
  );
};