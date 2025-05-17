import shirt from './assets/shirt1.webp';
import jacket from './assets/jaket3.webp';
import shoes from './assets/shoes-nike.webp';

export const homeSliderColors = ['#eef692', '#d4b044', '#aeb4be'];

// categories
export const categoiesData = [
  {
    id: 1,
    image: jacket,
    title: 'Jakets',
    description: ' Harry up , get discount on your next purchase',

    buttonLink: '/products',
    buttonTitle: 'Shop Now',
  },
  {
    id: 2,
    image: shirt,
    title: 'Shirts',
    description: ' Harry up , get discount on your next purchase',

    buttonLink: '/products',
    buttonTitle: 'Shop Now',
  },
  {
    id: 3,
    image: shoes,
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
    _id: '',
    title: '',
    description: '',
    price: 1,
    image: '',
    categories: [''],
    size: [''],
    color: [''],
    isPublished: true,
    inStock: true,
    createdAt: '',
    updatedAt: '',
    featured: false,
    featuredBackgroundColor: '',
    __v: 0,
  },
];

export type ProductsType = {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  categories: string[];
  size: string[];
  color: string[];
  isPublished: boolean;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  featuredBackgroundColor: string;
  quantity: number;
  __v: number;
};
export type ProductsInCartType = {
  productId: string;
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  categories: string;
  size: string;
  color: string;
  isPublished: boolean;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  featuredBackgroundColor: string;
  quantity: number;
  __v: number;
};

// FILTERS AND SORTS DATA
export const filterColors = [
  'White',
  'Black',
  'Red',
  'Blue',
  'Green',
  'Purple',
  'Yellow',
];

export const filterSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const filterCategories = ['Jakets', 'Shirts', 'Shoes'];
export const filterSort = ['Newest', 'Oldest'];

export const languages = [
  {
    name: 'English',
    slug: 'EN',
  },
  {
    name: 'Romanian',
    slug: 'RO',
  },
];
