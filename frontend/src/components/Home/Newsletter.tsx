import React from 'react';
import { Container } from '../Grid/Container';
import { Input } from '../ui/Input';
import { Spacer } from '../ui/spacer';
import { useTranslation } from 'react-i18next';

export function Newsletter() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'DashboardPage.NewsLetterSection',
  });
  const [email, setEmail] = React.useState('');
  return (
    <Container className='flex flex-col justify-center items-center w-full h-full gap-4 '>
      <Spacer sm={8} md={24} lg={24} />
      <h2 className='text-4xl font-bold'>{t('title')}</h2>
      <p className='text-xl'>{t('description')}</p>
      <Input
        handleSend={() => {}}
        label={''}
        placeholder={t('placeholder')}
        value={email}
        onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
        error={''}
        type={'email'}
      />

      <Spacer sm={8} md={24} lg={24} />
    </Container>
  );
}
