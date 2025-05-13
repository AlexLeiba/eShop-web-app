import React, { useEffect, type SetStateAction } from 'react';
import { Select } from '../ui/Select';
import { useSearchParams } from 'react-router-dom';

type Props = {
  type: 'color' | 'size' | 'sort' | 'category';
  label?: string;
};
function Filter({ type, label }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = React.useState<SetStateAction<string>>('');

  useEffect(() => {
    handleAddQueryParams();
  }, [selected]);

  function handleAddQueryParams() {
    if (selected) {
      const params = new URLSearchParams(searchParams);

      switch (selected.toString().toLowerCase().replace(/\s+/g, '')) {
        case 'allcolors':
          params.delete('color');
          return setSearchParams(params);

        case 'allsizes':
          params.delete('size');
          return setSearchParams(params);

        case 'allcategories':
          params.delete('category');
          return setSearchParams(params);

        default:
          break;
      }

      params.set(type, selected.toString().toLowerCase() as string);
      setSearchParams(params);
    }
  }

  function handleTypeOfFilter() {
    switch (type) {
      case 'color':
        return [
          { value: '1', title: 'All Colors' },
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
          { value: '1', title: 'All Sizes' },
          { value: '2', title: 'XS' },
          { value: '2', title: 'S' },
          { value: '3', title: 'M' },
          { value: '4', title: 'L' },
          { value: '5', title: 'XL' },
          { value: '6', title: 'XXL' },
        ];

      case 'sort':
        return [
          { value: '1', title: 'Newest' },
          { value: '2', title: 'Oldest' },
        ];
      case 'category':
        return [
          { value: '1', title: 'All Categories' },
          { value: '2', title: 'Accessories' },
          { value: '3', title: 'Bags' },
          { value: '4', title: 'Shoes' },
          { value: '5', title: 'Shirts' },
          { value: '6', title: 'Pants' },
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
