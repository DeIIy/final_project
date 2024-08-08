// src/redux/reducers.js
const initialState = {
    currentPage: 'flight-ticket', // Varsayılan sayfa
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PAGE':
        return {
          ...state,
          currentPage: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  