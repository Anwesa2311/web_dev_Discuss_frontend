export default function AppReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      localStorage.setItem('user', JSON.stringify(action.user));
      return { ...state, user: action.user };
    case 'APP_INIT':
      return { ...state, appInitialized: action.init };
    default:
      return state;
  }
}
