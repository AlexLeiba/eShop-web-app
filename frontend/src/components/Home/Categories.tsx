import React from 'react';

import { CategoriesCard } from './CategoriesCard';
import { Spacer } from '../ui/spacer';
import { useTranslation } from 'react-i18next';
import { categoriesData } from '../../consts';

export function Categories() {
  const [lang, setLang] = React.useState<'en' | 'ro'>('en');
  const { t } = useTranslation('translation', { keyPrefix: 'DashboardPage' });

  React.useEffect(() => {
    const language = localStorage.getItem('language') || 'en';
    setLang(language === 'RO' ? 'ro' : 'en');
  }, []);
  return (
    <div className='w-full'>
      <h2 className='text-4xl font-bold'>{t('CategoriesSection.title')}</h2>
      <Spacer sm={8} md={8} lg={8} />
      <div className='grid grid-cols-3 gap-4 '>
        {categoriesData[lang]?.map((data) => {
          return <CategoriesCard data={data} key={data.id} />;
        })}
      </div>
    </div>
  );
}
