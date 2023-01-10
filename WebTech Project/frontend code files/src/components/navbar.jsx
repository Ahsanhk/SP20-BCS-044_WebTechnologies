import React, {useState} from 'react';
import "../navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../ReduxStorage/redStore';


const Navbar = () => {
    
    const dispath = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const [value, setValue] = useState();
    return ( 
        <div className='headerContainer'>
            <div className='logo'>
            <h1 id='logotext'>Car<p id='go'>GO</p></h1>
            </div>
            <div className='options'>
                    <Link to ='/home' >Home</Link>
                    <Link to="/LoginPage" >Sign-In</Link>
                    <Link to='/contactUs' >Contact-Us</Link>
                    <Link to='/' >Logout</Link>
            </div>
        </div> 
    );
}
 
export default Navbar; 