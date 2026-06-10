// 기본 뼈대 Select

import { useState, useRef, useEffect } from "react";
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
  classN = '',
  onClear
}: BaseSelectProps<T> & { onClear?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
      // 다른 곳 클릭 시 닫기
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={`relative mb-20 min-w-50 max-w-100 group ${classN}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-2 border rounded text-left  pr-8 ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
      >
        {renderTrigger ? renderTrigger() : (value ? String(value) : placeholder)}
      </button>
      {/* 초기화 버튼 */}
      {onClear && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // 부모 안열리게
            onClear(); // 지우는 함수 호출
          }}
          className="absolute right-2 top-2.5 hidden group-hover:flex items-center justify-center w-5 h-5 bg-gray-200 rounded-full text-gray-500 cursor-pointer  hover:bg-gray-300 text-sm"
          title="초기화"
        >
          ✕
        </button>
      )}

      {isOpen && (
        renderList ? (
          renderList(items)
        ) : (
          <ul role="listbox" className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
            {items.map((item, index) => {
              const isDisabled = (item as { disabled?: boolean })?.disabled;
              const isSelected = isItemSelected(item);
              return (
                <li
                  key={index}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    if(isDisabled) return; // 비활성화된 항목은 클릭 무시
                    onChange(item);
                    if (closeOnSelect) setIsOpen(false);
                  }}
                  className={`cursor-pointer hover:bg-gray-50 ${isSelected ? 'bg-gray-200 hover:bg-gray-200' : ''} ${isDisabled ? 'text-gray-400 cursor-not-allowed bg-gray-100 hover:bg-gray-100' : ''}`}
                >
                  {renderItem ? renderItem(item, isSelected) : null}
                </li>
              );
            })}
          </ul>
        )
      )}
    </div>
  );
};