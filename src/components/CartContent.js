import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CartItem } from '.';
import { useCartContext } from '../context/cartContext';

export default function CartContent() {
   const { cart, clearCart } = useCartContext();

   return (
      <CartContentWrap>
         {cart.map((c) => (
            <CartItem key={c.id} {...c} />
         ))}
         <div className='cart-btns'>
            <Link to='/' className='btn-alt btn-small'>
               Continue shopping
            </Link>
            <button className='btn-alt btn-small' onClick={clearCart}>
               clear cart
            </button>
         </div>
      </CartContentWrap>
   );
}

const CartContentWrap = styled.div`
   display: grid;
   gap: 1rem;

   .cart-btns {
      display: flex;
      justify-content: space-between;
      width: 100%;
   }

   @media screen and (min-width: 1024px) {
      .cart-btns {
         display: flex;
         justify-content: start;
         gap: 1rem;
      }
   }
`;
