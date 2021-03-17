import React, { useContext, useState } from 'react';

// @ts-ignore
const LoadingContext = React.createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  return <LoadingContext.Provider value={{ isLoading, setIsLoading }}>{children}</LoadingContext.Provider>;
};

export const useLoadingContext = () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  return { isLoading, setIsLoading };
};
