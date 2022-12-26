import React from 'react';
import Sign from '../Sign/Sign';
import { useFormAndValidation } from '../../hooks/useFormAndValidation'

function Login({ onLogin }) {

    const { values, handleChange, errors, isValid } = useFormAndValidation();

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(values)

    }


    return (
        <Sign
            handleSubmit={handleSubmit}
            userData={values}
            handleChange={handleChange}
            welcome='Рады видеть!'
            buttonName='Войти'
            bottomText='Ещё не зарегистрированы?'
            link='/signup'
            linkText='Регистрация' 
            error={errors}
            isValid={isValid} />

    )
}

export default Login