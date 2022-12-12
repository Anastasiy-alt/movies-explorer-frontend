import React from 'react';
import Sign from '../Sign/Sign';

function Register({ onRegister }) {

    const [userData, setUserData] = React.useState({ email: '', password: '' });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((evt) => ({
            ...evt,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = userData;
        onRegister(email, password)
    }

    return (
        <Sign
            register={true}
            handleSubmit={handleSubmit}
            userData={userData}
            handleChange={handleChange}
            welcome='Добро пожаловать!'
            buttonName='Зарегистрироваться'
            bottomText='Уже зарегистрированы?'
            link='/signin'
            linkText='Войти' />
    )
}

export default Register;