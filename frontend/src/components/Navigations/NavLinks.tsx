import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

type Props = {
  name: string;
  slug: string;
};
export function NavLinks({ name, slug }: Props) {
  return (
    <div>
      <Link to={slug} title={name}>
        <Button size='small'>{name}</Button>
      </Link>
    </div>
  );
}
