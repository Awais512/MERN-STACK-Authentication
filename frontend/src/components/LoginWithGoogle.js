import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { authenticate, isAuth } from '../Functions/auth';
import axios from 'axios';

const LoginWithGoogle = () => {
  const responseGoogle = (response) => {
    console.log(response.tokenId);
    axios
      .post(`${process.env.REACT_APP_API}/googlelogin`, {
        idToken: response.tokenId,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  return (
    <div className='pb-3'>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className='btn btn-danger btn-lg btn-block'
          >
            <i className='fab fa-google pr-2'></i> Login With Google
          </button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default LoginWithGoogle;
