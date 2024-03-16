import { Spinner } from 'react-bootstrap';
import './AppPreLoader.css';

export default function AppPreLoader() {
  return (
    <div className='app-pre-loader d-flex flex-column justify-content-center align-items-center'>
      <img
        className='mb-2'
        src='/images/logo-filled-primary.svg'
        alt={process.env.REACT_APP_APP_NAME}
      />
      <h2>{process.env.REACT_APP_APP_NAME}</h2>
      <span className='text-secondary'>
        Loading <Spinner animation='border' variant='secondary' size='sm' />
      </span>
    </div>
  );
}
