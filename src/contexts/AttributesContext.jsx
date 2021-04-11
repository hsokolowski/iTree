import React, { useContext, useState } from 'react';

// @ts-ignore
const AttributesContext = React.createContext();

export const AttributesProvider = ({ children }) => {
  const [attributes, setAttributes] = useState([
    // { value: 'hamburger', name: 'Hamburger' },
    // { value: 'fries', name: 'Fries' },
    // { value: 'milkshake', name: 'Milkshake' },
  ]);

  const onAttributesChange = input =>
    setAttributes(input.map(element => ({ value: element, name: element })));

  return (
    <AttributesContext.Provider value={{ attributes, onAttributesChange }}>
      {children}
    </AttributesContext.Provider>
  );
};

export const useAttributesContext = () => {
  const { attributes, onAttributesChange } = useContext(AttributesContext);
  return { attributes, onAttributesChange };
};
