import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Profile({ onSignOut }) {

    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);

    function handleNameChange(name) {
        setName(name.target.value);
    }

    function handleEmailChange(email) {
        setEmail(email.target.value);
    }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     onAddCard({
    //         name: name,
    //         email: email,
    //     });
    // }

    return (
        <div className="profile">
            <h1 className="profile__title">Привет, {name}!</h1>
            <form className="profile__form">
                <label className='profile__label'>Имя
                    <input
                        onChange={handleNameChange}
                        value={name || ''}
                        type="text"
                        className="profile__item profile__item_name"
                        name="name"
                        required />
                </label>
                <label className='profile__label'>E-mail
                    <input
                        onChange={handleEmailChange}
                        value={email || ''}
                        type="url"
                        className="profile__item profile__item_email"
                        name="email"
                        required />
                </label>
            </form>
            <div className="profile__links">
                <button className='profile__edit button' type='submit'>Редактировать</button>
                <Link className='profile__logout link' onClick={onSignOut} to="/signup">Выйти из аккаунта</Link>
            </div>
        </div>
    )
}

export default Profile;