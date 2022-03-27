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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === '' || email === '' || password === '' || confirmPassword === '' || password !== confirmPassword) {
          setError(true);
        } else {
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
            <h1>User {username} successfully registered!!</h1>
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
            <h1>Please enter all the fields or check the passwords</h1>
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
              <input onChange={handleUsername} value={username} type='text' required />
              <span></span>
              <label>Username</label>
          </div>
          <div className='txtField'>
              <input onChange={handleEmail} value={email} type='email' required />
              <span></span>
              <label>Email</label>
          </div>
          <div className='txtField'>
              <input onChange={handlePassword} value={password} type='password' required />
              <span></span>
              <label>Password</label>
          </div>
          <div className='txtField'>
              <input onChange={handleConfirmPassword} value={confirmPassword} type='password' required />
              <span></span>
              <label>Confirm password</label>
          </div>
          <input type='submit' value='Register' onClick={handleSubmit} />
          <div className='loginLink'>
              Already signed up? <Link className='navLink' to="/login">Login</Link>
          </div>
      </form>

      </div>
    );
}