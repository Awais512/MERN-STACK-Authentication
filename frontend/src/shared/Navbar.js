import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <ul className='nav nav-tabs bg-dark'>
      <li className='nav-item'>
        <Link to='/' className='text-light nav-link'>
          Home
        </Link>
      </li>
      <li className='nav-item float-right'>
        <Link to='/signin' className='text-light nav-link'>
          Signin
        </Link>
      </li>
      <li className='nav-item float-right'>
        <Link to='/signup' className='text-light nav-link'>
          Signup
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
