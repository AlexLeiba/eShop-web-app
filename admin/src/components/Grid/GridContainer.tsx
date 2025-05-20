import './GridContainer.scss';

type Props = {
  children: React.ReactNode;
  fluid?: boolean;
};
export function GridContainer({ children, fluid }: Props) {
  return (
    <div className={fluid ? 'container-fluid' : 'container'}>{children}</div>
  );
}
