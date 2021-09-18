import React, { useState } from 'react';
import Signin from './Signin/Signin.js';
import Signup from './Signup/Signup.js';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Form.css';

function Form() {

    const [formType, setFormType] = useState('signin');
    const redirect = useSelector(state => state.loggedIn);


    return (
        <form className="form">
            {formType === 'signin' ? <Signin formTypeChange={setFormType} /> : <Signup formTypeChange={setFormType} />}
            { redirect ? <Redirect to="/home" /> : null}
        </form>
    )
}

export default Form
