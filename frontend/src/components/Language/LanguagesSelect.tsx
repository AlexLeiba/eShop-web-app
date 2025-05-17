import React, { useRef } from 'react';
import { languages } from '../../consts';

export function LanguagesSelect() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectLanguages, setSelectLanguage] = React.useState('EN');
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const language = localStorage.getItem('language');

    if (!language) {
      setSelectLanguage('EN');
    } else {
      setSelectLanguage(language);
    }

    document.addEventListener('click', (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    });

    return () => document.removeEventListener('click', () => {});
  }, []);

  function handleLanguageChange(language: string) {
    setSelectLanguage(language);
    setOpen(!open);

    localStorage.setItem('language', language);
    window.location.reload();
  }
  return (
    <div className='relative' ref={containerRef}>
      <div
        onClick={() => setOpen(!open)}
        className='hover:text-white shadow-md relative rounded-full w-8 h-8 flex justify-center items-center hover:bg-gray-500 transition-all cursor-pointer'
      >
        <p>{selectLanguages}</p>
      </div>

      {open && (
        <div className='absolute top-10 left-0 w-24 bg-white shadow-lg rounded-md z-50 p-2'>
          {languages.map((language) => {
            return (
              <div
                onClick={() => handleLanguageChange(language.slug)}
                key={language.slug}
                className='hover:text-white  px-2 relative rounded-sm w-full h-8 flex items-center hover:bg-gray-400 transition-all cursor-pointer'
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
