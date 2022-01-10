import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCartContext } from '../context/cartContext';
import { useUserContext } from '../context/userContext';
import { formatPrice } from '../utils/helpers';

export default function CartTotals() {
   const { totalAmount } = useCartContext();
   const { myUser, loginWithRedirect } = useUserContext();

   return (
      <CartTotalsWrap>
         <h5>Total: {formatPrice(totalAmount)}</h5>
         {myUser ? (
            <Link to='/checkout' className='btn-alt'>
               Proceed to checkout
            </Link>
         ) : (
            <button
               type='button'
               className='btn-alt'
               onClick={loginWithRedirect}
            >
               Login to initiate checkout
            </button>
         )}
      </CartTotalsWrap>
   );
}

const CartTotalsWrap = styled.div`
   text-align: center;

   h5 {
      font-size: 1.5rem;
   }

   @media screen and (min-width: 1024px) {
      text-align: right;
   }
`;
