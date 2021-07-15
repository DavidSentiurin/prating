import { createContext } from 'react';

export const ProductsContext = createContext(null);

export const ProductsProvider = ({ products, children }) => {
  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};
