import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import SigninForm from '../components/Forms/SigninForm';
import { Link, Redirect } from 'react-router-dom';
import { isAuth } from '../Functions/auth';

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  return (
    <>
      <div className='col-md-6 offset-md-3'>
        <ToastContainer />
        {isAuth() ? <Redirect to='/' /> : null}
        <h1 className='p-5 text-center'>Sign In</h1>
        <SigninForm values={values} setValues={setValues} />
        <br />
        <Link to='/forgot' className='btn btn-sm btn-outline-danger'>
          Forgot Password
        </Link>
      </div>
    </>
  );
};

export default Signin;
