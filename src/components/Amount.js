import React from 'react';
import styled from 'styled-components';

export default function Amount({ increase, decrease, amount }) {
   return (
      <AmountWrap>
         <button className='btn btn-amount' onClick={decrease}>
            -
         </button>
         <div className='figure'>{amount}</div>
         <button className='btn btn-amount' onClick={increase}>
            +
         </button>
      </AmountWrap>
   );
}

const AmountWrap = styled.div`
   display: flex;
   align-items: center;
   gap: 1rem;
   font-size: 1rem;
   font-weight: 600;

   .btn-amount {
      padding: 0.4rem 0.65rem;
   }
`;
