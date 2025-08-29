type Props = {
  discount: number;
  price: number;
};

export function Discount({ discount, price }: Props) {
  const discountPercent = 100 - (discount / price) * 100;
  return (
    <div className="px-2 py-1 bg-red-600 text-white rounded-r-md absolute top-0 left-0">
      {discountPercent.toFixed(0)}%
    </div>
  );
}
