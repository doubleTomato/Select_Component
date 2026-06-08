import { useState } from 'react';
import './App.css';
import type { Option } from './shared/types/select';
import { BaseSelect } from './components/BaseSelect';
import { MultiSelect } from './components/MultiSelect';

function App() {

  const [selectedValue, setSelectedValue] = useState<Option | null>(null);

  const options: Option[] = [
    { id: '1', label: '사과' },
    { id: '2', label: '바나나' }
  ];

  const multiOptions: Option[] = [
    { id: '1', label: '사과' },
    { id: '2', label: '바나나' },
    { id: '3', label: '딸기' },
    { id: '4', label: '망고' },
    { id: '5', label: '자몽' },
    { id: '6', label: '용과' },
    { id: '7', label: '레몬' },
    { id: '8', label: '포도' },
    { id: '9', label: '리치' },
    { id: '10', label: '수박' },
  ];


  return (
    <>
      <h2 className='mb-20'>단일 Select</h2>
      <BaseSelect<Option>
        items={options}
        value={selectedValue}
        onChange={(val) => setSelectedValue(val as Option)}
        renderTrigger={() => <span>{selectedValue ? selectedValue.label : '과일 선택'}</span>}
        renderItem={(item) => <div className="p-2">{item.label}</div>}
        isItemSelected={(item) => item.id === selectedValue?.id}
      />

       <h2>멀티 Select</h2>
      <MultiSelect options={multiOptions}/>
    </>
  );
}

export default App
