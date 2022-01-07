import { MENU_CLOSE, MENU_OPEN } from '../actions';

const globalReducer = (state, action) => {
   // Open Menu
   if (action.type === MENU_OPEN) {
      return { ...state, isMenuOpen: !state.isMenuOpen };
   }

   // Close Menu
   if (action.type === MENU_CLOSE) {
      return { ...state, isMenuOpen: false };
   }

   throw new Error(`No matching ${action.type} action type`);
};

export default globalReducer;
