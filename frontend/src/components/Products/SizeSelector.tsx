import { Select } from "../ui/Select";
import { useDispatch, useSelector } from "react-redux";
import { selectSize } from "../../store/filters/reducer";
import type { RootState } from "../../store/store";

type Props = {
  type: "color" | "size" | "sort" | "category";
  label?: string;
  data: string[];
};
/**
 * SizeSelector component renders a select input with sizes as options.
 *
 * @param {Props} props - The props object containing all the necessary properties.
 * @param {string} props.type - The type of filter.
 * @param {string} [props.label] - The label for the select input.
 * @param {string[]} props.data - The array of sizes.
 * @return {JSX.Element} The rendered SizeSelector component.
 */
export function SizeSelector({ label, data }: Props) {
  const dispatch = useDispatch();
  const selectedSize = useSelector((state: RootState) => state.filters.size);

  function handleTypeOfFilter() {
    const sizeData = [{ value: "Selectsize", title: "Select size" }];
    data?.forEach((item) => {
      sizeData.push({
        value: item.replace(/\s+/g, "").toLowerCase(),
        title: item.toUpperCase(),
      });
    });

    return sizeData;
  }
  return (
    <div>
      <Select
        value={selectedSize as string}
        handleSelect={(v) => dispatch(selectSize(v))}
        label={label}
        data={handleTypeOfFilter()}
      />
    </div>
  );
}
