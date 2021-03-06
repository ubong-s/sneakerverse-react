import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCartContext } from '../context/cartContext';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';

const Toast = ({ productDetails }) => {
   const { hideToast, showToast } = useCartContext();
   const { amount, size, product } = productDetails;
   return (
      <ToastWrap className={showToast && 'active'}>
         <div className='overlay' onClick={hideToast}>
            <Modal className='container'>
               <div className='modal-content'>
                  <BsFillCheckCircleFill className='icon' />
                  <h4>
                     {amount} {product.title}
                     <span>(size {size})</span>
                     <span>added to cart</span>
                  </h4>
                  <div className='btn-container'>
                     <Link to='/' onClick={hideToast}>
                        <button className='btn-alt btn-small'>
                           Continue Shopping
                        </button>
                     </Link>
                     <Link to='/cart' onClick={hideToast}>
                        <button className='btn-alt btn-small'>
                           Go to cart
                        </button>
                     </Link>
                  </div>
                  <div className='close-btn'>
                     <AiFillCloseCircle />
                  </div>
               </div>
            </Modal>
         </div>
      </ToastWrap>
   );
};

export default Toast;

const ToastWrap = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   padding: 1rem;
   z-index: 1000;
   transition: ${(props) => props.theme.transitionEase};
   transform: scale(0);

   &.active {
      transform: scale(1);
   }

   .overlay {
      position: absolute;
      background: rgba(0, 0, 0, 0.3);
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 1rem;
   }
`;

const Modal = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   height: 100%;

   .modal-content {
      position: relative;
      background: white;
      padding: 2.5rem;
      border-radius: 5px;
      text-align: center;
      min-width: 375px;
      min-height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .icon {
         font-size: 4rem;
         margin-bottom: 1rem;
      }

      .close-btn {
         position: absolute;
         right: 1rem;
         top: 1rem;
         font-size: 2rem;
         cursor: pointer;
         transition: ${(props) => props.theme.transitionEase};
         line-height: 0;

         &:hover {
            opacity: 0.6;
         }
      }

      .btn-container {
         display: grid;
         gap: 0.5rem;
      }

      h4 {
         font-size: 1.5rem;
      }

      span {
         display: block;
         font-size: 1.25rem;
      }
   }

   @media screen and (min-width: 1024px) {
      .modal-content {
         width: 50%;
         height: 50%;
         max-width: 500px;

         .btn-container {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;

            button {
               width: 100%;
            }

            a {
               &:first-of-type {
                  text-align: right;
               }

               &:last-of-type {
                  text-align: left;
               }
            }
         }
      }
   }
`;
