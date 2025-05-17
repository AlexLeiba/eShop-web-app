import { IconLoader } from '@tabler/icons-react';
import { cn } from '../../lib/utils';

type Props = {
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
};
export function Loader({ children, loading, className }: Props) {
  return (
    <>
      {loading ? (
        <div className={cn('flex justify-center items-center ', className)}>
          <IconLoader className='animate-spin' />
        </div>
      ) : (
        children
      )}
    </>
  );
}
