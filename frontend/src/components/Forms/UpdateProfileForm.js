import React from 'react';

const UpdateProfileForm = ({ values, setValues }) => {
  const { name, email, password, btnText, role } = values;
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Role</label>
        <input value={role} type='text' className='form-control' />
      </div>
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
        <input value={email} type='email' className='form-control' />
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

export default UpdateProfileForm;
