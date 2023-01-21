import { combineReducers } from 'redux';


const initialAuthState = {
  isAuthenticated: false,
};
const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isAuthenticated: true,
        ...action.payload,
      };

    case 'LOGOUT':
      return initialAuthState;

    default:
      return state;
  }
};
let theNewone = localStorage.getItem('chosenColor');
if (theNewone==null) {
  theNewone = 'Pink';
  localStorage.setItem('chosenColor', theNewone);
}


const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
