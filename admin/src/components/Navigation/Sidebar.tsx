import { SIDEBAR_LINKS } from '../../lib/consts';
import SidebarMenu from './SidebarMenu';
import './Sidebar.scss';

export function Sidebar() {
  return (
    <div className='container-sidebar'>
      <SidebarMenu menuData={SIDEBAR_LINKS.dashboard} title='Dashboard' />

      <SidebarMenu menuData={SIDEBAR_LINKS.quickMenu} title='Quick Menu' />

      <SidebarMenu menuData={SIDEBAR_LINKS.contact} title='Contact' />
    </div>
  );
}
