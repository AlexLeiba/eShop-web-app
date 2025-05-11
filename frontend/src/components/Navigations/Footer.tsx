import { Container } from '../Grid/Container';
import { Spacer } from '../ui/spacer';
import { Logo } from './Logo';

export function Footer() {
  const links = [
    {
      name: 'Terms & Conditions',
      slug: '/terms',
    },
    {
      name: 'Privacy Policy',
      slug: '/privacy',
    },
    {
      name: 'Contact Us',
      slug: '/contact',
    },
    {
      name: 'Wishlist',
      slug: '/wishlist',
    },
    {
      name: 'Cart',
      slug: '/cart',
    },
  ];
  return (
    <div className='w-full  bg-gray-300 py-8 px-8 flex items-center'>
      <Container className='grid grid-cols-3 gap-8'>
        {/* left */}
        <div>
          <Logo />
          <Spacer sm={2} md={2} lg={2} />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum
            aut minima in quibusdam laborum nisi nam veniam repudiandae
            blanditiis quod.
          </p>
        </div>

        {/* center */}
        <div>
          <h4 className='text-2xl font-bold'>Links</h4>
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

        {/* right */}
        {/* center */}
        <div>
          <h4 className='text-2xl font-bold'>Contact</h4>
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
      </Container>
    </div>
  );
}
