import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import SignupForm from '../components/Forms/SignupForm';

const Signup = () => {
  const [values, setValues] = useState({
    name: 'Awais Ch',
    email: 'awaisc5099@gmail.com',
    password: '123456',
    btnText: 'Submit',
  });

  return (
    <>
      <div className='col-md-6 offset-md-3'>
        <ToastContainer />
        <h1 className='p-5 text-center'>Signup</h1>
        <SignupForm values={values} setValues={setValues} />
      </div>
    </>
  );
};

export default Signup;
