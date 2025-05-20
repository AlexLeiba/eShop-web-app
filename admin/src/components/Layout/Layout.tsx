import React from 'react';
import Header from '../Navigation/Header';
import { Sidebar } from '../Navigation/Sidebar';
import './Layout.scss';
import '../../SCSS.scss';

type Props = {
  children: React.ReactNode;
};
export function Layout({ children }: Props) {
  return (
    <>
      <Header username='Alex Leiba' />
      <Sidebar />
      <div className='children-pages-container'>{children}</div>
    </>
  );
}
