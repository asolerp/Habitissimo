// store.js
import React, {createContext, useReducer} from 'react';

const key = "habitissimo_budget"

const getItemLocalStorage = (key, value, ret) => {
  return localStorage.getItem(key) && (JSON.parse(localStorage.getItem(key))[value] || ret)
}

const setItemLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value))
}


const initialState = {
  step: getItemLocalStorage(key, "step", 0) || 0,
  description: getItemLocalStorage(key, "description", "") || "",
  date: getItemLocalStorage(key, "date", ""),
  category: getItemLocalStorage(key, "category", ""),
  subcategory:getItemLocalStorage(key, "subcategory", "") || "",
  price: getItemLocalStorage(key, "price", "") || "",  
  name: getItemLocalStorage(key, "name", "") || "",
  email: getItemLocalStorage(key, "email", "") || "",
  phone: getItemLocalStorage(key, "phone", "") || "",
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'step':
        setItemLocalStorage(key, {...state, step: action.value});
        return { ...state, step: action.value }
      case 'description':
        setItemLocalStorage(key, {...state, description: action.value});
        return { ...state, description: action.value }
      case 'date':
        setItemLocalStorage(key, {...state, date: action.value});
        return { ...state, date: action.value }
      case 'category':
        setItemLocalStorage(key, {...state, category: action.value});
        return { ...state, category: action.value }
      case 'subcategory':
        setItemLocalStorage(key, {...state, subcategory: action.value});
        return { ...state, subcategory: action.value }
      case 'price':
        setItemLocalStorage(key, {...state, price: action.value});
        return { ...state, price: action.value }
      case 'name':
        setItemLocalStorage(key, {...state, name: action.value});
        return { ...state, name: action.value }
      case 'email':
        setItemLocalStorage(key, {...state, email: action.value});
        return { ...state, email: action.value }
      case 'phone':
        setItemLocalStorage(key, {...state, phone: action.value});
        return { ...state, phone: action.value }
      case 'clear':
        setItemLocalStorage(key, {});
        return { 
          step: 0,
          description: "",
          date: "",
          category: "",
          subcategory: "",
          price: "",
          name: "",
          email: "", 
          phone: ""
        }
      default:
        throw new Error();
    };
  }, initialState)
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }