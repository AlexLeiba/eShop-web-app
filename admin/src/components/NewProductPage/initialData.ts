import { CATEGORIES, COLORS } from '../../lib/consts';

export const initialErrorsObject = {
  roTitle: '',
  enTitle: '',

  roDescription: '',
  enDescription: '',

  price: '',
  image: '',
  categories: '',
  size: '',
  color: '',

  images: '',
  imageColor: '',

  isPublished: '',
  inStock: '',
  featured: '',
  featuredBackgroundColor: '',
  language: '',
  quantity: '',
  moreInfo: '',
};

export const initialFormData = {
  roTitle: '',
  enTitle: '',

  roDescription: '',
  enDescription: '',

  price: '0',
  image: '',
  categories: [CATEGORIES[0].value],
  size: [''],
  color: [COLORS[0].value],

  images: [],
  imageColor: COLORS[0].value,

  isPublished: false,
  inStock: true,
  featured: false,
  featuredBackgroundColor: '#ffffff',
  language: 'en',
  quantity: '1',
  moreInfo: '',
};
