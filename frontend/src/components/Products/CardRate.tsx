import { IconStarFilled } from "@tabler/icons-react";

export function CardRate({
  rating,
}: {
  rating: { userId: string; rating: number }[];
}) {
  function showAverageRating() {
    return (
      (rating?.length &&
        rating?.reduce((acc, curr) => acc + curr.rating, 0) / rating?.length) ||
      0
    ).toFixed(1);
  }
  function showNrOfVotes() {
    return (
      (rating?.length > 0 &&
        rating.filter((data) => {
          return data.rating > 0;
        }).length) ||
      0
    );
  }
  return (
    <div className="flex items-center  gap-1 justify-end w-full absolute top-2 right-2">
      <IconStarFilled color="#efce11" size={18} />
      <div className="flex items-end h-full gap-1">
        <p className="text-xl dark:text-white">{showAverageRating()}</p>
        <p className="text-lg dark:text-gray-300">/</p>
        <p className="text-lg dark:text-gray-300">5</p>
      </div>
      <p className="text-xs dark:text-gray-300">( {showNrOfVotes()} )</p>
    </div>
  );
}
