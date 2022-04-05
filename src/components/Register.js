import {useState} from 'react';
import '../style.css';
import { Link } from 'react-router-dom';

export default function Register() {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessageText, setErrorMessageText] = useState(false);

    const handleUsername = (e) => {
        setUsername(e.target.value);
        setSubmitted(false);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setSubmitted(false);
    };


    const emailValidation = () => {
      const regex = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
      if(!email || regex.test(email) === false) {
        setError(true);
        setErrorMessageText('The email provided is wrong.');
        return false;
      }
      return true;
    };

    const usernameValidation = () => {
      if(!username || username.length > 255 || username.length < 3) {
        setError(true);
        setErrorMessageText('Username must be at least 3 characters and maximum 255 characters.');
        return false;
      }
      return true;
    }
    
    const passwordValidation = () => {
      if(!password || !confirmPassword || password.length < 8 || confirmPassword.length < 8) {
        setError(true);
        setErrorMessageText('Password must be at least 8 characters.');
        return false;
      }
      else if (password !== confirmPassword) {
        setError(true);
        setErrorMessageText('Passwords don\'t match.');
        return false;
      }
      return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (usernameValidation() && emailValidation() && passwordValidation()) {
          setSubmitted(true);
          setError(false);
          register();
        }
    };

    const successMessage = () => {
        return (
          <div
            className="success"
            style={{
              display: submitted ? '' : 'none',
            }}>
            <h1 className='successMsg'>User {username} successfully registered!!</h1>
          </div>
        );
    };

    const errorMessage = () => {
        return (
          <div
            className="error"
            style={{
              display: error ? '' : 'none',
            }}>
            <h1 className='errorMsg'>{errorMessageText}</h1>
          </div>
        );
    };

    function register() {
        fetch('http://127.0.0.1:8000/auth/signup/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            username: username,
            email: email,
            password: password,
            confirm_password: confirmPassword
        }),
        mode: 'cors',
      }).then(response => {console.log(response.data)})
    }

    return (
      <div className='center'>
      <h1>Registration</h1>

      {/* Calling to the methods */}
      <div className="messages">
          {errorMessage()}
          {successMessage()}
      </div>

      <form method='post'>
          {/* Labels and inputs for form data */}
          <div className='txtField'>
              <input onChange={handleUsername} value={username} type='text' required id ='username'/>
              <span></span>
              <label>Username</label>
          </div>
          <div className='txtField'>
              <input onChange={handleEmail} value={email} type='email' required id='email' />
              <span></span>
              <label>Email</label>
          </div>
          <div className='txtField'>
              <input onChange={handlePassword} value={password} type='password' required id='password' />
              <span></span>
              <label>Password</label>
          </div>
          <div className='txtField'>
              <input onChange={handleConfirmPassword} value={confirmPassword} type='password' required id='confirmPassword' />
              <span></span>
              <label>Confirm password</label>
          </div>
          <input type='submit' value='Register' id='submitBtn' onClick={handleSubmit} />
          <div className='loginLink'>
              Already signed up? <Link className='navLink' to="/login">Login</Link>
          </div>
      </form>

      </div>
    );
}