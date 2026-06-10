
export interface Option {
  id: string;
  label: string;
  disabled?: boolean;// option 비활성화 (부모/자식)
  children?: Option[]; // 트리구조를 위해
}


export interface BaseSelectProps<T> { 
    value: T | T[] | null 
    onChange: (value: T | T[] | null) => void 
    items: T[] 
    disabled?: boolean 
    placeholder?: React.ReactNode
    renderTrigger?: () => React.ReactNode;          
    renderItem?: (item: T, isSelected: boolean) => React.ReactNode;
    isItemSelected: (item: T) => boolean; // 선택 되어있는지 체크
    closeOnSelect?: boolean; // 단일은 true / 외는 false 
    renderList?: (items: T[]) => React.ReactNode;
    classN?:string; // 혹시라도 추가되는 class
}