import { IconChevronDown } from "@tabler/icons-react";

type SelectData = {
  value: string;
  title: string;
};
type Props = {
  value?: string;
  data: SelectData[];
  label?: string;
  handleSelect: (value: string) => void;
};
/**
 * Select component with support for label, value, data, and handleSelect.
 *
 * @param {Props} props - The props object containing all the necessary properties.
 * @param {SelectData[]} props.data - The data for the select options.
 * @param {string} [props.label] - The label for the select.
 * @param {string} [props.value] - The value of the select.
 * @param {(value: string) => void} props.handleSelect - The function to handle the select event.
 * @returns {JSX.Element} The rendered Select component.
 */
export function Select({ data, label, value, handleSelect }: Props) {
  return (
    <div className="relative group">
      {label && (
        <label htmlFor={label}>
          <p className="text-1xl font-bold ">{label}</p>
        </label>
      )}
      <select
        name={label}
        id={label}
        value={value}
        onChange={(e) => handleSelect(e.target.value)}
        className="cursor-pointer dark:text-black  h-10 text-black rounded-full py-2 px-8 focus:border-none  dark:bg-gray-300 dark:hover:bg-gray-400  bg-gray-200 transition-all z-10 hover:shadow-md   "
      >
        {data.map((item) => {
          return (
            <option key={item.title} value={item.value}>
              {item.title}
            </option>
          );
        })}
      </select>
      <IconChevronDown className="absolute top-3 right-3 w-4 h-4 text-gray-500 pointer-events-none dark:group-hover:text-white " />
    </div>
  );
}
