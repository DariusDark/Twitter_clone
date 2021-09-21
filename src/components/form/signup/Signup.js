import React, { useState } from 'react'
import { createUser } from '../../../services/formServices.js';
import { useDispatch } from 'react-redux';


function Signup({ formTypeChange }) {
    const dispatch = useDispatch();
    const [nameValue, setNameValue] = useState('');
    const [passValue, setPassValue] = useState('');

    const handleClick = async (event) => {
        event.preventDefault();
        if (nameValue.trim() && passValue.trim()) {
            let result = await createUser({
                name: nameValue.trim(),
                password: passValue.trim()
            });
            if (result.userName !== true) {
                dispatch({ type: "ADD_USER", payload: result });
            } else {
                console.log('Такой юзер существует');
            }
        }
    }

    return (
        <div className="form__container">
            <h2 className="form__title">Sign Up Form</h2>
            <div className="form__column">
                <div className="form__input-container">
                    <input
                        className="form__user-name-input"
                        onInput={(event) => { setNameValue(event.target.value); }}
                        value={nameValue}
                        type="text"
                        placeholder="Enter your name to Sign up" />
                </div>
                <div className="form__input-container">
                    <input
                        className="form__user-password-input"
                        onInput={(event) => {
                            setPassValue(event.target.value);
                        }}
                        value={passValue}
                        type="password"
                        placeholder="Enter new password"
                    />
                </div>
                <div className="form__button">
                    <button
                        className="form__button-submit"
                        type="submit"
                        onClick={handleClick}>
                        Sign Up
                    </button>
                </div>
            </div>
            <span className="form__text">
                Allready have account?&nbsp;
                
                <button
                    className="form__anchor"
                    onClick={(event) => {
                        event.preventDefault()
                        formTypeChange('signin')
                    }}>
                    Click Here
                </button>

                &nbsp;to log in
            </span>
        </div>
    )
}

export default Signup
