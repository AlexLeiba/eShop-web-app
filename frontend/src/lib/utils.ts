import { type ClassValue, clsx } from "clsx";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Scrolls the window to the top whenever the pathname changes.
 *
 * This component is typically used as a child of a Router component to ensure
 * that the window is scrolled to the top when navigating to a new page.
 *
 * @return {null} This component does not render any visible content.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
