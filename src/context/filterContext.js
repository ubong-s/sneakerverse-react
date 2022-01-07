import React, { useContext, useReducer, useEffect } from 'react';
import {
   LOAD_PRODUCTS,
   UPDATE_FILTERS,
   FILTER_PRODUCTS,
   CLEAR_FILTERS,
} from '../actions';
import reducer from '../reducers/filterReducer';
import { useProductsContext } from './productsContext';

const initialState = {
   allProducts: [],
   filteredProducts: [],
   filters: {
      search: '',
      brand: 'All',
      category: 'All',
      size: 'All',
      maxPrice: 0,
      minPrice: 0,
      price: 0,
   },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
   const { allProducts } = useProductsContext();
   const [state, dispatch] = useReducer(reducer, initialState);

   const updateFilters = (e) => {
      let name = e.target.name;
      let value = e.target.value;

      dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
   };

   const clearFilters = () => {
      dispatch({ type: CLEAR_FILTERS });
   };

   useEffect(() => {
      dispatch({ type: LOAD_PRODUCTS, payload: allProducts });
   }, [allProducts]);

   useEffect(() => {
      dispatch({ type: FILTER_PRODUCTS });
   }, [state.allProducts, state.filters]);

   return (
      <FilterContext.Provider value={{ ...state, updateFilters, clearFilters }}>
         {children}
      </FilterContext.Provider>
   );
};

export const useFilterContext = () => useContext(FilterContext);
