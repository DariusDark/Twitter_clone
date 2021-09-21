import React, { useState } from 'react';
import { userIn } from '../../../services/formServices.js';
import { useDispatch } from 'react-redux';


function Signin({ formTypeChange }) {
    const dispatch = useDispatch();
    const [nameValue, setNameValue] = useState('');
    const [passValue, setPassValue] = useState('');

    const handleClick = async (event) => {
        event.preventDefault();
        if (nameValue.trim() && passValue.trim()) {
            let result = await userIn(`name=${nameValue}&password=${passValue}`)
            if (!result.userName) {
                console.log('Такой юзер не существует');
                return;
            } else {
                dispatch({ type: "ADD_USER", payload: result });
            }
        }
    }

    return (
        <div className="form__container">
            <h2 className="form__title">Sign In Form</h2>
            <div className="form__column">
                <div className="form__input-container">
                    <input
                        className="form__user-name-input"
                        onInput={(event) => { setNameValue(event.target.value); }}
                        value={nameValue}
                        type="text"
                        placeholder="Enter your name to Sign up"
                    />
                </div>
                <div className="form__input-container">
                    <input className="form__user-password-input" onInput={(event) => {
                        setPassValue(event.target.value);
                    }} value={passValue} type="password" placeholder="Enter new password" />
                </div>
                <div className="form__button">
                    <button className="form__button-submit" type="submit" onClick={handleClick}>Sign In</button>
                </div>
            </div>
            <span className="form__text">U don't have account yet?&nbsp;
                <button className="form__anchor"
                    onClick={(event) => {
                        event.preventDefault();
                        formTypeChange('signup')
                    }}>Click Here
                </button>
            &nbsp;to create one</span>
        </div>
    )
}

export default Signin
