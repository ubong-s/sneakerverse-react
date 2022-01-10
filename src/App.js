import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './components';
import {
   CartPage,
   CheckoutPage,
   ErrorPage,
   HomePage,
   ProductsPage,
   SingleProductPage,
   PrivateRoute,
   AuthWrapper,
} from './pages';

function App() {
   return (
      <AuthWrapper>
         <Router>
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
                  <Route
                     exact
                     path='/checkout'
                     element={
                        <PrivateRoute>
                           <CheckoutPage />
                        </PrivateRoute>
                     }
                  />
                  <Route path='*' element={<ErrorPage />} />
               </Routes>
            </main>
            <Footer />
         </Router>
      </AuthWrapper>
   );
}

export default App;
