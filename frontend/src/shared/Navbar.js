import React from 'react';
import { Link } from 'react-router-dom';
import { isAuth, signout } from '../Functions/auth';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
  const history = useHistory();
  return (
    <ul className='nav nav-tabs bg-dark'>
      <li className='nav-item'>
        <Link to='/' className='text-light nav-link'>
          Home
        </Link>
      </li>
      {!isAuth() && (
        <>
          <li className='nav-item'>
            <Link to='/signin' className='text-light nav-link'>
              Signin
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/signup' className='text-light nav-link'>
              Signup
            </Link>
          </li>
        </>
      )}

      {isAuth() && isAuth().role === 'admin' && (
        <li className='nav-item'>
          <Link to='/admin' className='text-light nav-link'>
            {isAuth().name}
          </Link>
        </li>
      )}

      {isAuth() && isAuth().role === 'subscriber' && (
        <li className='nav-item'>
          <Link to='/private' className='text-light nav-link'>
            {isAuth().name}
          </Link>
        </li>
      )}

      {isAuth() && (
        <li className='nav-item'>
          <span
            className='text-light nav-link'
            style={{ cursor: 'pointer', color: '#fff' }}
            onClick={() => {
              signout(() => {
                history.push('/signin');
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  );
};

export default Navbar;
