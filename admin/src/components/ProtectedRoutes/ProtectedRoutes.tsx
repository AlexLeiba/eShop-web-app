import React from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  token?: string;
};
export function ProtectedRoute({ children, token }: Props) {
  console.log('🚀 ~ ProtectedRoute ~ token:', token);
  if (!token) {
    return <Navigate to='/login' replace />;
  }
  return children;
}
