import shirt from './assets/shirt1.webp';
import jacket from './assets/jaket3.webp';
import shoes from './assets/shoes-nike.webp';

export const homeSliderColors = ['#eef692', '#d4b044', '#aeb4be'];

// categories
export const categoriesData = {
  en: [
    {
      id: 1,
      image: jacket,
      title: 'Jakets',
      description: ' Harry up , get discount on your next purchase',
      buttonLink: '/products',
      buttonTitle: 'Shop Now',
      category: 'jakets',
    },
    {
      id: 2,
      image: shirt,
      title: 'Shirts',
      description: ' Harry up , get discount on your next purchase',

      buttonLink: '/products',
      buttonTitle: 'Shop Now',
      category: 'shirts',
    },
    {
      id: 3,
      image: shoes,
      title: 'Shoes',
      description: ' Harry up , get discount on your next purchase',

      buttonLink: '/products',
      buttonTitle: 'Shop Now',
      category: 'shoes',
    },
  ],
  ro: [
    {
      id: 1,
      image: jacket,
      title: 'Jachete, Geci',
      description: ' Harry up , get discount on your next purchase',

      buttonLink: '/products',
      buttonTitle: 'Cumpara acum',
      category: 'jakets',
    },
    {
      id: 2,
      image: shirt,
      title: 'Camase',
      description: ' Harry up , get discount on your next purchase',

      buttonLink: '/products',
      buttonTitle: 'Cumpara acum',
      category: 'shirts',
    },
    {
      id: 3,
      image: shoes,
      title: 'Pantofi eleganti, sportivi',
      description: ' Harry up , get discount on your next purchase',

      buttonLink: '/products',
      buttonTitle: 'Cumpara acum',
      category: 'shoes',
    },
  ],
};

export type CategoriesType = {
  id: number;
  image: string;
  title: string;
  description: string;
  buttonLink: string;
  buttonTitle: string;
  category: string;
};

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
  images: {
    colorName: string;
    image: string;
  }[];
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

export const filterColors = {
  en: [
    {
      value: 'allColors',
      title: 'All Colors',
    },
    {
      value: 'white',
      title: 'White',
    },
    {
      value: 'black',
      title: 'Black',
    },
    {
      value: 'red',
      title: 'Red',
    },
    {
      value: 'blue',
      title: 'Blue',
    },
    {
      value: 'green',
      title: 'Green',
    },
    {
      value: 'purple',
      title: 'Purple',
    },
    {
      value: 'yellow',
      title: 'Yellow',
    },
  ],
  ro: [
    {
      value: 'allColors',
      title: 'Toate Culorile',
    },
    {
      value: 'white',
      title: 'Alb',
    },
    {
      value: 'black',
      title: 'Black',
    },
    {
      value: 'red',
      title: 'Red',
    },
    {
      value: 'blue',
      title: 'Blue',
    },
    {
      value: 'green',
      title: 'Green',
    },
    {
      value: 'purple',
      title: 'Purple',
    },
    {
      value: 'yellow',
      title: 'Yellow',
    },
  ],
};

export const sortOptions = {
  en: [
    { value: 'newest', title: 'Newest' },
    { value: 'oldest', title: 'Oldest' },
  ],
  ro: [
    { value: 'newest', title: 'Cel mai nou' },
    { value: 'oldest', title: 'Cel mai vechi' },
  ],
};

export const filterSizes = {
  en: [
    { value: 'allSizes', title: 'All Sizes' },
    { value: 'xs', title: 'XS' },
    { value: 's', title: 'S' },
    { value: 'm', title: 'M' },
    { value: 'l', title: 'L' },
    { value: 'xl', title: 'XL' },
    { value: 'xxl', title: 'XXL' },
  ],
  ro: [
    { value: 'allSizes', title: 'Toate Marimile' },
    { value: 'xs', title: 'XS' },
    { value: 's', title: 'S' },
    { value: 'm', title: 'M' },
    { value: 'l', title: 'L' },
    { value: 'xl', title: 'XL' },
    { value: 'xxl', title: 'XXL' },
  ],
};
export const filterCategories = {
  //to implement
  en: [
    { value: 'allCategories', title: 'All Categories' },
    { value: 'jakets', title: 'Jakets' },
    { value: 'shirts', title: 'Shirts' },
    { value: 'shoes', title: 'Shoes' },
  ],
  ro: [
    { value: 'allCategories', title: 'Toate Categoriile' },
    { value: 'jakets', title: 'Jachete' },
    { value: 'shirts', title: 'Camase' },
    { value: 'shoes', title: 'Pantofi' },
  ],
};

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
