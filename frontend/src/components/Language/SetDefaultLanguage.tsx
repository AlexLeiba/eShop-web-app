import i18next from 'i18next';
import React from 'react';

export function SetDefaultLanguage() {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const language = localStorage.getItem('language')?.toLowerCase() || 'en';

    i18next.changeLanguage(language).then(() => {
      setReady(true); // trigger re-render after language is applied
    });
  }, []);

  // Prevent rendering until language is set
  if (!ready) return null;

  return null;
}
