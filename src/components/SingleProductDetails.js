import React, { useState } from 'react';
import styled from 'styled-components';
import { Amount, Toast } from '.';
import { useCartContext } from '../context/cartContext';
import { formatPrice } from '../utils/helpers';

export default function SingleProductDetails({ product }) {
   const { addToCart } = useCartContext();
   const { id, title, description, price, productImages, variations } = product;
   const gallery = productImages.map((image) => image.responsiveImage.src);

   const [mainImage, setMainImage] = useState(0);
   const [amount, setAmount] = useState(1);
   const [size, setSize] = useState(variations[0].shoeSize);
   const [stock, setStock] = useState(variations[0].stock);

   const updateSelection = (e) => {
      let value = e.target.textContent;
      setStock(
         variations.find((item) => item.shoeSize === Number(value)).stock
      );
      setAmount(1);
      setSize(Number(value));
   };

   const toggleFigure = (e) => {
      let value = e.target.textContent;

      if (value === '-') {
         setAmount((initialAmount) => {
            let tempAmount = initialAmount - 1;

            if (tempAmount < 1) {
               tempAmount = 1;
            }
            return tempAmount;
         });
      }
      if (value === '+') {
         setAmount((initialAmount) => {
            let tempAmount = initialAmount + 1;

            if (tempAmount > stock) {
               tempAmount = stock;
            }
            return tempAmount;
         });
      }
   };

   return (
      <SingleProduct className='container'>
         <Images>
            <img src={gallery[mainImage]} alt={title} className='main' />
            <div className='gallery' length={gallery.length}>
               {gallery.map((item, index) => (
                  <div key={index}>
                     <img
                        src={item}
                        alt={title + index}
                        onClick={() => setMainImage(index)}
                     />
                  </div>
               ))}
            </div>
         </Images>
         <Content>
            <h1 className='title'>{title}</h1>
            <p>{description.substring(0, 300)}.</p>
            <div className='price-stock'>
               <h2 className='price'>{formatPrice(price)}</h2>
               <h3 className={amount === stock ? 'alert' : undefined}>
                  Available: {stock < 1 ? 'out of stock' : stock}{' '}
                  {amount === stock && '(Limit reached)'}
               </h3>
            </div>

            <div className='variations'>
               <h3>Sizes</h3>
               <div className='sizes'>
                  {variations.map((item) => (
                     <button
                        className={
                           item.shoeSize === size
                              ? 'btn size active'
                              : 'btn size'
                        }
                        key={item.id}
                        onClick={updateSelection}
                     >
                        {item.shoeSize}
                     </button>
                  ))}
               </div>
            </div>

            <AmountCart>
               <Amount
                  amount={amount}
                  increase={toggleFigure}
                  decrease={toggleFigure}
               />
               {/* <Link to='/cart' > */}
               <button
                  type='button'
                  onClick={(t) => addToCart(id, amount, size, product)}
                  className='btn cart-btn'
               >
                  Add to Cart
               </button>
               {/* </Link> */}
            </AmountCart>
         </Content>
         <Toast productDetails={{ amount, size, product }} />
      </SingleProduct>
   );
}

const SingleProduct = styled.section`
   position: relative;
   display: grid;
   gap: 2rem;

   @media screen and (min-width: 1024px) {
      grid-template-columns: 1.25fr 1fr;
      justify-content: center;
      gap: 3rem;
   }

   @media screen and (min-width: 1400px) {
      padding: 4rem;
   }
`;

const Images = styled.div`
   display: grid;
   gap: 1rem;

   @media screen and (min-width: 1200px) {
      grid-template-columns: auto 1fr;
      grid-template-areas: 'gallery main';
      justify-content: center;
   }

   .main {
      width: 100%;
      height: 350px;
      object-fit: cover;
      border-radius: 5px;

      @media screen and (min-width: 1200px) {
         height: 450px;
         grid-area: main;
      }
   }

   .gallery {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 0.75rem;
      width: 100%;

      img {
         height: 75px;
         width: 100%;
         border-radius: 5px;
         cursor: pointer;
         object-fit: cover;
      }

      @media screen and (min-width: 1200px) {
         display: initial;
         /* grid-template-columns: 1fr; */
         grid-area: gallery;

         img {
            display: block;
            margin-bottom: 0.75rem;
            height: calc(402px / 5);
            width: 100px;
         }
      }
   }
`;

const Content = styled.div`
   .title {
      font-size: 1.75rem;
   }

   .price-stock {
      display: flex;
      align-items: center;
      gap: 3rem;

      h3 {
         font-size: 0.9rem;

         &.alert {
            color: red;
         }
      }
   }

   .price {
      font-size: 2.5rem;
   }

   .variations {
      margin-bottom: 1.5rem;

      @media screen and (min-width: 768px) {
         display: flex;
         align-items: center;
         gap: 2rem;

         h3 {
            margin-bottom: 0;
         }
      }

      .sizes {
         display: flex;
         gap: 0.5rem;

         .btn {
            font-family: ${(props) => props.theme.primaryFont};
            font-weight: 600;
            font-size: 1rem;
            color: ${(props) => props.theme.themeDark};
            border: none;
            border-radius: 5px;
            padding: 0.65rem 1.5rem;
            letter-spacing: 1px;
            text-transform: uppercase;
            cursor: pointer;

            &.active,
            &:hover {
               color: ${(props) => props.theme.themeWhite};
               background: ${(props) => props.theme.themeDark};
               transition: ${(props) => props.theme.transitionEase};
            }
         }
      }
   }
`;

const AmountCart = styled.div`
   display: flex;
   gap: 4rem;

   .amount {
      display: flex;
      gap: 1.5rem;
      font-size: 1.5rem;
      font-weight: 600;
   }

   .cart-btn {
      color: ${(props) => props.theme.themeWhite};
      background: ${(props) => props.theme.themeDark};
      transition: ${(props) => props.theme.transitionEase};

      &:hover {
         opacity: 0.9;
      }
   }
`;
