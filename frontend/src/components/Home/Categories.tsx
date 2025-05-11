import { type CategoriesType } from '../../consts';

import { CategoriesCard } from './CategoriesCard';
import { Spacer } from '../ui/spacer';

type CategoriesProps = {
  data: CategoriesType[];
};
export function Categories({ data }: CategoriesProps) {
  return (
    <div className='w-full'>
      <h2 className='text-4xl font-bold'>Categories</h2>
      <Spacer sm={8} md={8} lg={8} />
      <div className='grid grid-cols-3 gap-4 '>
        {data?.map((data) => {
          return <CategoriesCard data={data} key={data.id} />;
        })}
      </div>
    </div>
  );
}
