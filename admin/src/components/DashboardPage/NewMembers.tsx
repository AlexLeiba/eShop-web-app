import { IconEye } from '@tabler/icons-react';
import { NEW_MEMBERS_DATA } from '../../lib/consts';
import Spacer from '../ui/Spacer';
import './DashboardPage.scss';

type Props = {
  newMembersData: typeof NEW_MEMBERS_DATA;
};
export function NewMembers({ newMembersData }: Props) {
  return (
    <div className='container-widget'>
      <h4>New joined members</h4>
      <Spacer size={12} />
      <ul className='new-joined-members-ul'>
        {newMembersData?.map((item) => {
          return (
            <li className='new-joined-members-list'>
              <div className='flex-center-row-4'>
                <div className='flex-column'>
                  <div className='flex-center-row-4'>
                    <p>{item.name}</p>
                    <p>{item.lastName}</p>
                  </div>
                  <p>{item.email}</p>
                </div>
              </div>
              <p>
                {new Date(item.joinedAt).toLocaleDateString('en-US', {
                  year: '2-digit',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              <IconEye cursor={'pointer'} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
