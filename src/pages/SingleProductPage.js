import React from 'react';
import { useQuery } from 'graphql-hooks';
import { useParams } from 'react-router-dom';
import { Loading, Error, SingleProductDetails } from '../components';

const SINGLE_PRODUCT_QUERY = `query SingleProduct($slug: String!) {
   product(filter: {slug: {eq: $slug}}) {
      id
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
   const { slug } = useParams();
   const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
      variables: {
         slug: slug,
      },
   });

   if (loading) return <Loading />;
   if (error) return <Error />;

   let product = data.product;

   return <SingleProductDetails product={product} />;
};

export default SingleProductPage;
