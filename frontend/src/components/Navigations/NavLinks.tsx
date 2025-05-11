import { Link } from 'react-router-dom';

type Props = {
  name: string;
  slug: string;
};
export function NavLinks({ name, slug }: Props) {
  return (
    <div>
      <Link target='_blank' to={`${slug}`}>
        {name}
      </Link>
    </div>
  );
}
