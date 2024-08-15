import React, {createContext, useState, useEffect, Children} from 'react';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchedProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
    }
  }, []);


  return <ProductContext.Provider>{children}</ProductContext.Provider>
};

export default ProductProvider;
