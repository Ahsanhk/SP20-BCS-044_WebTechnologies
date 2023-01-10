import React, {useState} from 'react';
import '../login.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { actions } from "../ReduxStorage/redStore";
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
    
    const navigate = useNavigate();
    const dispath = useDispatch();
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [isSignup, setIsSignup] = useState(false);
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    
    const sendRequest = async (type = "login") => {
            const res = await axios
            .post(`http://localhost:8000/api/user/signup`, {
                username: inputs.username,
                email: inputs.email,
                password: inputs.password,
            })
            .catch((err) => console.log(err));
        const data = await res.data;
        console.log(data);
        return data;
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        if (isSignup) {
            sendRequest("signup")
            .then((data) => localStorage.setItem("userId", data.user._id))
            .then(() => dispath(actions.login()))
            .then(() => navigate("/home"));
        } 
        else {
            sendRequest()
            .then((data) => localStorage.setItem("userId", data.user._id))
            .then(() => dispath(actions.login()))
            .then(() => navigate("/home"));
        }

    return ( 
        <form onSubmit={handleSubmit}>  
            <div className='LogInContainer'>
                <div className='loginHeader'>
                    <div className='loginPageHeading'>
                        <h1 id='logotext'>Car<p id='go'>GO</p></h1>
                    </div>
                    <div className='loginHeaderText'>
                        <Link to="/loginPage"><li>Sign In</li></Link>
                    </div>
                </div>

                <div className='LogInBox'>
                    <div id='loginText'>
                        <h1>Sign Up</h1>
                    </div>
                    <div className='loginBody'>
                            <div className='loginInput'>
                                <input 
                                    type="text" 
                                    placeholder='Enter Username' 
                                    className='inputBox' 
                                    name='username' 
                                    onChange={handleChange}
                                    value= {inputs.username}    
                                />
                            </div>
                            <div className='loginInput'>
                                <input 
                                    type="email" 
                                    placeholder='Enter email address' 
                                    className='inputBox' 
                                    name='email'
                                    onChange={handleChange}
                                    value= {inputs.username}
                                />
                            </div>
                        
                            <div className='loginInput'>
                                <input 
                                    type="password" 
                                    placeholder='Enter password' 
                                    className='inputBox' 
                                    name='password'
                                    onChange={handleChange}
                                    value= {inputs.username}
                                />
                            </div>
                            <div>
                                <Link to="/loginPage">
                                    <button 
                                        id='loginButton' 
                                        type='submit' 
                                        onClick={() => setIsSignup(!isSignup)}>
                                            Register
                                    </button>
                                </Link>
                            </div>
                            <div className='additionalText'>
                                <a href="/loginPage">Sign-in instead...</a>
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
        </form>
    );
}
}
 
export default RegisterPage;