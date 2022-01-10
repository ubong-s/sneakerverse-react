import { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const theme = {
   primaryFont: `'Quicksand', sans-serif`,
   secondaryFont: `'Quicksand', sans-serif`,
   primaryColor: '#0E62C2',
   secondaryColor: '#01346E',
   neutralLight: '#BABABA',
   themeWhite: '#FFF',
   themeDark: '#333',
   accentColor: '#F6ECE5',
   transitionEase: 'all 0.2s linear',
   transitionEase1: 'all 0.5s ease-in-out',
   shadow: '5px 5px 20px 0 rgb(0 0 0 / 3%)',
};

export const GlobalStyle = createGlobalStyle`
   html {
    position: relative;
   }

  *,
  ::after,
  ::before {
   box-sizing: border-box;
   margin: 0;
   padding: 0;
   }

   body {
      font-family:${(props) => props.theme.secondaryFont};
      background:${(props) => props.theme.themeWhite};
      color: ${(props) => props.theme.themeDark};
      line-height: 1.6;
      max-width: 1600px;
      font-weight: 400;
      margin: auto;
   }

   h1,
   h2,
   h3,
   h4,
   h5,
   h6 {
      color: ${(props) => props.theme.themeDark};
      font-family: ${(props) => props.theme.primaryFont};
      font-weight: 600;
      letter-spacing: 0.5px;
      line-height: 1.5;
      margin-bottom: 1rem;
   }

   p {
      font-family: ${(props) => props.theme.secondaryFont};
      margin-bottom:1rem;
   }
   
   button {
      font-family: ${(props) => props.theme.secondaryFont};
   }

   img {
      max-width: 100%;
   }

   main {
      min-height: calc(100vh - 125px);
   }

   section {
      padding: 3rem 0;

      @media screen and (min-width:1024px) {
         padding: 4rem 0;
      }
      
   }

   ul {
      list-style-type: none;
   }

   a {
      text-decoration: none;
      letter-spacing: 0.5px;
      color: ${(props) => props.theme.themeDark};
         
   }

   .container {
      width: 94%;
      margin: auto;
      max-width: 1400px;

      @media screen and (min-width:1024px) {
         width: 90%;
      }
   }

   .btn, .btn-alt {
      font-family: ${(props) => props.theme.primaryFont};
      font-weight: 600;
      font-size: 1rem;
      color: ${(props) => props.theme.themeDark};
      background: ${(props) => props.theme.neutralLight};
      border: none;
      border-radius: 5px;
      padding: 0.65rem 1.5rem;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      transition:${(props) => props.theme.transitionEase} ;
      
      &:hover {
         background: ${(props) => props.theme.themeDark};
         color: ${(props) => props.theme.neutralLight};
      }
   }

   .btn-alt {
         background: ${(props) => props.theme.themeDark};
         color: ${(props) => props.theme.neutralLight};
      
      &:hover {
         background: ${(props) => props.theme.neutralLight};
         color: ${(props) => props.theme.themeDark};
      }
   }

   .btn-small {
      font-size: 0.75rem;
      padding: 0.65rem 1rem;
   }
`;

export const Theme = ({ children }) => {
   return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
