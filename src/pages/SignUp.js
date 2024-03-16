import React, { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserDataService from '../services/UserDataService';
import AppContext from '../AppContext';
import { NotificationManager } from 'react-notifications';

export default function SignUp() {
  const { dispatch } = useContext(AppContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrorMessage] = React.useState({});
  const navigate = useNavigate();

  const onChangeHandleName = (e) => {
    let name = e.target.value;
    setName(name);
  };

  const onChangeHandleEmail = (e) => {
    e.preventDefault();
    let email = e.target.value;
    setEmail(email);
  };

  const onChangeHandlePassword = (e) => {
    let password = e.target.value;
    setPassword(password);
  };

  const onChangeHandleSubmit = (e) => {
    e.preventDefault();

    let errors = {};

    if (password !== confirmPassword) {
      errors.passwordmatch = 'Passwords do not match';

      setErrorMessage(errors);
    }
    if (!name) {
      errors.name = 'Name is required';
      setErrorMessage(errors);
    }
    if (!email) {
      errors.email = 'Email id is required';
      setErrorMessage(errors);
    } else {
      UserDataService.doRegisterUser({ name, email, password })
        .then((res) => {
          if (res.data.error) {
            errors.message = res.data.error;
            setErrorMessage(errors);
            NotificationManager.error(res.data.error);
            return;
          }

          dispatch({ type: 'SET_USER', user: res.data });
          NotificationManager.success('Registration successfull');
          navigate('/signin/success');
        })
        .catch((e) => {
          console.log(e);
          NotificationManager.error(e.response.data.error);
        });
    }
  };

  const onChangeConfirmPassword = (e) => {
    let c = e.target.value;
    setConfirmPassword(c);
  };

  return (
    <Container className='py-5' style={{ maxWidth: 400 }}>
      <h2 className='mb-4 text-center'>Sign Up</h2>

      <Form className='signup'>
        <Form.Group className='mb-3' controlId='formBasicName'>
          <Form.Label className='formLabel'>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='John doe'
            value={name}
            onChange={onChangeHandleName}
            required
          />
          {errors.name && <p className='mt-1 text-danger'> {errors.name} </p>}
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label className='formLabel'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='john.doe@gmail.com'
            value={email}
            onChange={onChangeHandleEmail}
          />
          {errors.email && <p className='mt-1 text-danger'> {errors.email} </p>}
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label className='formLabel'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={onChangeHandlePassword}
          />
          {errors.password && (
            <p className='mt-1 text-danger'> {errors.password} </p>
          )}
        </Form.Group>
        <Form.Group className='mb-4' controlId='formBasicCnfPassword'>
          <Form.Label className='formLabel'>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
          />
          {errors.passwordmatch && (
            <p className='mt-1 text-danger'> {errors.passwordmatch} </p>
          )}
        </Form.Group>

        <Button
          className='w-100 mb-5'
          variant='primary'
          type='button'
          onClick={onChangeHandleSubmit}
        >
          Sign Up
        </Button>

        <p className='text-center'>Already a user?</p>
        <Button className='w-100' as={Link} to='/' variant='light'>
          Login to your account
        </Button>
      </Form>
    </Container>
  );
}
