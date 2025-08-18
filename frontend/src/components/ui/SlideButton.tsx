import React from "react";
import { cn } from "../../lib/utils";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

type Props = {
  direction: "prev" | "next";
  title: string;
  disabled?: boolean;
};

/**
 * Renders a button to slide a component to the previous or next view.
 *
 * @param {string} direction - The direction of the slide ('prev' or 'next').
 * @param {boolean} [disabled=false] - Whether the button is disabled.
 * @param {React.HTMLAttributes<HTMLButtonElement>} [props] - Additional HTML attributes for the button.
 * @return {JSX.Element} The rendered slide button component.
 */
function SlideButton({
  direction,
  disabled = false,
  ...props
}: Props & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      disabled={disabled}
      {...props}
      className={cn(
        direction === "prev" ? "left-2 top-1/2" : "right-2 top-1/2",
        "z-10 disabled:bg-gray-100 disabled:pointer-events-none  disabled:text-gray-200 absolute size-10 rounded-full  bg-gray-800/50 text-white flex justify-center items-center hover:bg-gray-600 cursor-pointer transition-all"
      )}
    >
      {direction === "prev" ? <IconChevronLeft /> : <IconChevronRight />}
    </button>
  );
}

export default SlideButton;
