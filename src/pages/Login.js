import { Container } from 'react-bootstrap';
import { useState, React } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserDataService from '../services/UserDataService';
import AppContext from '../AppContext';
import { NotificationManager } from 'react-notifications';

function Login() {
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrorMessage] = useState({});

  const onChangeHandleEmail = (e) => {
    let email = e.target.value;
    setEmail(email);
  };

  const onChangeHandlePassword = (e) => {
    let password = e.target.value;
    setPassword(password);
  };

  const handleLogin = () => {
    UserDataService.doLogin({ email, password })
      .then((res) => {
        if (res.data.error) {
          NotificationManager.error(res.data.error);
          return;
        }
        dispatch({ type: 'SET_USER', user: res.data });
        NotificationManager.success('Login successfull');
        navigate('/signin/success');
      })
      .catch((e) => {
        NotificationManager.error(e.response.data.error);
      });
  };
  return (
    <Container className='py-5' style={{ maxWidth: 400 }}>
      <h2 className='mb-4 text-center'>Login</h2>
      <Form>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={onChangeHandleEmail}
          />
        </Form.Group>

        <Form.Group className='mb-4' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={onChangeHandlePassword}
          />
        </Form.Group>
        <Form.Group>
          <Button
            className='w-100 mb-5'
            variant='primary'
            type='button'
            onClick={handleLogin}
          >
            Submit
          </Button>

          <p className='text-center'>Don't have an account?</p>
          <Button className='w-100' as={Link} to='/signup' variant='light'>
            Create a new account
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default Login;
