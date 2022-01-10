import React from 'react';
import { Loading, ProductList, Error, SearchSelectFilter } from '../components';
import { useProductsContext } from '../context/productsContext';

const HomePage = () => {
   const { loading, error } = useProductsContext();

   if (loading) return <Loading />;

   if (error) return <Error />;

   return (
      <section>
         <SearchSelectFilter />
         <ProductList />
      </section>
   );
};

export default HomePage;
