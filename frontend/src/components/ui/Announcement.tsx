import React from "react";
import { IconX } from "@tabler/icons-react";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

type Props = {
  title?: string;
  link?: string;
  linkTitle?: string;
};
/**
 * Renders an announcement component with a title, link, and close button.
 *
 * @param {string} title - The title of the announcement.
 * @param {string} link - The link associated with the announcement.
 * @param {string} linkTitle - The title of the link.
 * @return {JSX.Element} The announcement component.
 */
export function Announcement({ title, link, linkTitle }: Props) {
  const [newAnnouncement, setNewAnnouncement] = React.useState(false);

  return (
    <div
      className={cn(
        newAnnouncement
          ? "translate-y-0 opacity-100"
          : "translate-y-[-100px] opacity-0",
        "absolute bg-gray-800 w-full h-18 pl-4 pr-10 py-4 z-50 transition-all "
      )}
    >
      <div className="flex justify-between items-center relative h-full text-white">
        <p className="text-md line-clamp-1">{title ? title : "Announcement"}</p>
        {link && (
          <Link to={`${link}`} className="px-4 underline font-bold">
            <p className="text-md line-clamp-1 cursor-pointer">
              {linkTitle ? linkTitle : "Read More"}
            </p>
          </Link>
        )}
      </div>
      <IconX
        onClick={() => setNewAnnouncement(false)}
        className="absolute top-6 right-4 cursor-pointer text-white"
      />
    </div>
  );
}
