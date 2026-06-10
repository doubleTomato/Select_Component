import { useState } from "react";
import type { Option } from '../shared/types/select';
import { BaseSelect } from "./BaseSelect";
export const MultiSelect = ( { options }: { options: Option[] } ) => {
  const [selectedValues, setSelectedValues] = useState<Option[]>([]); // 상태 배열로 관리

  const handleToggle = (clickedItem: Option) => {
    setSelectedValues((prev) => {
      const isAlreadySelected = prev.some((item) => item.id === clickedItem.id);
      if (isAlreadySelected) {
        return prev.filter((item) => item.id !== clickedItem.id); // 빼기
      }
      return [...prev, clickedItem]; // 넣기
    });
  };
  const selectedItems =  selectedValues.map((x) => x.label).join(',');
  return (
    <BaseSelect<Option>
      items={options}
      value={selectedValues}
      onChange={(item) => handleToggle(item as Option)} 
      closeOnSelect={false} // 다중 선택
      isItemSelected={(item) => { return selectedValues.some(sel => sel.id === item.id);}}
      renderTrigger={() => <p title={selectedItems} className="truncate">{selectedValues.length > 0  ? selectedItems:"과일을 선택해주세요."}</p>}
      renderItem={(item, isSelected) => {
        return <div className="text-left pl-5 py-2.5 border-b cursor-pointer hover:bg-gray-50">
            <input type="checkbox" name="item[]" value="1" checked={isSelected}/>
            <span className="inline-block ml-2.5">{item.label}</span>
        </div>
      }}
    />
  );
}