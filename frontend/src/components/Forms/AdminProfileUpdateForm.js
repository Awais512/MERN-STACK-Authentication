import axios from 'axios';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getCookie, isAuth, signout, updateUser } from '../../Functions/auth';
import { useHistory } from 'react-router-dom';

const AdminProfileUpdateForm = ({ values, setValues }) => {
  const history = useHistory();
  const token = getCookie('token');

  const { name, email, password, btnText, role } = values;
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/user/admin/${isAuth()._id}`,
        { name, password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      updateUser(response, () => {
        toast.success('Profile updated Successfully');
      });
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { name, email, role } = data;
      setValues({ ...values, name: name, email: email, role: role });
    } catch (error) {
      toast.error(error.response.data.error);
      if (error.response.status === 401) {
        signout(() => {
          history.push('/');
        });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Role</label>
        <input
          defaultValue={role}
          type='text'
          className='form-control'
          disabled
        />
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
        <input
          defaultValue={email}
          type='email'
          className='form-control'
          disabled
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

export default AdminProfileUpdateForm;
