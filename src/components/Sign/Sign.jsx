import { Link } from 'react-router-dom';
import React from 'react';
import logo from '../../images/logo.svg';

function Sign({ welcome, buttonName, bottomText, linkText, link, handleSubmit, handleChange, userData, register, error, isValid }) {
    

    return (
        <div className='sign'>
            <Link className='button logo-btn sign__logo' to='/'>
                <img src={logo} alt='Логотип.' className='logo' />
            </Link>

            <h1 className='sign__title'>{welcome}</h1>

            <form className="sign__form" onSubmit={handleSubmit}>
                <div className='sign__input-block'>
                    {register &&
                        <>
                            <p className='sign__input-name'>Имя</p>
                            <input className="sign__input" id="name" name="name" type="text" value={userData.name || ''} onChange={handleChange} required />
                            <span className='sign__error'>{error.name ?? ''}</span>
                        </>}
                    <p className='sign__input-name'>E-mail</p>
                    <input className="sign__input" id="email" name="email" type="email" value={userData.email || ''} onChange={handleChange} required />
                    <span className='sign__error'>{error.email ?? ''}</span>
                    <p className='sign__input-name'>Пароль</p>
                    <input className="sign__input" id="password" name="password" type="password" value={userData.password || ''} onChange={handleChange} required />
                    <span className='sign__error'>{error.password ?? ''}</span>
                </div>
                <button type="submit" className="button sign__button" disabled={!isValid}>{buttonName}</button>
            </form>

            <div className="sign__bottom">
                <p className="sign__bottom-text">{bottomText}</p>
                <Link to={link} className="sign__bottom-link link">{linkText}</Link>
            </div>
        </div>
    )
}

export default Sign;