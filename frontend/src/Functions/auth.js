import axios from 'axios';
import cookie from 'js-cookie';

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

export const activateAccount = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/auth/account-activation`,
    { token }
  );
};

// set in cookie
export const setCookie = (key, value) => {
  if (window !== 'undefined') {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};
// remove from cookie
export const removeCookie = (key) => {
  if (window !== 'undefined') {
    cookie.remove(key, {
      expires: 1,
    });
  }
};
// get from cookie such as stored token
// will be useful when we need to make request to server with token
export const getCookie = (key) => {
  if (window !== 'undefined') {
    return cookie.get(key);
  }
};
// set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
// remove from localstorage
export const removeLocalStorage = (key) => {
  if (window !== 'undefined') {
    localStorage.removeItem(key);
  }
};
// authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
  console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
  setCookie('token', response.data.token);
  setLocalStorage('user', response.data.user);
  next();
};
// access user info from localstorage
export const isAuth = () => {
  if (window !== 'undefined') {
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
      } else {
        return false;
      }
    }
  }
};

export const signout = (next) => {
  removeCookie('token');
  removeLocalStorage('user');
  next();
};

export const loadProfile = async (id) => {
  const config = {
    headers: {
      Authorizaton: `Bearer ${getCookie('token')}`,
    },
  };
  return await axios.get(`${process.env.REACT_APP_API}/user/${id}`, config);
};

export const updateUser = async (response, next) => {
  if (typeof window !== 'undefined') {
    let auth = JSON.parse(localStorage.getItem('user'));
    auth = response.data;
    localStorage.setItem('user', JSON.stringify(auth));
  }
  next();
};
