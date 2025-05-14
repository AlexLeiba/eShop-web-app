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
          { value: 'allColors', title: 'All Colors' },
          { value: 'red', title: 'Red' },
          { value: 'blue', title: 'Blue' },
          { value: 'green', title: 'Green' },
          { value: 'yellow', title: 'Yellow' },
          { value: 'pink', title: 'Pink' },
          { value: 'purple', title: 'Purple' },
          { value: 'black', title: 'Black' },
          { value: 'white', title: 'White' },
        ];

      case 'size':
        return [
          { value: 'allSizes', title: 'All Sizes' },
          { value: 'xs', title: 'XS' },
          { value: 's', title: 'S' },
          { value: 'm', title: 'M' },
          { value: 'l', title: 'L' },
          { value: 'xl', title: 'XL' },
          { value: 'xxl', title: 'XXL' },
        ];

      case 'sort':
        return [
          { value: 'newest', title: 'Newest' },
          { value: 'oldest', title: 'Oldest' },
        ];
      case 'category':
        return [
          { value: 'allCategories', title: 'All Categories' },
          { value: 'accessories', title: 'Accessories' },
          { value: 'bags', title: 'Bags' },
          { value: 'shoes', title: 'Shoes' },
          { value: 'shirts', title: 'Shirts' },
          { value: 'pants', title: 'Pants' },
        ];

      default:
        return [];
    }
  }
  return (
    <div>
      <Select
        value={searchParams.get(type) || ''}
        handleSelect={setSelected}
        label={label}
        data={handleTypeOfFilter()}
      />
    </div>
  );
}

export default Filter;
