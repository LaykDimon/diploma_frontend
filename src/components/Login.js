import {useState} from 'react';
import '../style.css';
import { Link } from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
          setError(true);
        } else {
          setSubmitted(true);
          setError(false);
          login();
        }
    };

    const successMessage = () => {
        return (
          <div
            className="success"
            style={{
              display: submitted ? '' : 'none',
            }}>
            <h1>User {email} successfully logged in!!</h1>
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

    function login() {
        fetch('http://127.0.0.1:8000/auth/login/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            email: email,
            password: password,
        }),
        mode: 'cors',
      }).then(response => {
        console.log(response);
        return response.json();
    })
    .then(data => {
        console.log(data);
        localStorage.setItem("userSession", JSON.stringify(data));
    })
    }


    return (
        <div className='center'>
            <h1>Login</h1>

            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>

            <form method='post'>
                {/* Labels and inputs for form data */}
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
                <div className='pass'>Forgot password?</div>
                <input type='submit' value='Login' onClick={handleSubmit} />
                <div className='signupLink'>
                    Not a member? <Link className='navLink' to="/signup">Signup</Link>
                </div>
            </form>
            
        </div>
    );
}