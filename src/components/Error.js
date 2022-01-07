import React from 'react';
import logo from '../assets/logo.svg';
import styled from 'styled-components';

const Error = () => {
   return (
      <ErrorWrap className='container'>
         <img src={logo} alt='' />
         <h2>Error occured... Please refresh</h2>
      </ErrorWrap>
   );
};

export default Error;

const ErrorWrap = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   height: calc(100vh - 200px);

   img {
      margin-bottom: 1rem;
   }
`;
