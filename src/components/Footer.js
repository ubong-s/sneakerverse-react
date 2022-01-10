import React from 'react';
import styled from 'styled-components';

const Footer = () => {
   console.log();
   return (
      <FooterWrap>
         <FooterInner className='container'>
            <p>&copy; Sneakerverse {new Date().getFullYear()}</p>
            <p className='dev'>
               <span>Developed by</span>{' '}
               <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://www.devubong.com/'
               >
                  {' '}
                  DevUbong
               </a>
            </p>
         </FooterInner>
      </FooterWrap>
   );
};

export default Footer;

const FooterWrap = styled.footer`
   padding: 0.5rem 0;
`;

const FooterInner = styled.div`
   p {
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
   }

   .dev {
      text-transform: capitalize;
      span {
         opacity: 0.5;
      }
   }

   @media screen and (min-width: 768px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
   }
`;
