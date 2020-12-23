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
      toast.error(error.response.data.error);
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
          // disabled={
          //   !name ||
          //   name.length < 4 ||
          //   !email ||
          //   !password ||
          //   password.length < 6
          // }
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
