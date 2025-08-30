import { IconLoader } from "@tabler/icons-react";
import { cn } from "../../lib/utils";

type Props = {
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
};
/**
 * Loader component that displays a loading indicator when loading is true.
 * When loading is false, it displays the children.
 *
 * @param {React.ReactNode} children - The content to display when loading is false.
 * @param {boolean} loading - Whether or not to show the loading indicator.
 * @param {string} className - Additional CSS class names for the component.
 * @return {JSX.Element} The Loader component.
 */
export function Loader({ children, loading, className }: Props) {
  return (
    <>
      {loading ? (
        <div className={cn("flex justify-center items-center ", className)}>
          <IconLoader className="animate-spin dark:text-white" />
        </div>
      ) : (
        children
      )}
    </>
  );
}
