type Props = {
  price: number;
  discountPrice: number;
};
export function Price({ price, discountPrice }: Props) {
  return (
    <>
      {discountPrice ? (
        <p className="text-3xl">
          <span className="line-through text-gray-200 mr-2 text-xl">
            ${price}
          </span>
          ${discountPrice}
        </p>
      ) : (
        <p className="text-3xl">${price}</p>
      )}
    </>
  );
}
