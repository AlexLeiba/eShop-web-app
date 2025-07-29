import { Link } from 'react-router-dom';

type Props = {
  name: string;
  slug: string;
};
export function NavLinks({ name, slug }: Props) {
  return (
    <div>
      <Link to={slug} title={name}>
        {name}
      </Link>
    </div>
  );
}
