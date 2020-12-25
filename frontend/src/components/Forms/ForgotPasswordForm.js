import React from 'react';
import { toast } from 'react-toastify';
import { forgotPassword } from '../../Functions/auth';

const ForgotPasswordForm = ({ values, setValues }) => {
  const { email } = values;
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await forgotPassword(email);
      console.log(data);
      setValues({ ...values, email: '' });
      toast.success(
        `A link has been sent to this "${email}". Follow the instructions`
      );
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };
  return (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          onChange={handleChange('email')}
          value={email}
          type='email'
          className='form-control'
        />
      </div>

      <div className='pt-2'>
        <button className='btn btn-primary' onClick={handleSubmit}>
          Request Password Reset Link
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
