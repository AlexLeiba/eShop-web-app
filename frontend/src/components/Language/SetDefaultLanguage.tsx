import i18next from 'i18next';
import React from 'react';

export function SetDefaultLanguage() {
  React.useEffect(() => {
    const language = localStorage.getItem('language');

    i18next.changeLanguage(
      language ? language.toLowerCase() : 'en',
      (err, t) => {
        if (err)
          return console.log('something went wrong changing  translation', err);
        t('key'); // -> same as i18next.t
      }
    );
    if (!language) {
      localStorage.setItem('language', 'EN');
    }
  }, []);

  return null;
}
