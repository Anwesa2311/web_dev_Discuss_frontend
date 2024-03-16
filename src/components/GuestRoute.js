import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';

export default function GuestRoute({ children }) {
  const { user, appInitialized } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && appInitialized) {
      navigate('/signin/success');
      return;
    }
  }, []);

  return children;
}
