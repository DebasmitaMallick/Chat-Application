import React from 'react'
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import "firebase/compat/app";
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';
import './login.css';

const Login = () => {

  return (
    <div id='login-page'>
      <div className='heading'>
        <h2>Welcome to Arrowhead</h2>
      </div>
      <div id='login-card'>
        <h2>Sign Up</h2>

        <div className="form-container">
          <div className='auth-signin-btn'>
            <div 
              className='login-button google'
              onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
            >
              <GoogleOutlined /> Google
            </div>

            <div 
              className='login-button facebook'
              onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}
            >
              <FacebookOutlined /> Facebook
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login