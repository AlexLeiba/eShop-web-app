import { NEW_MEMBERS_DATA } from '../../lib/consts';
import Spacer from '../ui/Spacer';
import './DashboardPage.scss';

export function NewMembers() {
  return (
    <div className='container-widget'>
      <h4>New joined members</h4>
      <Spacer />
      <ul className='new-joined-members-ul'>
        {NEW_MEMBERS_DATA.map((item) => {
          return (
            <li className='new-joined-members-list'>
              <div className='flex-center-row-4'>
                <p>{item.name}</p>
                <p>{item.lastName}</p>
              </div>
              <p>{item.joinedAt}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
