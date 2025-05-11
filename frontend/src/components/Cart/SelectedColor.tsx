import { cn } from '../../lib/utils';

type Props = {
  color: string;
};
function SelectedColor({ color }: Props) {
  return (
    <div className='flex gap-2'>
      <div key={color} className='flex gap-1 transition-all'>
        <div
          className={cn(
            'size-6 rounded-full  cursor-pointer hover:opacity-50 border border-gray-400'
          )}
          style={{ backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
}

export default SelectedColor;
