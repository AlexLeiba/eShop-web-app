type Props = {
  size?: number;
};
function Spacer({ size }: Props) {
  return <div style={{ width: '100%', height: size || 12 }}></div>;
}

export default Spacer;
