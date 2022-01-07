import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'graphql-hooks';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Loading, Error } from '../components';
import { formatPrice } from '../utils/helpers';

const SINGLE_PRODUCT_QUERY = `query SingleProduct($slug: String!) {
   product(filter: {slug: {eq: $slug}}) {
      title
      description
      price
      productImages {
         responsiveImage {
            src
         }
      }
      variations {
         id
         shoeSize
         stock
      }
   }
}`;

const SingleProductPage = () => {
   const [mainImage, setMainImage] = useState(0);
   const [amount, setAmount] = useState(1);
   const [stock, setStock] = useState(5);

   const { slug } = useParams();
   const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
      variables: {
         slug: slug,
      },
   });

   if (loading) return <Loading />;
   if (error) return <Error />;

   let product = data.product;
   const { title, description, price, productImages, variations } = product;
   const gallery = productImages.map((image) => image.responsiveImage.src);

   const fetchStock = (e) => {
      const sizeBtns = document.querySelectorAll('.size');
      sizeBtns.forEach((element) => {
         element.classList.remove('active');
      });
      e.target.classList.add('active');
      let value = e.target.textContent;
      setStock(
         variations.find((item) => item.shoeSize === Number(value)).stock
      );
      setAmount(1);
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
            <div className='gallery'>
               {gallery.map((item, index) => (
                  <img
                     key={index}
                     src={item}
                     alt={title + index}
                     onClick={() => setMainImage(index)}
                  />
               ))}
            </div>
         </Images>
         <Content>
            <h1 className='title'>{title}</h1>
            <p>{description}</p>
            <div className='price-stock'>
               <h2 className='price'>{formatPrice(price)}</h2>
               <h3>Available: {stock < 1 ? 'out of stock' : stock}</h3>
            </div>

            <div className='variations'>
               <h3>Sizes</h3>
               <div className='sizes'>
                  {variations.map((item) => (
                     <button
                        className='btn size'
                        key={item.id}
                        onClick={fetchStock}
                     >
                        {item.shoeSize}
                     </button>
                  ))}
               </div>
            </div>

            <AmountCart>
               <div className='amount'>
                  <button className='btn' onClick={toggleFigure}>
                     -
                  </button>
                  <div className='figure'>{amount}</div>
                  <button className='btn' onClick={toggleFigure}>
                     +
                  </button>
               </div>

               <button className='btn cart-btn'>Add to Cart</button>
            </AmountCart>
         </Content>
      </SingleProduct>
   );
};

export default SingleProductPage;

const SingleProduct = styled.section`
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
      display: flex;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      width: auto;

      img {
         height: 100px;
         width: calc(100% / 5);
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
            /* background: ${(props) => props.theme.neutralLight}; */
            border: none;
            border-radius: 5px;
            padding: 0.65rem 1.5rem;
            letter-spacing: 1px;
            text-transform: uppercase;
            cursor: pointer;

            &.active {
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
