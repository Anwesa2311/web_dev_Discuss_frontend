import { createContext, useEffect, useReducer } from 'react';
import AppReducer from './AppReducer';
import AppPreLoader from './components/AppPreLoader';

const initialState = {
  user: null,
  appInitialized: false
};

const AppContext = createContext(initialState);

export const AppProvider = ({ children, ...props }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: 'SET_USER',
        user: JSON.parse(localStorage.getItem('user'))
      });
      dispatch({ type: 'APP_INIT', init: true });
    }, 1500);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, dispatch, ...props }}>
      {!state.appInitialized && <AppPreLoader />}
      {state.appInitialized && children}
    </AppContext.Provider>
  );
};

export default AppContext;
