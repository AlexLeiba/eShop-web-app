"use client";
import { IconChevronUp } from "@tabler/icons-react";
import { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed cursor-pointer hover:opacity-50 bottom-4 right-4 p-3 rounded-full bg-black dark:bg-white dark:text-black text-white shadow-lg hover:bg-primary-500 dark: dark:hover:bg-primary-500 transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-label="Scroll to top"
    >
      <IconChevronUp className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTopButton;
