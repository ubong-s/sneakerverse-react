import React, { useContext, useReducer } from 'react';
import { MENU_OPEN, MENU_CLOSE } from '../actions';
import reducer from '../reducers/globalReducer';

const GlobalContext = React.createContext();

const initialState = {
   isMenuOpen: false,
};

export const GlobalProvider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initialState);

   const openMenu = () => {
      dispatch({ type: MENU_OPEN });
   };
   const closeMenu = () => {
      dispatch({ type: MENU_CLOSE });
   };

   return (
      <GlobalContext.Provider value={{ ...state, openMenu, closeMenu }}>
         {children}
      </GlobalContext.Provider>
   );
};

export const useGlobalContext = () => useContext(GlobalContext);
