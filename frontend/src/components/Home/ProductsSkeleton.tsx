const productsArray = new Array(8).fill(null);
export function ProductsSkeleton() {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4  ">
      {productsArray.map((_, index) => (
        <div
          key={index}
          className="w-full h-[300px] rounded-md bg-gray-200 animate-pulse"
        ></div>
      ))}
    </div>
  );
}
