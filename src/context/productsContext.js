import React, { useContext, useEffect, useReducer } from 'react';
import { useQuery } from 'graphql-hooks';
import { GET_PRODUCTS, LOADING, ERROR } from '../actions';
import reducer from '../reducers/productsReducer';

const PRODUCTS_QUERY = `query Products {
   allProducts {
      id
      title
      slug
      description
      price
      productImages {
         responsiveImage {
            src
         }
      }
      category {
         name
      }
      brand {
         name
      }
      variations {
      id
      shoeSize
      stock
      }
   }
}`;

const ProductsContext = React.createContext();

const initialState = {
   allProducts: [],
   filteredProducts: [],
   loading: false,
   error: false,
   singleProduct: {},
};

export const ProductsProvider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const { data, loading } = useQuery(PRODUCTS_QUERY);

   const fetchProducts = () => {
      dispatch({
         type: LOADING,
      });
      try {
         if (!loading) {
            const products = data.allProducts;
            dispatch({ type: GET_PRODUCTS, payload: products });
         }
      } catch (err) {
         dispatch({ type: ERROR });
      }
   };

   useEffect(() => {
      fetchProducts();
      // eslint-disable-next-line
   }, [loading]);

   return (
      <ProductsContext.Provider value={{ ...state }}>
         {children}
      </ProductsContext.Provider>
   );
};

export const useProductsContext = () => useContext(ProductsContext);
