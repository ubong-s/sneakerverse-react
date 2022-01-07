import { GET_PRODUCTS, LOADING, ERROR } from '../actions';

const productsReducer = (state, action) => {
   if (action.type === LOADING) {
      return {
         ...state,
         loading: true,
      };
   }

   if (action.type === ERROR) {
      return {
         ...state,
         error: true,
      };
   }

   if (action.type === GET_PRODUCTS) {
      return {
         ...state,
         loading: false,
         allProducts: action.payload,
         filteredProducts: action.payload,
      };
   }

   // if (action.type === 'FETCH_SINGLE') {
   //    const tempProduct = state.allProducts.find(
   //       (product) => product.slug === action.payload
   //    );

   //    console.log(tempProduct);
   //    return {
   //       ...state,
   //       loading: false,
   //       singleProduct: tempProduct,
   //    };
   // }

   throw new Error(`No matching ${action.type} action type`);
};

export default productsReducer;
