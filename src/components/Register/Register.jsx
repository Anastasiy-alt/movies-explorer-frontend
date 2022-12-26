import { useState } from "react";
import Sign from '../Sign/Sign';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function Register({ onRegister }) {

    // const [userData, setUserData] = useState({ email: '', password: '' });

    const { values, handleChange, errors, isValid } = useFormAndValidation();

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setUserData((evt) => ({
    //         ...evt,
    //         [name]: value,
    //     }));
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const { name, email, password } = userData;
    //     onRegister(name, email, password)
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(values)
    }

    return (
        <Sign
            register={true}
            handleSubmit={handleSubmit}
            userData={values}
            handleChange={handleChange}
            welcome='Добро пожаловать!'
            buttonName='Зарегистрироваться'
            bottomText='Уже зарегистрированы?'
            link='/signin'
            linkText='Войти'
            error={errors}
            isValid={isValid} />
    )
}

export default Register;