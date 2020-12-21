import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { activateAccount } from '../Functions/auth';
import jwt from 'jsonwebtoken';

const Activate = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    token: '',
    show: true,
  });

  const { name, token, show } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await activateAccount(token);
      setValues({ ...values, show: false });
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);
  return (
    <>
      <div className='col-md-6 offset-md-3'>
        <ToastContainer />
        <div className='text-center'>
          <h1 className='p-5'>Hey! {name} Ready to Activate Your Account</h1>
          <button className='btn btn-outline-primary' onClick={handleSubmit}>
            Activate Your Account
          </button>
        </div>
      </div>
    </>
  );
};

export default Activate;
