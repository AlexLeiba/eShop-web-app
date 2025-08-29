import React, { useRef } from "react";
import { languages } from "../../consts";
import i18next from "i18next";
import { cn } from "../../lib/utils";

export function LanguagesSelect() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectLanguages, setSelectLanguage] = React.useState("EN");
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const language = localStorage.getItem("language");

    if (!language) {
      setSelectLanguage("EN");
    } else {
      setSelectLanguage(language);
    }

    function handleCheckClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleCheckClickOutside);

    return () => document.removeEventListener("click", handleCheckClickOutside);
  }, []);

  function handleLanguageChange(language: string) {
    setSelectLanguage(language);
    setOpen(!open);

    localStorage.setItem("language", language);

    i18next.changeLanguage(language.toLowerCase(), (err, t) => {
      if (err)
        return console.log("something went wrong changing translation", err);
      t("key"); // -> same as i18next.tglob
    });
    window.location.reload();
  }
  return (
    <div className="relative" ref={containerRef}>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setOpen(!open)}
        title="Language"
        onClick={() => setOpen(!open)}
        className={cn(
          open && "bg-gray-500 text-white",
          "hover:text-white  shadow-md relative rounded-full w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600  hover:bg-gray-400 transition-all cursor-pointer languageButton"
        )}
      >
        <p>{selectLanguages}</p>
      </div>

      {open && (
        <div className="absolute top-10 left-0 w-24 bg-white dark:bg-gray-500 shadow-lg rounded-md z-50 p-2">
          {languages.map((language) => {
            return (
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleLanguageChange(language.slug)
                }
                onClick={() => handleLanguageChange(language.slug)}
                key={language.slug}
                className="dark:text-white  px-2 relative rounded-sm w-full h-8 flex items-center hover:bg-gray-400 dark:hover:bg-gray-600  transition-all cursor-pointer"
              >
                <p>{language.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
