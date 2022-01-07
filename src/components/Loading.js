import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.svg';

const Loading = () => {
   return (
      <LoaderWrap>
         <Loader className='awesome-spin'></Loader>
         <img src={logo} alt='' />
      </LoaderWrap>
   );
};

export default Loading;

const LoaderWrap = styled.div`
   position: relative;
   display: flex;
   align-items: center;
   justify-content: center;
   height: calc(100vh - 200px);

   img {
      position: absolute;
      width: 30px;
      height: 30px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
   }
`;

const Loader = styled.div`
   position: relative;
   flex-grow: 0;
   flex-shrink: 0;
   border-radius: 50%;
   color: ${(props) => props.theme.themeDark};
   border-top: 3px solid;
   border-bottom: 3px solid;
   width: 60px;
   height: 60px;
   animation: spin 2s linear infinite;

   &:before,
   &:after {
      box-sizing: border-box;
      flex-grow: 0;
      flex-shrink: 0;
   }

   @keyframes spin {
      0% {
         transform: rotate(0deg);
      }
      100% {
         transform: rotate(360deg);
      }
   }
`;
