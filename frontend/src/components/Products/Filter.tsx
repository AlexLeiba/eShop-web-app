import React, { useEffect, type SetStateAction } from 'react';
import { Select } from '../ui/Select';
import { useSearchParams } from 'react-router-dom';

type Props = {
  type: 'color' | 'size' | 'sort' | 'category';
  label?: string;
  data: string[];
};
function Filter({ type, label, data }: Props) {
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
        const colorData = [
          {
            value: 'allColors',
            title: 'All Colors',
          },
        ];
        data.forEach((item) => {
          colorData.push({
            value: item.replace(/\s+/g, '').toLowerCase(),
            title: item,
          });
        });

        return colorData;

      case 'size':
        const sizeData = [{ value: 'allSizes', title: 'All Sizes' }];
        data.forEach((item) => {
          sizeData.push({
            value: item.replace(/\s+/g, '').toLowerCase(),
            title: item,
          });
        });

        return sizeData;

      case 'sort':
        return [
          { value: 'newest', title: 'Newest' },
          { value: 'oldest', title: 'Oldest' },
        ];
      case 'category':
        const categoryData = [
          { value: 'allCategories', title: 'All Categories' },
        ];
        data.forEach((item) => {
          categoryData.push({
            value: item.replace(/\s+/g, '').toLowerCase(),
            title: item,
          });
        });

        return categoryData;

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
