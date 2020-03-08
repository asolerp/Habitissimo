// store.js
import React, {createContext, useReducer} from 'react';


const initialState = {
  description: localStorage.getItem("habitissimo_budget") && (JSON.parse(localStorage.getItem("habitissimo_budget")).description || ''),
  date: localStorage.getItem("habitissimo_budget") && (JSON.parse(localStorage.getItem("habitissimo_budget")).date || ''),
  category: localStorage.getItem("habitissimo_budget") && (JSON.parse(localStorage.getItem("habitissimo_budget")).category || ''),
  subcategory: localStorage.getItem("habitissimo_budget") && (JSON.parse(localStorage.getItem("habitissimo_budget")).subcategory || ''),
  price: localStorage.getItem("habitissimo_budget") && (JSON.parse(localStorage.getItem("habitissimo_budget")).price || ''),  
  name: localStorage.getItem("habitissimo_budget") && (JSON.parse(localStorage.getItem("habitissimo_budget")).name || ''),
  email: localStorage.getItem("habitissimo_budget") && (JSON.parse(localStorage.getItem("habitissimo_budget")).email || ''),
  phone: localStorage.getItem("habitissimo_budget") && (JSON.parse(localStorage.getItem("habitissimo_budget")).phone || ''),
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'description':
        localStorage.setItem("habitissimo_budget", JSON.stringify({...state, description: action.value}));
        return { ...state, description: action.value }
      case 'date':
        localStorage.setItem("habitissimo_budget", JSON.stringify({...state, date: action.value}));
        return { ...state, date: action.value }
      case 'category':
        localStorage.setItem("habitissimo_budget", JSON.stringify({...state, category: action.value}));
        return { ...state, category: action.value }
      case 'subcategory':
        localStorage.setItem("habitissimo_budget", JSON.stringify({...state, subcategory: action.value}));
        return { ...state, subcategory: action.value }
      case 'price':
        localStorage.setItem("habitissimo_budget", JSON.stringify({...state, price: action.value}));
        return { ...state, price: action.value }
      case 'name':
        localStorage.setItem("habitissimo_budget", JSON.stringify({...state, name: action.value}));
        return { ...state, name: action.value }
      case 'email':
        localStorage.setItem("habitissimo_budget", JSON.stringify({...state, email: action.value}));
        return { ...state, email: action.value }
      case 'phone':
        localStorage.setItem("habitissimo_budget", JSON.stringify({...state, phone: action.value}));
        return { ...state, phone: action.value }
      default:
        throw new Error();
    };
  }, initialState)
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }