import React from 'react';

const SignupForm = ({ name, email, password, btnText }) => {
  const handleChange = (name) => (e) => {};
  const handleSubmit = (e) => {
    e.preventDefault();
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
        <button className='btn btn-primary' onClick={handleSubmit}>
          {btnText}
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
