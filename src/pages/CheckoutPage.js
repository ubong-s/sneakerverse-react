import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StripeCheckout } from '../components';
import { useCartContext } from '../context/cartContext';

const CheckoutPage = () => {
   const { cart } = useCartContext();

   return (
      <CheckoutPageWrap className='container'>
         <h1>Checkout</h1>
         {cart.length < 1 ? (
            <div className='empty'>
               <h2>
                  Your cart is empty
                  <br />
                  <small>Visit our shop to fill it up</small>
               </h2>
               <Link to='/'>
                  <button className='btn-alt'>Go Shopping</button>
               </Link>
            </div>
         ) : (
            <StripeCheckout />
         )}
      </CheckoutPageWrap>
   );
};

export default CheckoutPage;

const CheckoutPageWrap = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   min-height: 80vh;

   .empty {
      text-align: center;
   }
`;
