import React from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import { useFilterContext } from '../context/filterContext';

const SearchSelectFilter = () => {
   const { updateFilters } = useFilterContext();
   const handleSubmit = (e) => {
      e.preventDefault();
   };

   return (
      <div className='container'>
         <Form onSubmit={handleSubmit}>
            <button type='submit'>
               <BsSearch />
            </button>
            <input
               type='text'
               name='search'
               placeholder='search sneakers'
               onChange={updateFilters}
            />
         </Form>
      </div>
   );
};

export default SearchSelectFilter;

const Form = styled.form`
   display: flex;
   align-items: center;
   gap: 1.5rem;
   padding-bottom: 5rem;

   input {
      font-family: ${(props) => props.theme.primaryFont};
      width: 100%;
      font-size: 1.15rem;
      font-weight: 600;
      border: none;
      outline: none;
      border-bottom: 2px solid ${(props) => props.theme.themeDark};
      padding-bottom: 1rem;
   }

   button {
      background: none;
      outline: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
   }

   @media screen and (min-width: 1024px) {
      gap: 4rem;

      input {
         font-size: 1.35rem;
      }

      button {
         font-size: 2.5rem;
      }
   }
`;
