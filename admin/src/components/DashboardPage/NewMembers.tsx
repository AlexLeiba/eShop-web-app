import { IconEye } from '@tabler/icons-react';
import Spacer from '../ui/Spacer';
import './DashboardPage.scss';
import { WidgetCard } from '../ui/WidgetCard';
import type { UserType } from '../../lib/types';
import { Link } from 'react-router-dom';

type Props = {
  newMembersData: UserType[];
};
export function NewMembers({ newMembersData }: Props) {
  return (
    <WidgetCard>
      <h4>New joined members</h4>
      <Spacer size={12} />
      <ul className='new-joined-members-ul'>
        {newMembersData?.map((item) => {
          return (
            <li key={item._id} className='new-joined-members-list'>
              <div className='flex-center-row-4'>
                <div className='flex-column'>
                  <div style={{ width: '200px' }} className='flex-center-row-4'>
                    <p>{item.name}</p>
                    <p>{item.lastName}</p>
                  </div>
                  <p>{item.email}</p>
                </div>
              </div>
              <p>
                {new Date(item.createdAt).toLocaleDateString('en-US', {
                  year: '2-digit',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              <Link to={`/user/${item._id}`}>
                <IconEye cursor={'pointer'} />
              </Link>
            </li>
          );
        })}
      </ul>
    </WidgetCard>
  );
}
