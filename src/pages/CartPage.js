import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCartContext } from '../context/cartContext';
import { CartContent, CartTotals } from '../components';

const CartPage = () => {
   const { cart } = useCartContext();

   if (cart.length < 1) {
      return (
         <CartWrap className='container'>
            <h2>
               Your cart is empty
               <br />
               <small>Visit our shop to fill it up</small>
            </h2>
            <Link to='/'>
               <button className='btn-alt'>Go Shopping</button>
            </Link>
         </CartWrap>
      );
   }

   return (
      <CartWrap className='container'>
         <CartInner>
            <h1>Cart</h1>
            <CartContent />

            <CartTotals />
         </CartInner>
      </CartWrap>
   );
};

export default CartPage;

const CartWrap = styled.div`
   display: flex;
   flex-direction: column;
   gap: 2rem;
   align-items: center;
   justify-content: center;
   min-height: 80vh;
   padding: 3rem 0;

   h1,
   h2 {
      text-align: center;
   }

   @media screen and (min-width: 1024px) {
      padding: 5rem 0;
   }
`;

const CartInner = styled.div`
   display: grid;
   gap: 1.5rem;
   width: 100%;
   max-width: 900px;
`;
