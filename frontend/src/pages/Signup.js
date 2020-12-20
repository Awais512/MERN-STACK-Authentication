import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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
  const { name, email, password, btnText } = values;
  return (
    <>
      <div className='col-md-6 offset-md-3'>
        <ToastContainer />
        <h1 className='p-5 text-center'>Signup</h1>
        <SignupForm
          name={name}
          email={email}
          password={password}
          btnText={btnText}
        />
      </div>
    </>
  );
};

export default Signup;
