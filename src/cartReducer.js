export default function cartReducer(cart, action) {
  switch (action.type) {
    case "empty":
      return [];
    case "add":
      const { id, sku } = action;
      const itemInCart = cart.find((i) => i.sku === sku);
      if (itemInCart) {
        // Return new Array with matching item replaced.
        return cart.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Return the new array with the new item appended. id and sku use shorthad for id: id, sku: sku, because with modern js
        // we can omit the right side if the left side matches.
        return [...cart, { id, sku, quantity: 1 }];
      }
    case "updateQuantity": {
      // Wrapped in curly brace to give it a scope to prevent sku error with sku declared in add case.
      const { sku, quantity } = action;
      return quantity === 0
        ? cart.filter((i) => i.sku !== sku)
        : cart.map((i) => (i.sku === sku ? { ...i, quantity } : i));
    }
    default:
      throw new Error("Unhandled action " + action.type);
  }
}
