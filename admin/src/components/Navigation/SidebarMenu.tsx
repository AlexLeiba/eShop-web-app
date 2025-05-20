import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  menuData: {
    name: string;
    path: string;
    icon: React.JSX.Element;
  }[];
  title: string;
};
function SidebarMenu({ menuData, title }: Props) {
  return (
    <div className='container-sidebar-menu'>
      <h3 className='text-2xl font-bold'>{title}</h3>
      {menuData.map((link) => {
        return (
          <Link key={link.name} to={link.path}>
            <div className='content-sidebar-menu'>
              {link.icon}
              <p>{link.name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default SidebarMenu;
