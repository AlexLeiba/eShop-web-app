export type ProductsType = {
  id: string;
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
  moreInfo: string;
  language: string;
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
