import React from 'react';
import { Container } from '../Grid/Container';
import { Input } from '../ui/Input';
import { Spacer } from '../ui/spacer';

export function Newsletter() {
  const [email, setEmail] = React.useState('');
  return (
    <Container className='flex flex-col justify-center items-center w-full h-full gap-4 '>
      <Spacer sm={8} md={24} lg={24} />
      <h2 className='text-4xl font-bold'>Newsletter</h2>
      <p className='text-xl'>
        Subscribe to our newsletter to get the latest updates and special offers
      </p>
      <Input
        handleSend={() => {}}
        label={''}
        placeholder={'Your email'}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={''}
        type={'text'}
      />

      <Spacer sm={8} md={24} lg={24} />
    </Container>
  );
}
