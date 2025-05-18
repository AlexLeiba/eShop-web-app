import { useTranslation } from 'react-i18next';
import { Container } from '../Grid/Container';
import { Spacer } from '../ui/spacer';
import { Logo } from './Logo';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from '@tabler/icons-react';

export function Footer() {
  const { t } = useTranslation('translation', { keyPrefix: 'FooterSection' });
  const links = [
    {
      name: t('links.products'),
      slug: '/products',
    },
    {
      name: t('links.wishlist'),
      slug: '/wishlist',
    },
    {
      name: t('links.cart'),
      slug: '/cart',
    },
    {
      name: t('links.termsAndConditions'),
      slug: '/terms',
    },
  ];
  const contactLinks = [
    {
      name: t('contact.email'),
      icon: <IconMail />,
      slug: 'mailto:info@example.com',
    },

    {
      name: t('contact.github'),
      icon: <IconBrandGithub />,
      slug: 'https://github.com/alex-ro/my-vite-app',
    },
    {
      name: t('contact.linkedin'),
      icon: <IconBrandLinkedin />,
      slug: 'https://www.linkedin.com/in/alex-ro/',
    },
  ];
  return (
    <div className='w-full  bg-gray-300 py-8 px-8 flex items-center'>
      <Container className='grid grid-cols-3 gap-8'>
        {/* left */}
        <div>
          <Logo />
          <Spacer sm={2} md={2} lg={2} />
        </div>

        <div>
          <h4 className='text-2xl font-bold'>{t('links.title')}</h4>
          <Spacer sm={2} md={2} lg={2} />
          {links.map((link) => {
            return (
              <div key={link.slug}>
                <a href={link.slug} className=' text-md'>
                  {link.name}
                </a>
              </div>
            );
          })}
        </div>

        <div>
          <h4 className='text-2xl font-bold'>{t('contact.title')}</h4>
          <Spacer sm={2} md={2} lg={2} />
          {contactLinks.map((link) => {
            return (
              <div key={link.name} className='flex items-center gap-1'>
                <div>{link.icon}</div>
                <a href={link.slug} className=' text-md'>
                  {link.name}
                </a>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
