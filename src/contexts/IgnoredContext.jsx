import React, { useContext, useState } from 'react';

// @ts-ignore
const IgnoredContext = React.createContext();

export const IgnoredProviders = ({ children }) => {
  const [attributes, setAttributes] = useState([]);

  const onIgnoredChange = input => setAttributes(input.map(element => ({ value: element, name: element })));

  return (
    <IgnoredContext.Provider value={{ attributes, onIgnoredChange }}>{children}</IgnoredContext.Provider>
  );
};

export const useIgnoredContext = () => {
  const { attributes, onIgnoredChange } = useContext(IgnoredContext);
  return { attributes, onIgnoredChange };
};
