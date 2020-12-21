import axios from 'axios';

export const registerUser = async ({ name, email, password }) => {
  // const config = {
  //     headers: {

  //     },
  //   };
  return await axios.post(`${process.env.REACT_APP_API}/auth/signup`, {
    name,
    email,
    password,
  });
};

export const userSignin = async ({ email, password }) => {
  return await axios.post(`${process.env.REACT_APP_API}/auth/signin`, {
    email,
    password,
  });
};
