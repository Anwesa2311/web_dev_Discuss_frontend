import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';

export default function PrivateRoute({ children }) {
  const { user, appInitialized } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && appInitialized) {
      navigate('/');
      return;
    }
  }, [user, navigate, appInitialized]);

  if (!user) {
    return;
  }

  return children;
}
