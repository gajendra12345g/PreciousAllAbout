import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface OnlineStatusProviderProps {
  children: ReactNode;
}

const OnlineStatusContext = createContext(false);

const OnlineStatusProvider = ({ children }: OnlineStatusProviderProps) => {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <OnlineStatusContext.Provider value={online}>
      {children}
    </OnlineStatusContext.Provider>
  );
};

export { OnlineStatusProvider, OnlineStatusContext };
