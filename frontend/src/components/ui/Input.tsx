import { IconSend } from "@tabler/icons-react";
import React from "react";
import { cn } from "../../lib/utils";

type Props = {
  label: string;
  placeholder: string;
  value?: string;
  error?: string;
  type?: string;
  disabled?: boolean;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSend?: () => void;
};
/**
 * Input component with support for label, placeholder, value, error, type, onChange,
 * handleSend, disabled, and any other HTML attributes.
 *
 * @param {Props} props - The props object containing all the necessary properties.
 * @param {string} props.label - The label for the input.
 * @param {string} props.placeholder - The placeholder for the input.
 * @param {string} [props.value] - The value of the input.
 * @param {string} [props.error=''] - The error message to display.
 * @param {string} [props.type='text'] - The type of the input.
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} [props.onChange] - The onChange event handler.
 * @param {() => void} [props.handleSend] - The function to handle the send event.
 * @param {...React.HTMLAttributes<HTMLInputElement>} [props] - Any other HTML attributes.
 * @returns {JSX.Element} The rendered Input component.
 */
export function Input({
  label,
  placeholder,
  value,
  error = "",
  type = "text",
  onChange,
  handleSend,
  ...props
}: Props & React.HTMLAttributes<HTMLInputElement>) {
  return (
    <div className="w-full relative">
      {label && <label htmlFor={type}>{label}</label>}
      <input
        {...props}
        className={cn(
          handleSend ? "pr-10" : "pr-4",
          "shadow focus-within:shadow-2xl  w-full bg-white dark:bg-gray-400 focus:text-white focus:placeholder:text-white text-black rounded-full py-2 pl-4  focus:border-none focus:outline-none focus:bg-gray-400 transition-all"
        )}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {handleSend && (
        <IconSend
          onClick={handleSend}
          className="size-6 text-black hover:text-gray-500 cursor-pointer absolute right-4 top-2"
        />
      )}
      {error && <p className="text-red-500 text-xs mt-px">{error}</p>}
    </div>
  );
}
