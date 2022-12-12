import React from 'react';
import Sign from '../Sign/Sign';

function Login({ onLogin }) {

    const [userData, setUserData] = React.useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((evt) => ({
            ...evt,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = userData
        onLogin(name, email, password)

    }


    return (
        <Sign
            handleSubmit={handleSubmit}
            userData={userData}
            handleChange={handleChange}
            welcome='Рады видеть!'
            buttonName='Войти'
            bottomText='Ещё не зарегистрированы?'
            link='/signup'
            linkText='Регистрация' 
            />

    )
}

export default Login