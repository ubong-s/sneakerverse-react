import React, { useEffect, createContext, useReducer, useContext } from 'react';
import {
   ADD_TO_CART,
   REMOVE_ITEM,
   CLEAR_CART,
   TOGGLE_CART_ITEM_AMOUNT,
   COUNT_CART_TOTALS,
   HIDE_TOAST,
} from '../actions';
import reducer from '../reducers/cartReducer';

const getLocalStorage = () => {
   let cart = localStorage.getItem('cart');
   if (cart) {
      return JSON.parse(localStorage.getItem('cart'));
   } else {
      return [];
   }
};

const initialState = {
   showToast: false,
   cart: getLocalStorage(),
   totalItems: 0,
   totalAmount: 0,
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initialState);

   // add to cart
   const addToCart = (id, amount, size, product) => {
      dispatch({ type: ADD_TO_CART, payload: { id, amount, size, product } });
   };

   // remove item
   const removeItem = (id) => {
      dispatch({ type: REMOVE_ITEM, payload: id });
   };

   // toggle amount
   const toggleAmount = (id, value) => {
      console.log(id, value);
      dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
   };

   // clear Cart
   const clearCart = () => {
      dispatch({ type: CLEAR_CART });
   };

   const hideToast = () => {
      dispatch({ type: HIDE_TOAST });
   };

   useEffect(() => {
      dispatch({ type: COUNT_CART_TOTALS });
      localStorage.setItem('cart', JSON.stringify(state.cart));
      // setTimeout(() => {
      //    if (state.showToast) {
      //       dispatch({ type: HIDE_TOAST });
      //    }
      // }, 5000);
   }, [state.cart]);

   return (
      <CartContext.Provider
         value={{
            ...state,
            addToCart,
            removeItem,
            toggleAmount,
            clearCart,
            hideToast,
         }}
      >
         {children}
      </CartContext.Provider>
   );
};

export const useCartContext = () => useContext(CartContext);
