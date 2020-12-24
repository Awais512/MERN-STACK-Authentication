import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import AdminProfileUpdateForm from '../components/Forms/AdminProfileUpdateForm';

const Admin = () => {
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
        <h1 className='pt-5 text-center'>Admin</h1>
        <p className='lead text-center'>Profile Update</p>
        <AdminProfileUpdateForm values={values} setValues={setValues} />
      </div>
    </>
  );
};

export default Admin;
