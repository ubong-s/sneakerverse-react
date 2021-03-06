import React, { useState } from 'react';
import styled from 'styled-components';
import { FiChevronDown } from 'react-icons/fi';
import { useFilterContext } from '../context/filterContext';
import { formatPrice } from '../utils/helpers';

const FilterForm = () => {
   const {
      allProducts,
      filters: { minPrice, maxPrice, price, size, brand, category },
      updateFilters,
      clearFilters,
   } = useFilterContext();
   const [filterOpen, setFilterOpen] = useState(false);

   const brands = [
      'All',
      ...new Set(allProducts.map((item) => item.brand.name)),
   ];

   const categories = [
      'All',
      ...new Set(allProducts.map((item) => item.category.name)),
   ];

   // const sizes = [
   //    'All',
   //    ...[...new Set(...allProducts.map((item) => item.variations))].map(
   //       (item) => item.shoeSize
   //    ),
   // ];

   const sortItems = (a, b) => {
      return a - b;
   };

   const getSizes = allProducts
      .map((item) => item.variations.map((item) => item.shoeSize))
      .join()
      .split(',')
      .sort(sortItems);

   const sizes = ['All', ...[...new Set(getSizes)]];

   return (
      <FilterWrap>
         <FilterToggle onClick={() => setFilterOpen(!filterOpen)}>
            <p>Filters</p>
            <span>
               <FiChevronDown className={filterOpen ? 'icon active' : 'icon'} />
            </span>
         </FilterToggle>
         <Form
            className={filterOpen && 'active'}
            onSubmit={(e) => e.preventDefault()}
         >
            <h3>Filter by</h3>
            <div className='form-group'>
               <select name='brand' onChange={updateFilters} value={brand}>
                  {/* <option value='' disabled selected hidden>
                     Brand
                  </option> */}
                  {brands.map((brand, index) =>
                     brand === 'All' ? (
                        <option key={index} value={brand}>
                           {brand} Brands
                        </option>
                     ) : (
                        <option key={index} value={brand}>
                           {brand}
                        </option>
                     )
                  )}
               </select>
               <select
                  name='category'
                  onChange={updateFilters}
                  value={category}
               >
                  {/* <option value='' disabled selected hidden>
                     Category
                  </option> */}
                  {categories.map((c, index) =>
                     c === 'All' ? (
                        <option key={index} value={c}>
                           {c} Categories
                        </option>
                     ) : (
                        <option key={index} value={c}>
                           {c}
                        </option>
                     )
                  )}
               </select>
               <select name='size' onChange={updateFilters} value={size}>
                  {/* <option value='' disabled selected hidden>
                     Size
                  </option> */}
                  {sizes.map((s, index) =>
                     s === 'All' ? (
                        <option key={index} value={s}>
                           {s} Sizes
                        </option>
                     ) : (
                        <option key={index} value={s}>
                           {s}
                        </option>
                     )
                  )}
               </select>
            </div>
            <div className='form-group'>
               <div className='price-container'>
                  <label>Price</label>
                  <p>{formatPrice(price)}</p>
               </div>
               <Input
                  name='price'
                  type='range'
                  min={minPrice}
                  max={maxPrice}
                  onChange={updateFilters}
                  value={price}
               />
               <div className='price'>
                  <span>{formatPrice(minPrice)}</span>
                  <span>{formatPrice(maxPrice)}</span>
               </div>
            </div>
            <button type='button' className='btn' onClick={clearFilters}>
               clear filters
            </button>
         </Form>
      </FilterWrap>
   );
};

export default FilterForm;

const FilterWrap = styled.div`
   h3 {
      text-transform: uppercase;
      color: ${(props) => props.theme.neutralLight};
      font-size: 1rem;
      margin-bottom: 0;
   }
`;

const Form = styled.form`
   display: flex;
   flex-direction: column;
   opacity: 0;
   height: 0;
   transition: ${(props) => props.theme.transitionEase};

   select {
      background: none;
      font-family: ${(props) => props.theme.primaryFont};
      width: 100%;
      font-size: 1.15rem;
      font-weight: 600;
      border: none;
      outline: none;
      border-bottom: 2px solid ${(props) => props.theme.neutralLight};
      padding: 0.5rem 0;

      @media screen and (min-width: 1024px) {
         padding: 1rem 0;
      }
   }

   label {
      font-size: 1.15rem;
      font-weight: 600;
   }

   .form-group {
      padding: 1rem 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
   }

   .price {
      display: flex;
      justify-content: space-between;
   }

   .price-container {
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
         margin: 0;
      }
   }

   &.active {
      opacity: 1;
      height: 100%;
   }

   @media screen and (min-width: 768px) {
      opacity: unset;
      height: unset;
   }
`;

const Input = styled.input`
   &[type='range'] {
      -webkit-appearance: none;
      margin: 18px 0;
      width: 100%;

      &:focus {
         outline: none;

         &::-webkit-slider-runnable-track {
            background: ${(props) => props.theme.themeDark};
         }
         &::-moz-range-track {
            background: ${(props) => props.theme.themeDark};
         }
      }

      &::-webkit-slider-runnable-track {
         width: 100%;
         height: 1px;
         cursor: pointer;
         background: ${(props) => props.theme.neutralLight};
         border: none;
      }

      &::-webkit-slider-thumb {
         border: 2px solid #000000;
         height: 20px;
         width: 20px;
         border-radius: 50%;
         background: #ffffff;
         cursor: pointer;
         -webkit-appearance: none;
         margin-top: -10px;
      }
      &::-moz-range-track {
         width: 100%;
         height: 1px;
         cursor: pointer;
         background: ${(props) => props.theme.neutralLight};
         border: none;
      }

      &::-moz-range-thumb {
         border: 2px solid #000000;
         height: 20px;
         width: 20px;
         border-radius: 50%;
         background: #ffffff;
         cursor: pointer;
         margin-top: -10px;
      }
   }
`;

const FilterToggle = styled.div`
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: space-between;
   color: ${(props) => props.theme.themeDark};
   font-size: 1.25rem;
   font-weight: 600;
   padding-bottom: 0.5rem;
   margin-bottom: 1.25rem;
   border-bottom: 2px solid ${(props) => props.theme.neutralLight};

   @media screen and (min-width: 768px) {
      display: none;
   }

   p {
      margin-bottom: 0;
   }

   .icon {
      font-size: 2rem;
      transition: ${(props) => props.theme.transitionEase};

      &.active {
         transform: rotate(180deg);
      }
   }
`;
