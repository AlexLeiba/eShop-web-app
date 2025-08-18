import { cn } from "../../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { selectColor } from "../../store/filters/reducer";
import type { RootState } from "../../store/store";

type Props = {
  colors: string[];
};
/**
 * Renders a list of color options that can be selected, and dispatches an action to update the selected color when one is clicked.
 * @param {Props} props - An object containing the array of colors to be rendered.
 * @returns A JSX element representing a list of color options.
 */
function Colors({ colors }: Props) {
  const dispatch = useDispatch();
  const selectedColor = useSelector((state: RootState) => state.filters.color);

  return (
    <div className="flex gap-2">
      {colors?.map((color) => {
        return (
          <div key={color} className="flex gap-1 transition-all">
            <div
              onClick={() => dispatch(selectColor(color))}
              className={cn(
                selectedColor === color
                  ? "border border-gray-600 shadow-md shadow-gray-500 scale-125"
                  : "border-gray-300 border scale-100",
                "size-6 rounded-full  cursor-pointer hover:opacity-50 shadow-md transition-all "
              )}
              style={{ backgroundColor: color }}
            ></div>
          </div>
        );
      })}
    </div>
  );
}

export default Colors;
