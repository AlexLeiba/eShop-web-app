import React, { type SetStateAction } from 'react';
import { cn } from '../../lib/utils';

type Props = {
  colors: string[];
};
function Colors({ colors }: Props) {
  const [selected, setSelected] = React.useState<SetStateAction<string>>('');
  return (
    <div className='flex gap-2'>
      {colors.map((color) => {
        return (
          <div key={color} className='flex gap-1 transition-all'>
            <div
              onClick={() => setSelected(color)}
              className={cn(
                selected === color && 'border border-black',
                'size-6 rounded-full  cursor-pointer hover:opacity-50 '
              )}
              style={{ backgroundColor: color }}
            ></div>

            {selected === color && <p>{color}</p>}
          </div>
        );
      })}
    </div>
  );
}

export default Colors;
