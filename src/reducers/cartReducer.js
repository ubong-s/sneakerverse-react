import {
   ADD_TO_CART,
   REMOVE_ITEM,
   CLEAR_CART,
   TOGGLE_CART_ITEM_AMOUNT,
   COUNT_CART_TOTALS,
   HIDE_TOAST,
} from '../actions';

const cartReducer = (state, action) => {
   if (action.type === ADD_TO_CART) {
      const { id, amount, size, product } = action.payload;

      console.log(product);

      const tempItem = state.cart.find((i) => i.id === id + size);

      if (tempItem) {
         const tempCart = state.cart.map((cartItem) => {
            if (cartItem.id === id + size) {
               let newAmount = cartItem.amount + amount;
               if (newAmount > cartItem.max) {
                  newAmount = cartItem.max;
               }
               return { ...cartItem, amount: newAmount };
            } else {
               return cartItem;
            }
         });

         return { ...state, cart: tempCart, showToast: true };
      } else {
         const newItem = {
            id: id + size,
            title: product.title,
            size,
            amount,
            image: product.productImages[0].responsiveImage.src,
            price: product.price,
            max: product.variations.find((variant) => variant.shoeSize === size)
               .stock,
         };

         return {
            ...state,
            showToast: true,
            cart: [...state.cart, newItem],
         };
      }
   }

   if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
      const { id, value } = action.payload;
      // eslint-disable-next-line
      const tempCart = state.cart.map((item) => {
         if (item.id === id) {
            if (value === 'inc') {
               let newAmount = item.amount + 1;

               if (newAmount > item.max) {
                  newAmount = item.max;
               }
               return { ...item, amount: newAmount };
            }

            if (value === 'dec') {
               let newAmount = item.amount - 1;

               if (newAmount < 1) {
                  newAmount = 1;
               }
               return { ...item, amount: newAmount };
            }
         } else {
            return item;
         }
      });

      return {
         ...state,
         cart: tempCart,
      };
   }

   if (action.type === COUNT_CART_TOTALS) {
      const { totalItems, totalAmount } = state.cart.reduce(
         (total, cartItem) => {
            const { amount, price } = cartItem;

            total.totalItems += amount;
            total.totalAmount += price * amount;

            return total;
         },
         {
            totalItems: 0,
            totalAmount: 0,
         }
      );
      return {
         ...state,
         totalItems,
         totalAmount,
      };
   }

   if (action.type === HIDE_TOAST) {
      return {
         ...state,
         showToast: false,
      };
   }

   if (action.type === REMOVE_ITEM) {
      let tempCart = state.cart.filter((item) => item.id !== action.payload);

      return {
         ...state,
         cart: tempCart,
      };
   }

   if (action.type === CLEAR_CART) {
      return {
         ...state,
         cart: [],
         totalItems: 0,
         totalAmount: 0,
      };
   }

   throw new Error(`no matching ${action.type} action type`);
};

export default cartReducer;
