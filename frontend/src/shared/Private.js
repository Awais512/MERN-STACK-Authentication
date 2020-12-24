import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { isAuth } from '../Functions/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import UpdateProfileForm from '../components/Forms/UpdateProfileForm';

const Private = () => {
  const [values, setValues] = useState({
    role: '',
    name: '',
    email: '',
    password: '',
    btnText: 'Submit',
  });

  return (
    <>
      <div className='col-md-6 offset-md-3'>
        <ToastContainer />
        <h1 className='pt-5 text-center'>Private</h1>
        <p className='lead text-center'>Profile Update</p>
        <UpdateProfileForm values={values} setValues={setValues} />
      </div>
    </>
  );
};

export default Private;
