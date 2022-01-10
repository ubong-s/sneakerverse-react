import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatPrice } from '../utils/helpers';

const Product = ({ product }) => {
   const { title, productImages, price, category, slug } = product;

   return (
      <ProductContainer>
         <Link to={`/products/${slug}`}>
            <ProductImage>
               <img
                  src={productImages[0].responsiveImage.src}
                  alt={title}
                  className='cover-image'
               />
               <div className='white'></div>
            </ProductImage>
            <ProductInfo>
               <div className='title'>
                  <h4>{title}</h4>
                  <h6>{category.name}</h6>
               </div>
               <p>{formatPrice(price)}</p>
            </ProductInfo>
         </Link>
      </ProductContainer>
   );
};

export default Product;

const ProductContainer = styled.article``;

const ProductImage = styled.div`
   position: relative;
   border-radius: 5px;
   overflow: hidden;

   .cover-image {
      height: 450px;
      width: 100%;
      object-fit: cover;

      @media screen and (min-width: 768px) {
         height: 400px;
      }
      @media screen and (min-width: 1024px) {
         height: 350px;
      }
   }

   .white {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 70%;
      height: 15%;
      background: ${(props) => props.theme.themeWhite};
   }
`;

const ProductInfo = styled.div`
   position: relative;
   display: flex;
   align-items: flex-end;
   justify-content: space-between;
   z-index: 2;

   h4 {
      font-size: 1.25rem;
      margin-top: -1rem;
   }

   h6 {
      font-size: 0.9rem;
      text-transform: uppercase;
      color: ${(props) => props.theme.neutralLight};
      margin-bottom: 0;
   }

   span {
      display: flex;
      align-items: center;
      gap: 1rem;
   }

   p {
      font-size: 1.75rem;
      font-weight: 600;
      margin-bottom: 0;
   }
`;
