import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import AppPreLoader from '../components/AppPreLoader';

export default function SiginSuccessPage() {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  useEffect(() => {
    if (user.student.length > 0 || user.instructor.length > 0) {
      const classId = user.student[0] || user.instructor[0];
      navigate(`/classroom/${classId}`);
      return;
    }

    navigate('/join');
  }, []);
  return <AppPreLoader />;
}
