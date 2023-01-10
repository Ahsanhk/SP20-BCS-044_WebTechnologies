import React, { useState } from 'react';
import '../login.css';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { actions } from '../ReduxStorage/redStore';
import { useDispatch } from 'react-redux';
const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sendRequest = async () => {
        const res = await axios
          .post("http://localhost:8000/user/login", {
            email: email,
            password: password,
          })
          .catch((err) => console.log(err));
        // const data = await res.data;    
        // console.log(data)
        // return data;
        };
    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest()
          .then((data) => console.log(data))
          .then(() => dispatch(actions.login))
          .then(() => navigate("/Home"));
    };
    

    return (  
        <div className='LogInContainer'>

            <div className='loginHeader'>
                <div className='loginPageHeading'>
                    <h1 id='logotext'>Car<p id='go'>GO</p></h1>
                </div>
                <div className='loginHeaderText'>
                    <Link to="/sign-up"><li>Sign Up</li></Link>
                </div>
            </div>

            <div className='LogInBox'>
                <div id='loginText'>
                    <h1>Sign In</h1>
                </div>
                <div className='loginBody'>
                    <div className='loginInput'>
                        <input 
                            type="email" 
                            placeholder='email or username' 
                            className='inputBox' 
                            name='email' 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='loginInput'>
                        <input 
                            type="password" 
                            placeholder='password' 
                            className='inputBox' 
                            name='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <Link to="/home">
                            <button id='loginButton' type='submit' onClick={handleSubmit}>Login</button>
                        </Link>
                    </div>
                    <div className='additionalText'>
                        <p >Not already registered?</p>
                        <a href="/sign-up">Create an Account...</a>
                    </div> 
                </div>                    
            </div>

            <div className='loginFooter'>
                <ol>
                    <li>Privacy Policy</li>
                    <li>Terms of use</li>
                    <li>About Us</li>
                </ol>

            </div>
        </div>
    );
}
 
export default LoginPage;