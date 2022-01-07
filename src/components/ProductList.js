import React from 'react';
import styled from 'styled-components';
import { FilterForm } from '.';
import { Product } from '.';
import { useFilterContext } from '../context/filterContext';

const ProductList = () => {
   const { filteredProducts } = useFilterContext();

   return (
      <>
         <ProductsContainer
            className={
               filteredProducts.length < 1 ? 'empty container' : 'container'
            }
         >
            <FilterForm />
            {filteredProducts.length < 1 ? (
               <EmptyProducts>
                  <h2>No product matches your search</h2>
               </EmptyProducts>
            ) : (
               filteredProducts.map((product) => (
                  <Product key={product.id} product={product} />
               ))
            )}
         </ProductsContainer>
      </>
   );
};

export default ProductList;

const ProductsContainer = styled.div`
   display: grid;
   align-items: stretch;
   gap: 2rem;

   @media screen and (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);

      &.empty {
         grid-template-columns: 1fr;
      }
   }

   @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 2.5rem;

      &.empty {
         grid-template-columns: 1fr 2fr;
      }
   }

   @media screen and (min-width: 1400px) {
      grid-template-columns: repeat(4, 1fr);

      &.empty {
         grid-template-columns: 1fr 3fr;
      }
   }
`;

const EmptyProducts = styled.div`
   align-self: center;
   justify-self: center;
   text-align: center;
`;
