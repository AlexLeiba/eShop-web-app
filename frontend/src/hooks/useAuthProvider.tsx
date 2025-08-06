import { createContext, useState } from 'react';

const AuthContext = createContext({});

type AuthProviderProps = {
  children: React.ReactNode;
};
export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState({});
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
