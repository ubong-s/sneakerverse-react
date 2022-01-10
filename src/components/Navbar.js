import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo-alt.svg';
import { menuLinks } from '../utils/constants';
import {
   AiOutlineShoppingCart,
   AiOutlineMenu,
   AiOutlineClose,
} from 'react-icons/ai';
import { useGlobalContext } from '../context/globalContext';
import { useCartContext } from '../context/cartContext';
import { useUserContext } from '../context/userContext';
// import { Toast } from '../components';

const Navbar = () => {
   const { isMenuOpen, openMenu, closeMenu } = useGlobalContext();
   const { totalItems, clearCart } = useCartContext();
   const { loginWithRedirect, myUser, logout } = useUserContext();

   return (
      <Header>
         <HeaderInner>
            <Logo to='/'>
               <img src={logo} alt='sneakerverse' />
            </Logo>
            <Nav className={isMenuOpen && 'active'}>
               <ul>
                  {menuLinks.map((item) => (
                     <li key={item.id} onClick={closeMenu}>
                        <Link to={item.link}>{item.title}</Link>
                     </li>
                  ))}
               </ul>
            </Nav>

            <LoginLogout>
               {myUser ? (
                  <button
                     className={isMenuOpen ? 'auth-btn active' : 'auth-btn'}
                     onClick={() => {
                        clearCart();
                        logout({ returnTo: window.location.origin });
                     }}
                  >
                     Logout
                  </button>
               ) : (
                  <button
                     className={isMenuOpen ? 'auth-btn active' : 'auth-btn'}
                     onClick={loginWithRedirect}
                  >
                     Login
                  </button>
               )}
            </LoginLogout>
            <CartIcon onClick={closeMenu}>
               <Link to='/cart'>
                  <AiOutlineShoppingCart
                     style={{ color: isMenuOpen ? '#fff' : '#222' }}
                  />
                  {totalItems > 0 && (
                     <div className={isMenuOpen ? 'total active' : 'total'}>
                        {totalItems}
                     </div>
                  )}
               </Link>
            </CartIcon>
            <Hamburger onClick={openMenu}>
               {isMenuOpen ? (
                  <AiOutlineClose style={{ color: '#fff' }} />
               ) : (
                  <AiOutlineMenu style={{ color: '#222' }} />
               )}
            </Hamburger>
            {/* <Toast /> */}
         </HeaderInner>
      </Header>
   );
};

export default Navbar;

const Header = styled.header`
   line-height: 0;
`;

const HeaderInner = styled.div`
   position: relative;
   display: grid;
   grid-template-columns: auto 1fr auto auto;
   gap: 3rem;
   align-items: center;
   width: 100%;
   margin: auto;

   @media screen and (min-width: 1024px) {
      width: 90%;
      gap: 4rem;
   }
`;

const Logo = styled(Link)`
   position: relative;
   background: ${(props) => props.theme.themeDark};
   padding: 0.75rem;
   width: 65px;
   width: 65px;
   line-height: 0;
   z-index: 101;

   @media screen and (min-width: 1024px) {
      width: 70px;
      width: 70px;
   }
`;

const Nav = styled.nav`
   /* display: none; */
   position: fixed;
   background: ${(props) => props.theme.themeDark};
   top: 0;
   left: 0;
   height: 100%;
   width: 100%;
   padding-top: 8rem;
   transform: translateX(-100%);
   transition: ${(props) => props.theme.transitionEase};
   z-index: 100;

   ul {
      display: flex;
      flex-direction: column;
      gap: 4rem;
      width: 93%;
      margin: auto;

      a {
         color: ${(props) => props.theme.themeWhite};
         font-size: 1.25rem;
         font-weight: 600;
         letter-spacing: 1px;
      }
   }

   &.active {
      transform: translateX(0);
   }

   @media screen and (min-width: 768px) {
      position: relative;
      background: unset;
      top: unset;
      left: unset;
      height: unset;
      width: unset;
      padding-top: unset;
      transform: unset;

      ul {
         display: flex;
         flex-direction: row;
         gap: 3rem;
         text-transform: uppercase;
         width: unset;
         margin: unset;

         a {
            color: unset;
            font-size: unset;
         }
      }
   }
`;
const CartIcon = styled.div`
   position: relative;
   justify-self: flex-end;
   font-size: 2.5rem;
   z-index: 100;

   .total {
      position: absolute;
      top: 50%;
      right: 40%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      width: 30px;
      font-size: 1.25rem;
      background: ${(props) => props.theme.themeDark};
      color: ${(props) => props.theme.themeWhite};
      border-radius: 50%;

      &.active {
         color: ${(props) => props.theme.themeDark};
         background: ${(props) => props.theme.themeWhite};
      }
   }
`;

const Hamburger = styled.div`
   position: relative;
   font-size: 2rem;
   padding-right: 1rem;
   cursor: pointer;
   z-index: 100;

   @media screen and (min-width: 768px) {
      display: none;
   }
`;

const LoginLogout = styled.div`
   position: relative;
   z-index: 100;
   justify-self: flex-end;

   .auth-btn {
      background: none;
      border: none;
      outline: none;
      color: ${(props) => props.theme.themeDark};
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 1rem;
      cursor: pointer;

      &.active {
         color: ${(props) => props.theme.themeWhite};
      }
   }
`;
