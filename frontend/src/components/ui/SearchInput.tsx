import { IconSearch, IconX } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../store/search/reducer";
import type { RootState } from "../../store/store";

type Props = {
  label: string;
  placeholder?: string;
  error?: string;
  type?: string;
  disabled?: boolean;
};
/**
 * A component for a search input field with label, placeholder, error, type, disabled, and search functionality.
 *
 * @param {Props} props - The props object containing all the necessary properties.
 * @param {string} props.label - The label for the input.
 * @param {string} [props.placeholder] - The placeholder for the input. Defaults to 'Search'.
 * @param {string} [props.error=''] - The error message to display. Defaults to an empty string.
 * @param {string} [props.type='text'] - The type of the input. Defaults to 'text'.
 * @param {boolean} [props.disabled=false] - Whether the input is disabled or not. Defaults to false.
 * @returns {JSX.Element} The rendered SearchInput component.
 */
export function SearchInput({
  label,
  placeholder,
  error = "",
  type = "text",
}: Props) {
  const dispatch = useDispatch();
  const searchValue = useSelector(
    (state: RootState) => state.search.searchTerm
  );

  return (
    <div className="min-w-[150px] relative h-8">
      <IconSearch
        className="absolute top-2 left-2 text-black dark:text-white"
        size={18}
      />
      {searchValue !== "" && (
        <IconX
          title="Clear search"
          onClick={() => dispatch(setSearchTerm(""))}
          className="absolute top-2 right-2 text-black cursor-pointer dark:text-white"
          size={18}
        />
      )}
      {label && <label htmlFor={type}>{label}</label>}
      <input
        className="hover:shadow dark:bg-gray-700 bg-white dark:border-1 dark:border-white focus:text-white focus:placeholder:text-white text-black dark:text-white rounded-full w-full pl-8 pr-8 h-full focus:border-none focus:outline-none focus:bg-gray-400 dark:focus:bg-gray-500 transition-all"
        type={type}
        placeholder={placeholder || "Search"}
        value={searchValue}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
