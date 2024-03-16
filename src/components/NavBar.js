import './NavBar.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NotificationManager } from 'react-notifications';
import ClassDataService from '../services/ClassDataService';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext';

export default function NavBar() {
  const { user, dispatch } = useContext(AppContext);

  const [classList, setClassList] = useState({});

  const currPath = useLocation().pathname.replace('/', '');
  const currPathArr = currPath.split('/');

  let classId = '';
  if (currPath.includes('classroom')) {
    classId = currPathArr[1];
  }

  const navigate = useNavigate();
  const leaveClass = () => {
    ClassDataService.leave({ id: classId, user })
      .then((res) => {
        user.student = user.student.filter((v) => v !== classId);
        user.instructor = user.instructor.filter((v) => v !== classId);

        dispatch({ type: 'SET_USER', user });
        NotificationManager.success('Class left.');
        navigate('/signin/success');
      })
      .catch((e) => {
        NotificationManager.error(e.response.data.error);
      });
  };

  const deleteClass = () => {
    ClassDataService.delete({ id: classId, user })
      .then((res) => {
        user.student = user.student.filter((v) => v !== classId);
        user.instructor = user.instructor.filter((v) => v !== classId);
        dispatch({ type: 'SET_USER', user });
        NotificationManager.success('Class deleted.');
        navigate('/signin/success');
      })
      .catch((e) => {
        NotificationManager.error(e.response.data.error);
      });
  };

  const editClass = () => {
    navigate(`/classroom/${classId}/edit`);
  };

  useEffect(() => {
    if (user) {
      ClassDataService.getByIds([...user.student, ...user.instructor])
        .then((res) => {
          setClassList(res.data.classResp);
        })
        .catch((e) => {
          NotificationManager.error(
            'There was some error in loading information.'
          );
        });
    }
  }, [user]);

  return (
    <Navbar
      className='navbar'
      bg='primary'
      expand='lg'
      sticky='top'
      variant='dark'
    >
      <Container className='container-fluid'>
        <Navbar.Brand
          as={Link}
          className='d-flex align-items-center'
          to={classId ? `/classroom/${classId}` : '/'}
        >
          <img
            src='/images/logo-outlined-white.svg'
            alt={process.env.REACT_APP_APP_NAME}
          />
          {process.env.REACT_APP_APP_NAME}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />

        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'></Nav>
          {user && (
            <Nav>
              {Object.keys(classList).length > 0 && (
                <NavDropdown
                  title={
                    (classList[classId] || '').replaceAll(' ', '_') || 'Class'
                  }
                >
                  {Object.keys(classList).map((classId) => (
                    <NavDropdown.Item
                      key={classId}
                      as={Link}
                      to={`/classroom/${classId}`}
                    >
                      {classList[classId].replaceAll(' ', '_')}
                    </NavDropdown.Item>
                  ))}
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to='/join'>
                    Create/Join a class
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {currPath.includes('classroom') && (
                <NavDropdown title='Actions' id='class-action-nav-dropdown'>
                  <NavDropdown.Item onClick={leaveClass}>
                    Leave Class
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={deleteClass}>
                    Delete Class
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={editClass}>
                    Edit Class
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <NavDropdown title='User'>
                <NavDropdown.Item
                  onClick={() => dispatch({ type: 'SET_USER', user: null })}
                  className='text-danger'
                >
                  Signout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
