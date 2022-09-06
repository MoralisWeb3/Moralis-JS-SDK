import React, { useContext } from 'react';

export interface Auth {
  user: any;
}

export interface Connection {
  chainId: number;
  account: string;
}

export interface AppContextValue {
  auth: Auth | null;
  connection: Connection | null;
  setAuth: (auth: Auth | null) => void;
  setConnection: (connection: Connection | null) => void;
}

export const appContext = React.createContext<AppContextValue | null>(null);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = React.useState<Auth | null>(null);
  const [connection, setConnection] = React.useState<Connection | null>(null);

  return <appContext.Provider value={{ auth, connection, setAuth, setConnection }}>{children}</appContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(appContext);
  if(!context) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }

  return context
}
