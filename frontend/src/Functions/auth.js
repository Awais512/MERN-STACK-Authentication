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

//Set Cookie
export const setCookie = (key, value) => {
  if (window !== 'undefined') {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

//Remove Cookie
export const removeCookie = (key) => {
  if (window !== 'undefined') {
    cookie.remove(key);
  }
};

//Get Cookie
export const getCookie = (key) => {
  if (window !== 'undefined') {
    return cookie.get(key);
  }
};

//Set Cookie in Localstorage
export const setCookieInLocalStorage = (key, value) => {
  if (window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

//Set Cookie in Localstorage
export const removeCookieFromLocalStorage = (key) => {
  if (window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

//Get Cookie in Localstorage
// export const getCookieFromLocalStorage = (key, value) => {
//   if (window !== 'undefined') {
//     localStorage.getItem(key, JSON.parse(value));
//   }
// };

export const authenticate = (res, next) => {
  setCookie('token', res.data.token);
  setCookieInLocalStorage('user', res.data.user);
  next();
};

//User Info
export const isAuth = () => {
  if (window !== 'undefined') {
    const cookeChecked = getCookie('token');
    if (cookeChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
      } else {
        return false;
      }
    }
  }
};
