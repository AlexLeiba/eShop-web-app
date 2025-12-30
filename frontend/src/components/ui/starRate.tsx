"use client";
import { IconStarFilled, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { rateProduct } from "../../store/products/apiCalls";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import type { RootState } from "../../store/store";

const stars = new Array(5).fill(0);

type Props = {
  defaultValue: { userId: string; rating: number }[];
  sessionToken: string | null;
  productId: string;
};
export function StarRate({ defaultValue, sessionToken, productId }: Props) {
  const userId = useSelector(
    (state: RootState) => state.user.userData.data._id
  );

  const [defaultStarData, setDefaultStarData] =
    useState<Props["defaultValue"]>(defaultValue);
  const [selectedStar, setSelectedStar] = useState(0);
  const [starState, setStarState] = useState(0);

  async function handleStarClick(index: number) {
    setSelectedStar(index);
    const response = await rateProduct({
      productId,
      sessionToken,
      rating: index,
    });

    if (response?.error) {
      return toast.error(response.error);
    }

    const hasUserVotedBefore = defaultStarData.find(
      (data) => data.userId === userId
    );

    if (hasUserVotedBefore) {
      setDefaultStarData((prev) => {
        return prev?.map((data) => {
          if (hasUserVotedBefore && data.userId === userId) {
            return { ...data, rating: index };
          }
          return data;
        });
      });
    }

    if (!hasUserVotedBefore) {
      setDefaultStarData((prev) => {
        return [...(prev || []), { userId, rating: index }];
      });
    }
  }
  async function handleClearRate() {
    setSelectedStar(0);
    const response = await rateProduct({
      // dispatch,
      productId,
      sessionToken,
      rating: 0,
    });

    if (response?.error) {
      return toast.error(response.error);
    }

    setDefaultStarData((prev) => {
      return prev?.filter((data) => data.userId !== userId);
    });
  }

  useEffect(() => {
    // filter by id rating
    if (defaultValue) {
      setSelectedStar(
        defaultValue?.find((data) => data.userId === userId)?.rating || 0
      );
    }
  }, [defaultValue, userId]);

  function showAverageRating() {
    return (
      (defaultStarData?.length &&
        defaultStarData?.reduce((acc, curr) => acc + curr.rating, 0) /
          defaultStarData?.length) ||
      0
    ).toFixed(1);
  }
  function showNrOfVotes() {
    return (
      (defaultStarData?.length > 0 &&
        defaultStarData.filter((data) => {
          return data.rating > 0;
        }).length) ||
      0
    );
  }
  return (
    <div className="flex items-start gap-2 flex-col group" tabIndex={0}>
      {sessionToken && (
        <div className="flex items-center gap-2 ">
          <div className=" items-center justify-end w-full gap-2 group-focus-within:flex  group-hover:flex hidden">
            {selectedStar > 0 && (
              <>
                <div className="flex  size-6 gap-1 p-2 bg-gray-200 rounded-full  justify-center items-center">
                  <p className="text-sm dark:text-black">{selectedStar}</p>
                </div>

                <IconX
                  title="Clear Rate"
                  onClick={handleClearRate}
                  className="cursor-pointer dark:text-white"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(v) => v.key === "Enter" && setSelectedStar(0)}
                />
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {stars.map((_, index) => {
              return (
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={(v) =>
                    v.key === "Enter" && handleStarClick(index + 1)
                  }
                  onMouseEnter={() => setStarState(index + 1)}
                  onMouseLeave={() => setStarState(0)}
                  key={index}
                  onClick={() => handleStarClick(index + 1)}
                  className="cursor-pointer"
                >
                  <IconStarFilled
                    style={{
                      color:
                        selectedStar >= index + 1 || starState >= index + 1
                          ? "#efce11"
                          : "#D1D5DB",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="flex items-center  gap-3 justify-end w-full">
        <div className="flex flex-col justify-center items-center">
          {!sessionToken && <IconStarFilled color="#efce11" />}
          <div className="flex items-end h-full gap-1">
            <p className="text-xl dark:text-white">{showAverageRating()}</p>
            <p className="text-lg dark:text-gray-300">/</p>
            <p className="text-lg dark:text-gray-300">5</p>
          </div>
          <p className="text-xs dark:text-gray-300">( {showNrOfVotes()} )</p>
        </div>
      </div>
    </div>
  );
}
