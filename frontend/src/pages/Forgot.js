import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import ForgotPasswordForm from '../components/Forms/ForgotPasswordForm';

const Forgot = () => {
  const [values, setValues] = useState({
    email: '',
  });
  return (
    <>
      <div className='col-md-6 offset-md-3'>
        <ToastContainer />
        <h1 className='p-5 text-center'>Forgot Password</h1>
        <ForgotPasswordForm values={values} setValues={setValues} />
      </div>
    </>
  );
};

export default Forgot;
