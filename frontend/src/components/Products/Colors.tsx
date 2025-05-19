import React from 'react';
import { cn } from '../../lib/utils';

type Props = {
  colors: string[];
  setColor: React.Dispatch<
    React.SetStateAction<{
      color: string;
      size: string;
      quantity: number;
    }>
  >;

  selectedColor: string;
};
function Colors({ colors, setColor, selectedColor }: Props) {
  // const [selected, setSelected] = React.useState<SetStateAction<string>>('');
  return (
    <div className='flex gap-2'>
      {colors?.map((color) => {
        return (
          <div key={color} className='flex gap-1 transition-all'>
            <div
              onClick={() => setColor((prev) => ({ ...prev, color: color }))}
              className={cn(
                selectedColor === color
                  ? 'border border-gray-600 shadow-md shadow-gray-500 scale-125'
                  : 'border-gray-300 border scale-100',
                'size-6 rounded-full  cursor-pointer hover:opacity-50 shadow-md transition-all '
              )}
              style={{ backgroundColor: color }}
            ></div>

            {/* {selectedColor === color && <p>{color}</p>} */}
          </div>
        );
      })}
    </div>
  );
}

export default Colors;
