import React, { useReducer, useEffect, useContext } from "react";
import cartReducer from "./cartReducer";

// The default value would apply if a component tries consuming the context without a provider in a parent.
export const CartContext = React.createContext(null);

let initialCart;
try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
  console.error("The cart could not be parsed into JSON.");
  initialCart = [];
}

// The value prop on CartContext.Provider determines what data will be shared via the context.
export function CartProvider(props) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  // Any time the cart changes, store it in localStorage as a json string. Use "cart" as the key.
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);
  const contextValue = { cart, dispatch };
  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart must be used within a CartProvider. Wrap a parent component inside <CartProvider> to fix this error."
    );
  }
  return context;
}
