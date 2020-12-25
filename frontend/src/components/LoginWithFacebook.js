import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import axios from 'axios';

const LoginWithFacebook = ({ informParent = (f) => f }) => {
  const responseFacebook = (response) => {
    console.log(response);
    axios
      .post(`${process.env.REACT_APP_API}/auth/facebooklogin`, {
        userID: response.userID,
        accessToken: response.accessToken,
      })
      .then((response) => {
        console.log(response);
        informParent(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  return (
    <div>
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        autoLoad={false}
        render={(renderProps) => (
          <button
            className='btn btn-primary btn-lg btn-block'
            onClick={renderProps.onClick}
          >
            <i className='fab fa-facebook pr-2'></i>Login With Facebook
          </button>
        )}
        fields='name,email,picture'
        callback={responseFacebook}
      />
    </div>
  );
};

export default LoginWithFacebook;
