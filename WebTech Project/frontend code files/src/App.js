import './App.css';
import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './ReduxStorage/redStore';

import Header from './components/navbar';
import LoginPage from './components/LoginPage';
import ContactUs from './components/contactUs';
import Home from './components/Home';
import RegisterPage from './components/registerPage';


function App() {
  const dispath = useDispatch();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
        dispath(actions.login());
    }
  }, [dispath]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* {!isLoggedIn ? (
            <Route path='/sign-up' element = {<RegisterPage />} />
          ) : ( */}
          <>
            <Route  path='/' element = {<Header />} />
            <Route  path='/Home' element = {<Home />} />
            <Route  path='/loginpage' element = {<LoginPage />} />
            <Route  path='/contactus' element = {<ContactUs />} />
            <Route path='/sign-up' element = {<RegisterPage />} />
          </>
          {/* )} */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
