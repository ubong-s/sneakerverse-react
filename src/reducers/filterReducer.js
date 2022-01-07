import {
   LOAD_PRODUCTS,
   UPDATE_FILTERS,
   FILTER_PRODUCTS,
   CLEAR_FILTERS,
} from '../actions';

const filterReducer = (state, action) => {
   if (action.type === LOAD_PRODUCTS) {
      const maxPrice = Math.max(
         ...action.payload.map((product) => product.price)
      );

      return {
         ...state,
         allProducts: action.payload,
         filteredProducts: action.payload,
         filters: { ...state.filters, price: maxPrice, maxPrice },
      };
   }

   if (action.type === UPDATE_FILTERS) {
      const { name, value } = action.payload;
      return {
         ...state,
         filters: { ...state.filters, [name]: value },
      };
   }

   if (action.type === FILTER_PRODUCTS) {
      let tempProducts = [...state.allProducts];
      const { search, brand, category, size, price } = state.filters;

      if (search) {
         tempProducts = tempProducts.filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
         );
      }

      if (brand !== 'All') {
         tempProducts = tempProducts.filter(
            (product) => product.brand.name === brand
         );
      }

      if (category !== 'All') {
         tempProducts = tempProducts.filter(
            (product) => product.category.name === category
         );
      }

      if (size !== 'All') {
         tempProducts = tempProducts.filter((product) =>
            product.variations.find(
               (variant) => variant.shoeSize === Number(size)
            )
         );
      }

      tempProducts = tempProducts.filter((product) => product.price <= price);

      return {
         ...state,
         filteredProducts: tempProducts,
      };
   }

   if (action.type === CLEAR_FILTERS) {
      console.log('clear');
      return {
         ...state,
         filters: {
            ...state.filters,
            search: '',
            brand: 'All',
            category: 'All',
            size: 'All',
            price: state.filters.maxPrice,
         },
      };
   }
   throw new Error(`no matching ${action.type} action type`);
};

export default filterReducer;
