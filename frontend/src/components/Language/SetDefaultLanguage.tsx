import React from 'react';

export function SetDefaultLanguage() {
  React.useEffect(() => {
    const language = localStorage.getItem('language');

    if (!language) {
      localStorage.setItem('language', 'EN');
    }
  }, []);

  return null;
}
