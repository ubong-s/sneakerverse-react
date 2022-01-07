import React from 'react';
import styled from 'styled-components';

const Footer = () => {
   console.log();
   return (
      <FooterWrap>
         <FooterInner className='container'>
            <p>&copy; Sneakerverse {new Date().getFullYear()}</p>
         </FooterInner>
      </FooterWrap>
   );
};

export default Footer;

const FooterWrap = styled.footer``;
const FooterInner = styled.div`
   text-transform: uppercase;

   p {
      font-weight: 600;
      letter-spacing: 1px;
   }
`;
