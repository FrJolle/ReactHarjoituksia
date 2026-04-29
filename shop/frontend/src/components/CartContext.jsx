import { createContext, useReducer, useEffect } from 'react';


const initialCartState = () => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
};


const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingProduct = state.find(item => item.id === action.product.id && !item.preorder);
      if (existingProduct) {

        return state.map(item =>
          item.id === action.product.id && !item.preorder
            ? { ...item, quantity: item.quantity + action.product.quantity }
            : item
        );
      }

      return [...state, { ...action.product }];
    }

    case 'PREORDER': {
      const existingPreorder = state.find(item => item.id === action.product.id && item.preorder);
      if (existingPreorder) {

        return state.map(item =>
          item.id === action.product.id && item.preorder
            ? { ...item, quantity: item.quantity + action.product.quantity }
            : item
        );
      }

      return [...state, { ...action.product }];
    }

    case 'REMOVE_FROM_CART':

      return state.filter(item => item.id !== action.productId);

    case 'CLEAR_CART':

      return [];

    default:
      return state;
  }
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], initialCartState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
