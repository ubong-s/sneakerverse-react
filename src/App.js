import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './components';
import {
   CartPage,
   CheckoutPage,
   ErrorPage,
   HomePage,
   ProductsPage,
   SingleProductPage,
} from './pages';

function App() {
   return (
      <BrowserRouter>
         <Navbar />
         <main>
            <Routes>
               <Route exact path='/' element={<HomePage />} />
               <Route exact path='/products' element={<ProductsPage />} />
               <Route
                  exact
                  path='/products/:slug'
                  element={<SingleProductPage />}
               />
               <Route exact path='/cart' element={<CartPage />} />
               <Route exact path='/checkout' element={<CheckoutPage />} />
               <Route path='*' element={<ErrorPage />} />
            </Routes>
         </main>
         <Footer />
      </BrowserRouter>
   );
}

export default App;
