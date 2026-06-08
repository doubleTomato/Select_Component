import { useState } from "react";
import type { Option } from '../shared/types/select';
import { BaseSelect } from "./BaseSelect";
// MultiSelect.tsx
export const MultiSelect = ( options ) => {
  const [selectedValues, setSelectedValues] = useState<Option[]>([]); // 상태가 배열!

  // 💡 다중 선택만의 특별한 상태 조작 로직
  const handleToggle = (clickedItem: Option) => {
    setSelectedValues((prev) => {
      const isAlreadySelected = prev.some((item) => item.id === clickedItem.id);
      if (isAlreadySelected) {
        return prev.filter((item) => item.id !== clickedItem.id); // 빼기
      }
      return [...prev, clickedItem]; // 넣기
    });
  };

  return (
    <BaseSelect<Option>
      items={options}
      value={selectedValues}
      
      onChange={(item) => handleToggle(item as Option)} 
      
      closeOnSelect={false} // 다중 선택
      isItemSelected={(item) => {return false; console.log(item)}}
      
      renderTrigger={() => <span>{selectedValues.length}개 선택됨</span>}
      renderItem={(item, isSelected) => 
        <div>
            {item.label}
        </div>
      }
    />
  );
}