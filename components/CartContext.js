import { createContext, useState, useMemo, useEffect } from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if(cartProducts?.length > 0) {
      ls?.setItem("cartProducts", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  useEffect(() => {
    if (ls?.getItem("cartProducts")) {
      setCartProducts(JSON.parse(ls.getItem("cartProducts")));
    }
  }, []);
  
  function addProductToCart(productId) {
    setCartProducts(prev => [...prev, productId]);
  }

  function getCartLength() {
    return cartProducts.length;
  }

  const memoizedGetCartLength = useMemo(() => getCartLength, [cartProducts]);

  return (
    <CartContext.Provider value={{ 
      cartProducts, 
      addProductToCart, 
      getCartLength: memoizedGetCartLength
    }}>
      {children}
    </CartContext.Provider>
  );
}