import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalProvider } from './context/globalContext';
import { ProductsProvider } from './context/productsContext';
import { GlobalStyle, Theme } from './styles/globalStyle';
import { GraphQLClient, ClientContext } from 'graphql-hooks';
import { FilterProvider } from './context/filterContext';

const client = new GraphQLClient({
   url: 'https://graphql.datocms.com/',
   headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_DATO_API_TOKEN,
   },
});

ReactDOM.render(
   <Theme>
      <GlobalProvider>
         <ClientContext.Provider value={client}>
            <ProductsProvider>
               <FilterProvider>
                  <GlobalStyle />
                  <App />
               </FilterProvider>
            </ProductsProvider>
         </ClientContext.Provider>
      </GlobalProvider>
   </Theme>,
   document.getElementById('root')
);
