import React from 'react';
import styled from 'styled-components';
import { Amount } from '.';
import { useCartContext } from '../context/cartContext';
import { formatPrice } from '../utils/helpers';

export default function CartItem({ id, title, size, amount, image, price }) {
   const { removeItem, toggleAmount } = useCartContext();

   const increase = () => {
      toggleAmount(id, 'inc');
   };

   const decrease = () => {
      toggleAmount(id, 'dec');
   };

   return (
      <CartItemWrap>
         <img src={image} alt={title} />
         <div className='content'>
            <div>
               <h4>{title}</h4>
               <p>
                  <span>Size:</span> {size}
               </p>
            </div>
            <p>
               <span>Price:</span> {formatPrice(price)}
            </p>
            <div className='amount-subtotal'>
               <Amount
                  amount={amount}
                  increase={increase}
                  decrease={decrease}
               />
               <p className='subtotal'>
                  <span>Subtotal:</span> {formatPrice(price * amount)}
               </p>
            </div>
            <button className='btn remove-btn' onClick={() => removeItem(id)}>
               remove
            </button>
         </div>
      </CartItemWrap>
   );
}

const CartItemWrap = styled.div`
   display: grid;
   grid-template-columns: auto 1fr;
   align-items: center;
   /* box-shadow: ${(props) => props.theme.shadow}; */
   border-radius: 5px;
   overflow: hidden;
   font-size: 0.9rem;
   background: #fafafa;

   span {
      font-weight: bold;
   }

   img {
      width: 150px;
      height: 200px;
      object-fit: cover;
   }

   .content {
      display: grid;
      text-align: left;
      padding: 1rem;

      h4,
      h5,
      h6,
      p {
         margin-bottom: 0.25rem;
      }

      @media screen and (min-width: 1024px) {
         grid-template-columns: 1fr auto 2fr auto;
         gap: 2rem;
         align-items: flex-start;
      }
   }

   .amount-subtotal {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0.5rem 0;

      .subtotal {
         display: flex;
         align-items: center;
         justify-content: flex-end;

         span {
            font-size: 0.8rem;
         }
      }
   }

   .remove-btn {
      padding: 0.5rem;
      text-transform: capitalize;
      font-size: 0.8rem;
      align-self: flex-end;
   }

   @media screen and (min-width: 1024px) {
      font-size: 1rem;

      img {
         width: 100px;
         height: 100px;
         object-fit: cover;
      }

      .amount-subtotal {
         margin: 0;
         align-items: flex-start;
      }

      .remove-btn {
         align-self: flex-start;
      }
   }
`;
