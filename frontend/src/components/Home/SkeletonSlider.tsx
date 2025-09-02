import { cn } from "../../lib/utils";
import { IconLoader } from "@tabler/icons-react";

export function SkeletonSlider() {
  return (
    <div
      style={{
        minWidth: "100vw",
      }}
      className={cn(
        "pt-[56px] overflow-hidden h-[700px] text-black bg-gray-400 animate-pulse flex items-center justify-center"
      )}
    >
      <IconLoader className="animate-spin text-white" />
    </div>
  );
}
