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
            <ProductInfo className='info'>
               <h4>{title}</h4>
               <div className='product-footer'>
                  <h6>{category.name}</h6>
                  <p>{formatPrice(price)}</p>
               </div>
            </ProductInfo>
         </Link>
      </ProductContainer>
   );
};

export default Product;

const ProductContainer = styled.article`
   border-radius: 5px;
   overflow: hidden;
   transition: ${(props) => props.theme.transitionEase};

   .info,
   .white {
      transition: ${(props) => props.theme.transitionEase};
   }

   &:hover {
      background: ${(props) => props.theme.themeDark};

      .info {
         padding: 0 1rem 1rem 1rem;
         background: ${(props) => props.theme.themeDark};
         color: ${(props) => props.theme.themeWhite};

         h4 {
            color: ${(props) => props.theme.themeWhite};
         }
      }

      .white {
         background: ${(props) => props.theme.themeDark};
         /* opacity: 0; */
      }
   }
`;

const ProductImage = styled.div`
   position: relative;
   border-radius: 5px;
   overflow: hidden;
   line-height: 0;

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
      width: 75%;
      height: 12%;
      background: ${(props) => props.theme.themeWhite};
   }
`;

const ProductInfo = styled.div`
   position: relative;
   z-index: 2;
   padding-bottom: 1rem;

   .product-footer {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
   }

   h4 {
      font-size: 1.25rem;
      /* margin-top: -1rem; */
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
      line-height: 1;
   }
`;
