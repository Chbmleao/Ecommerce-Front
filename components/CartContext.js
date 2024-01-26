import { createContext, useState, useMemo } from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}) {
  const [cartProducts, setCartProducts] = useState([]);
  
  function addProductToCart(productId) {
    setCartProducts(prev => [...prev, productId]);
  }

  function getCartLength() {
    return cartProducts.length;
  }

  const memoizedGetCartLength = useMemo(() => getCartLength, [cartProducts]);

  return (
    <CartContext.Provider value={{addProductToCart, getCartLength: memoizedGetCartLength}}>
      {children}
    </CartContext.Provider>
  );
}