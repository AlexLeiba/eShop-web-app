import React, { type SetStateAction } from 'react';
import { Select } from '../ui/Select';

type Props = {
  type: 'color' | 'size' | 'date';
  label?: string;
};
function Filter({ type, label }: Props) {
  const [selected, setSelected] = React.useState<SetStateAction<string>>('');
  console.log('🚀 ~ Filter ~ selected:', selected, type);

  function handleTypeOfFilter() {
    switch (type) {
      case 'color':
        return [
          { value: '1', title: 'Color' },
          { value: '2', title: 'Red' },
          { value: '3', title: 'Blue' },
          { value: '4', title: 'Green' },
          { value: '5', title: 'Yellow' },
          { value: '6', title: 'Pink' },
          { value: '7', title: 'Purple' },
          { value: '8', title: 'Black' },
          { value: '9', title: 'White' },
        ];

      case 'size':
        return [
          { value: '1', title: 'Size' },
          { value: '2', title: 'XS' },
          { value: '2', title: 'S' },
          { value: '3', title: 'M' },
          { value: '4', title: 'L' },
          { value: '5', title: 'XL' },
          { value: '6', title: 'XXL' },
        ];

      case 'date':
        return [
          { value: '1', title: 'Newest' },
          { value: '2', title: 'Oldest' },
          { value: '3', title: 'Last Month' },
          { value: '4', title: 'Last Year' },
        ];

      default:
        return [];
    }
  }
  return (
    <div>
      <Select
        handleSelect={setSelected}
        label={label}
        data={handleTypeOfFilter()}
      />
    </div>
  );
}

export default Filter;
