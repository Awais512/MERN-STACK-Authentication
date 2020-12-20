import React from 'react';
import { registerUser } from '../../Functions/auth';
import { toast } from 'react-toastify';

const SignupForm = ({ values, setValues }) => {
  const { name, email, password, btnText } = values;
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!name) {
        return toast.error('Name is Required');
      } else if (!password) {
        return toast.error('Password is Required');
      } else if (password.length < 6) {
        return toast.error('Password should be atleast 6 characters');
      } else if (!email) {
        return toast.error('Email is Required');
      }
      const { data } = await registerUser({ name, email, password });
      console.log(data);
      setValues({
        ...values,
        name: '',
        email: '',
        password: '',
        btnText: 'Submit',
      });
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      setValues({
        ...values,
        name: '',
        email: '',
        password: '',
        btnText: 'Submit',
      });
      toast.error('Email Already Exist');
    }
  };
  return (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          onChange={handleChange('name')}
          value={name}
          type='text'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          onChange={handleChange('email')}
          value={email}
          type='email'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          onChange={handleChange('password')}
          value={password}
          type='password'
          className='form-control'
        />
      </div>
      <div className='pt-2'>
        <button
          disabled={!name || !email || !password}
          className='btn btn-primary'
          onClick={handleSubmit}
        >
          {btnText}
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
