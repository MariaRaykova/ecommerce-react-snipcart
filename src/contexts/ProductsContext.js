import React, { createContext, useState, useEffect } from "react";
import { API_URL } from "../helpers/utils";
export const ProductsContext = createContext();

const ProductsContextProvider = ({ children }) => {
  const [hasError, setErrors] = useState(false);

  const [products, setProducts] = useState(null);

  const fetchData = async () => {
    //const res = await fetch(`${process.env.REACT_APP_HOST}/products`);
    //const res = await fetch(`${API_URL}/api/products`);
    //const res = await fetch(`${API_URL}/api/products?pagination[limit]=3&pagination[withCount]=true&populate=image`);
    const res = await fetch(`${API_URL}/api/products?populate=image`);
    res
      .json()
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
        console.log("success", res);
      })
      .catch((err) => setErrors("error :", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {products && (
        <ProductsContext.Provider value={{ products }}>
          {children}
        </ProductsContext.Provider>
      )}
    </>
  );
};

export default ProductsContextProvider;
