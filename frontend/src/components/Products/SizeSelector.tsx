import React from 'react';
import { Select } from '../ui/Select';

type Props = {
  type: 'color' | 'size' | 'sort' | 'category';
  label?: string;
  data: string[];
  setSize: React.Dispatch<
    React.SetStateAction<{
      size: string;
      color: string;
      quantity: number;
    }>
  >;
  size: string;
};
export function SizeSelector({ label, data, size, setSize }: Props) {
  //   const [selected, setSelected] = React.useState<SetStateAction<string>>('');
  function handleTypeOfFilter() {
    const sizeData = [{ value: 'Selectsize', title: 'Select size' }];
    data?.forEach((item) => {
      sizeData.push({
        value: item.replace(/\s+/g, '').toLowerCase(),
        title: item.toUpperCase(),
      });
    });

    return sizeData;
  }
  return (
    <div>
      <Select
        value={size as string}
        handleSelect={(v) => setSize((prev) => ({ ...prev, size: v }))}
        label={label}
        data={handleTypeOfFilter()}
      />
    </div>
  );
}
