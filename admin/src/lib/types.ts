export type ProductsType = {
  id: string;
  _id: string;

  title: string;
  roTitle: string;
  enTitle: string;
  roDescription: string;
  enDescription: string;
  description: string;

  price: number;

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
  moreInfo: string;
  language: string;

  image: string;
  images: {
    colorName: string;
    image: string;
  }[];
  __v: number;
};

export type UserType = {
  id: string;
  _id: string;
  email: string;
  userName: string;
  name?: string | undefined;
  lastName?: string | undefined;
  isAdmin?: boolean | undefined;
  isUberAdmin?: boolean | undefined;
  createdAt: string;
  updatedAt: string;
};

export type TransactionsType = {
  _id: string;
  userId: string;
  amount: number;
  status: string;
  date: string;
  address: string;
  products: {
    productId: string;
    quantity: number;
  }[];
  createdAt: string;
  updatedAt: string;
};

type ProductsInOrderType = {
  productId: string;
  title: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
  totalPrice: number;
};

export type OrderType = {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  stripeId: string;
  products: ProductsInOrderType[];
  totalPrice: number;
  quantity: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
