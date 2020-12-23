import React from 'react';
import { userSignin, authenticate } from '../../Functions/auth';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const SigninForm = ({ values, setValues }) => {
  const history = useHistory();
  const { email, password } = values;
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
    } else if (!password) {
      toast.error('Please enter your password');
    } else if (password.length < 6) {
      toast.error('Password must be atleast 6 characters');
    } else {
      try {
        const response = await userSignin({ email, password });
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          btnText: 'Submit',
        });
        console.log(response.data);
        authenticate(response, () => {
          toast.success(`Hey ${response.data.user.name} Welcome`);
          history.push('/');
        });
      } catch (error) {
        toast.error(error.response.data.error);
      }
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
          disabled={!email || !password || password.length < 6}
          className='btn btn-primary'
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SigninForm;
