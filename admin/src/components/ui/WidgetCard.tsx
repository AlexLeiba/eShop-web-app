import React from 'react';

type Props = {
  children: React.ReactNode;
};
export function WidgetCard({ children }: Props) {
  return <div className='container-widget-card'>{children}</div>;
}
