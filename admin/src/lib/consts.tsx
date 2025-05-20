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
