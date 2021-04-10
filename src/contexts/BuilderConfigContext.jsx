import React, { useContext, useState } from 'react';

// @ts-ignore
const BuilderConfigContext = React.createContext();

export const BuilderConfigProvider = ({ children }) => {
  const [builderConfig, setBuilderConfig] = useState(null);

  return (
    <BuilderConfigContext.Provider value={{ builderConfig, setBuilderConfig }}>
      {children}
    </BuilderConfigContext.Provider>
  );
};

export const useBuilderConfigContext = () => {
  const { builderConfig, setBuilderConfig } = useContext(BuilderConfigContext);
  return { builderConfig, setBuilderConfig };
};
