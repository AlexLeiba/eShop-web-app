import shopgirl1 from './assets/shopgirl1.webp';
import shopgirl2 from './assets/shopgirl2.webp';
import shopgirl3 from './assets/shopgirl3.webp';
import shirt from './assets/shirt2.webp';

// slider data
export const homeSliderData = [
  {
    id: 1,
    image: shopgirl1,
    title: 'Summer Sale',
    description: ' Harry up , get discount on your next purchase',
    price: '$19.99',
    buttonLink: '/shop',
    buttonTitle: 'Shop Now',
  },
  {
    id: 2,
    image: shopgirl2,
    title: 'Summer Fashion',
    description: ' Harry up , get discount on your next purchase',
    price: '$19.99',
    buttonLink: '/shop',
    buttonTitle: 'Shop Now',
  },
  {
    id: 3,
    image: shopgirl3,
    title: 'Summer Accessories',
    description: ' Harry up , get discount on your next purchase',
    price: '$19.99',
    buttonLink: '/shop',
    buttonTitle: 'Shop Now',
  },
];

export const homeSliderColors = ['#eef692', '#d4b044', '#4e78b7'];

// categories
export const categoiesData = [
  {
    id: 1,
    image: shopgirl3,
    title: 'Jakets',
    description: ' Harry up , get discount on your next purchase',

    buttonLink: '/products',
    buttonTitle: 'Shop Now',
  },
  {
    id: 2,
    image: shopgirl3,
    title: 'Shirts',
    description: ' Harry up , get discount on your next purchase',

    buttonLink: '/products',
    buttonTitle: 'Shop Now',
  },
  {
    id: 3,
    image: shopgirl3,
    title: 'Shoes',
    description: ' Harry up , get discount on your next purchase',

    buttonLink: '/products',
    buttonTitle: 'Shop Now',
  },
];

export type CategoriesType = (typeof categoiesData)[0];

// products
export const productsData = [
  {
    id: 1,
    image: shirt,
    title: 'Jakets',
    description: ' Harry up , get discount on your next purchase',
    price: '$19.99',
    buttonLink: '/shop',
    buttonTitle: 'Shop Now',
  },
  {
    id: 2,
    image: shopgirl3,
    title: 'Shirts',
    description: ' Harry up , get discount on your next purchase',
    price: '$19.99',
    buttonLink: '/shop',
    buttonTitle: 'Shop Now',
  },
  {
    id: 3,
    image: shirt,
    title: 'Pants',
    description: ' Harry up , get discount on your next purchase',
    price: '$19.99',
    buttonLink: '/shop',
    buttonTitle: 'Shop Now',
  },
  {
    id: 4,
    image: shopgirl3,
    title: 'Pants',
    description: ' Harry up , get discount on your next purchase',
    price: '$19.99',
    buttonLink: '/shop',
    buttonTitle: 'Shop Now',
  },
  {
    id: 5,
    image: shopgirl3,
    title: 'Pants',
    description: ' Harry up , get discount on your next purchase',
    price: '$19.99',
    buttonLink: '/shop',
    buttonTitle: 'Shop Now',
  },
  {
    id: 6,
    image: shopgirl3,
    title: 'Pants',
    description: ' Harry up , get discount on your next purchase',
    price: '$19.99',
    buttonLink: '/shop',
    buttonTitle: 'Shop Now',
  },
  {
    id: 7,
    image: shopgirl3,
    title: 'Pants',
    description: ' Harry up , get discount on your next purchase',
    price: '$19.99',
    buttonLink: '/shop',
    buttonTitle: 'Shop Now',
  },
  {
    id: 8,
    image: shopgirl3,
    title: 'Pants',
    description: ' Harry up , get discount on your next purchase',
    price: '$19.99',
    buttonLink: '/shop',
    buttonTitle: 'Shop Now',
  },
  {
    id: 9,
    image: shopgirl3,
    title: 'Pants',
    description: ' Harry up , get discount on your next purchase',
    price: '$19.99',
    buttonLink: '/shop',
    buttonTitle: 'Shop Now',
  },
  {
    id: 10,
    image: shopgirl3,
    title: 'Pants',
    description: ' Harry up , get discount on your next purchase',
    price: '$19.99',
    buttonLink: '/shop',
    buttonTitle: 'Shop Now',
  },
  {
    id: 11,
    image: shopgirl3,
    title: 'Pants',
    description: ' Harry up , get discount on your next purchase',
    price: '$19.99',
    buttonLink: '/shop',
    buttonTitle: 'Shop Now',
  },
  {
    id: 12,
    image: shopgirl3,
    title: 'Pants',
    description: ' Harry up , get discount on your next purchase',
    price: '$19.99',
    buttonLink: '/shop',
    buttonTitle: 'Shop Now',
  },
  {
    id: 13,
    image: shopgirl3,
    title: 'Pants',
    description: ' Harry up , get discount on your next purchase',
    price: '$19.99',
    buttonLink: '/shop',
    buttonTitle: 'Shop Now',
  },
  {
    id: 14,
    image: shopgirl3,
    title: 'Pants',
    description: ' Harry up , get discount on your next purchase',
    price: '$19.99',
    buttonLink: '/shop',
    buttonTitle: 'Shop Now',
  },
];

export type ProductsType = (typeof productsData)[0];
