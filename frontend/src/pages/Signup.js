import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Signup = () => {
  return (
    <>
      <ToastContainer />
      <h1>Signup Form</h1>
    </>
  );
};

export default Signup;
