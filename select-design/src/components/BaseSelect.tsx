// 기본 뼈대 Select

import { useState } from "react";
import type { BaseSelectProps } from "../shared/types/select"

export const BaseSelect = <T,>({
  value,
  onChange,
  items,
  disabled = false,
  placeholder = '선택해주세요',
  renderTrigger,
  renderItem,
  isItemSelected,
  closeOnSelect = true,
  renderList,
  classN=''
}:BaseSelectProps<T>) => {
   const [isOpen, setIsOpen] = useState(false);
 return (
    <div className={`relative mb-20 max-w-fit ${classN}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-2 border rounded text-left ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
      >
        {renderTrigger ? renderTrigger() :(value ? String(value) : placeholder)}
      </button>

      {renderList ? (renderList(items)) : (
        isOpen &&
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
          {items.map((item, index) => {
            const isSelected = isItemSelected(item);
            return <li onClick={()=>{
                onChange(item);
                if (closeOnSelect) setIsOpen(false);
            }} key={index} className={`cursor-pointer hover:bg-gray-50 ${ isSelected ? 'bg-gray-200' : ''}`}>
              {renderItem ? renderItem(item, isSelected) : null}
            </li>
        })}
        </ul>
      )}
    </div>
  );
};