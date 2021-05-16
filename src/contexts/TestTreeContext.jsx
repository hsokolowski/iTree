import React, { useContext, useState } from 'react';

// @ts-ignore
const TestTreeContext = React.createContext();

export const TestTreeProvider = ({ children }) => {
  const [isTestTree, setIsTestTree] = useState(false);
  return (
    <TestTreeContext.Provider value={{ isTestTree, setIsTestTree }}>{children}</TestTreeContext.Provider>
  );
};

export const useTestTreeContext = () => {
  const { isTestTree, setIsTestTree } = useContext(TestTreeContext);
  return { isTestTree, setIsTestTree };
};
