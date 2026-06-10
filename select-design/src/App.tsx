import { useState } from 'react';
import './App.css';
import type { Option } from './shared/types/select';
import { BaseSelect } from './components/BaseSelect';
import { MultiSelect } from './components/MultiSelect';
import { TreeSelect } from './components/TreeSelect';
import { multiOptions, options, TreeOption, multiDepthOptions } from './constants/data';

function App() {

  const [selectedValue, setSelectedValue] = useState<Option | null>(null);

  return (
    <section className='py-20'>
      <div>
        <h2 className='mb-20'>Single Select</h2>
        <BaseSelect<Option>
          items={options}
          value={selectedValue}
          onChange={(val) => { setSelectedValue(val as Option);}}
          onClear={selectedValue ? () => setSelectedValue(null) : undefined}
          renderTrigger={() => <span>{selectedValue ? selectedValue.label : '과일을 선택해주세요.'}</span>}
          renderItem={(item) => <div className="p-2">{item.label}</div>}
          isItemSelected={(item) => item.id === selectedValue?.id}
        />
      </div>
      <div>
        <h2 className='align-left'>Multi Select</h2>
        <MultiSelect options={multiOptions}/>
      </div>
      <div>
        <h2 className='align-left'>Tree Select</h2>
        <TreeSelect options={TreeOption}/>
      </div>
      <div>
        <h2 className='align-left'>Multi Depth Tree Select</h2>
        <TreeSelect options={multiDepthOptions}/>
      </div>
    </section>
  );
}

export default App
