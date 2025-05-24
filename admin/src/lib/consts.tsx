import {
  IconAnalyze,
  IconBrandGithub,
  IconBrandLinkedin,
  IconEyeDollar,
  IconHome,
  IconMail,
  IconShoppingBag,
  IconSlashes,
  IconUser,
} from '@tabler/icons-react';

export const SIDEBAR_LINKS = {
  dashboard: [
    {
      name: 'Home',
      path: '/',
      icon: <IconHome />,
    },
    {
      name: 'Analytics',
      path: '/analytics',
      icon: <IconAnalyze />,
    },
    {
      name: 'Sales',
      path: '/sales',
      icon: <IconSlashes />,
    },
  ],

  quickMenu: [
    {
      name: 'Users',
      path: '/users',
      icon: <IconUser />,
    },
    {
      name: 'Products',
      path: '/products',
      icon: <IconShoppingBag />,
    },
    {
      name: 'Transactions',
      path: '/transactions',
      icon: <IconEyeDollar />,
    },
  ],
  contact: [
    {
      name: 'Email',
      path: '/contact',
      icon: <IconMail />,
    },
    {
      name: 'Github',
      path: '/contact',
      icon: <IconBrandGithub />,
    },
    {
      name: 'Linkedin',
      path: '/contact',
      icon: <IconBrandLinkedin />,
    },
  ],
};

export const SALES_INFO_DATA = [
  {
    title: 'Revenue',
    value: '$10,000',
  },
  {
    title: 'Sales',
    value: '$10,000',
  },
  {
    title: 'Cost',
    value: '100',
  },
];

export const MONTHS = [
  'Dec',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
];

export const NEW_MEMBERS_DATA = [
  {
    name: 'Alex',
    lastName: 'Leiba',
    email: 'alex@gmail.com',
    role: 'Admin',
    joinedAt: '2023-01-01',
  },
  {
    name: 'Alex',
    lastName: 'Leiba',
    email: 'alex@gmail.com',
    role: 'Admin',
    joinedAt: '2023-01-01',
  },
];

export const LATEST_TRANSACTIONS_DATA = [
  {
    title: 'Latest Transactions',
    value: '100',
  },
];

export const TABLE_TRANSACTIONS_COLUMNS = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Date',
    key: 'date',
  },

  {
    title: 'Amount',
    key: 'amount',
  },
  {
    title: 'Status',
    key: 'status',
  },
];

export const TABLE_TRANSACTIONS_DATA = [
  {
    name: 'Alex',
    date: '2023-01-01',
    amount: '$100',
    status: 'Paid',
  },
  {
    name: 'JORA',
    date: '2023-01-01',
    amount: '$123',
    status: 'Paid',
  },
  {
    name: 'Alex LEIBA',
    date: '2023-01-01',
    amount: '$300',
    status: 'Pending',
  },
];

export const SIZES = [
  { value: 'xs', title: 'XS' },
  { value: 's', title: 'S' },
  { value: 'm', title: 'M' },
  { value: 'l', title: 'L' },
  { value: 'xl', title: 'XL' },
  { value: 'xxl', title: 'XXL' },
];

export const COLORS = [
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
];

export const CATEGORIES = [
  { value: 'jakets', title: 'Jakets' },
  { value: 'shirts', title: 'Shirts' },
  { value: 'shoes', title: 'Shoes' },
];
