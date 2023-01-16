import { Fragment, useEffect, useContext, useState } from 'react';
import Header from '../Header/header';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function Profile({ onSignOut, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);
    
    const { values, handleChange, errors, resetForm, isValid } = useFormAndValidation();
    const updateProfile = (!(currentUser.email === values.email) || !(currentUser.name === values.name))

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateUser({
            name: values.name,
            email: values.email,
        });
    }

    useEffect(() => {
        if (currentUser) {
          resetForm(currentUser, {}, true);
        }
      }, [currentUser, resetForm]);

      return (
        <Fragment>
            <Header
                loggedIn='true'
                movies='true' />
            <div className="profile">
                <h1 className="profile__title">Привет, {currentUser.name}!</h1>
                <form className="profile__form"  onSubmit={handleSubmit}>
                    <label className='profile__label'>Имя
                        <input
                            onChange={handleChange}
                            value={values.name || ''}
                            type="text"
                            className="profile__item profile__item_name"
                            name="name"
                            minLength='2'
                            maxLength='30'
                            required />
                    </label>
                    <span className='profile__error'>{errors.name}</span>
                    <label className='profile__label'>E-mail
                        <input
                            onChange={handleChange}
                            value={values.email || ''}
                            type="email"
                            className="profile__item profile__item_email"
                            name="email"
                            pattern={'^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'}
                            required />
                    </label>
                    <span className='profile__error'>{errors.email}</span>
                    <div className="profile__links">
                    <button className='profile__edit button' type='submit' disabled={!updateProfile || !isValid}>Редактировать</button>
                    <button className='profile__logout link button' type='button' onClick={onSignOut}>Выйти из аккаунта</button>
                </div>
                </form>        
            </div>
        </Fragment>
    )
}

export default Profile;