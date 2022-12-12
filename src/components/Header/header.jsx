import logo from '../../images/logo.svg';
import person from '../../images/person.svg';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import Burger from '../Main/Burger/Burger';

function Header({ userEmail, onSignOut, loggedIn }) {
    return (
        <header className='header'>
            <img src={logo} alt='Логотип.' className='header__logo' />

            {loggedIn ? (
                <Fragment>
                    <div className='header__block-links'>
                        <Link className="header__link link header__link_for_all-movies" onClick={onSignOut} to="/sign-up">Фильмы</Link>
                        <Link className="header__link link header__link_for_add-movies" onClick={onSignOut} to="/sign-up">Сохранённые фильмы</Link>
                    </div>
                    <button className='header__account button'><img src={person} alt='Аккаунт.' className='header__img-acc' />Аккаунт</button>
                    <Burger />
                </Fragment>
            ) : (

                <div className='header__auth'>
                    <button className='button header__signup'>Регистрация</button>
                    <button className='button header__signin'>Войти</button>
                </div>
                // <Routes>
                //     <Route exact path="/sign-in">
                //         <Link to="/sign-up" className="header__link button">Регистрация</Link>
                //     </Route>
                //     <Route exact path="/sign-up">
                //         <Link to="/sign-in" className="header__link button">Войти</Link>
                //     </Route>
                // </Routes>
            )}

        </header>
    )
};

export default Header;
