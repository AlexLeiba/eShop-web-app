import shopgirl1 from './assets/shopgirl1.webp';
import shopgirl2 from './assets/shopgirl2.webp';
import shopgirl3 from './assets/shopgirl3.webp';

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
    _id: '68235f4e2aebe8ad712207c3',
    title: 'Leather Backpack',
    description:
      'Durable leather backpack with multiple compartments and a padded laptop sleeve.',
    price: 89.99,
    image: 'https://example.com/images/leather-backpack.jpg',
    categories: ['accessories', 'bags'],
    size: ['S'],
    color: ['brown', 'black'],
    isPublished: true,
    inStock: true,
    createdAt: '2025-05-13T15:03:42.462Z',
    updatedAt: '2025-05-13T15:03:42.462Z',
    __v: 0,
  },
];

export type ProductsType = (typeof productsData)[0];
