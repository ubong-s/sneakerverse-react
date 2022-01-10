import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { GlobalProvider } from './context/globalContext';
import { ProductsProvider } from './context/productsContext';
import { GlobalStyle, Theme } from './styles/globalStyle';
import { GraphQLClient, ClientContext } from 'graphql-hooks';
import { FilterProvider } from './context/filterContext';
import { CartProvider } from './context/cartContext';
import { UserProvider } from './context/userContext';

const client = new GraphQLClient({
   url: 'https://graphql.datocms.com/',
   headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: process.env.REACT_APP_DATO_API_TOKEN,
   },
});

ReactDOM.render(
   <Auth0Provider
      domain={process.env.REACT_APP_AUTH_DOMAIN}
      clientId={process.env.REACT_APP_CLIENT_ID}
      redirectUri={window.location.origin}
      cacheLocation='localstorage'
   >
      <UserProvider>
         <Theme>
            <GlobalProvider>
               <ClientContext.Provider value={client}>
                  <ProductsProvider>
                     <FilterProvider>
                        <CartProvider>
                           <GlobalStyle />
                           <App />
                        </CartProvider>
                     </FilterProvider>
                  </ProductsProvider>
               </ClientContext.Provider>
            </GlobalProvider>
         </Theme>
      </UserProvider>
   </Auth0Provider>,
   document.getElementById('root')
);
