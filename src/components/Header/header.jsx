import logo from '../../images/logo.svg';
import person from '../../images/person.svg';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import Burger from '../Main/Burger/Burger';

function Header({ onSignOut, loggedIn, movies }) {
    return (
        <header className={`header ${movies && 'header_white'}`}>
            <Link className='button header__logo-btn' to='/'>
                <img src={logo} alt='Логотип.' className='header__logo' />
            </Link>
            

            {loggedIn ? (
                <Fragment>
                    <div className='header__block-links'>
                        <Link className="header__link link header__link_for_all-movies" onClick={onSignOut} to='/movies'>Фильмы</Link>
                        <Link className="header__link link header__link_for_add-movies" onClick={onSignOut} to='/saved-movies'>Сохранённые фильмы</Link>
                    </div>
                    <Link className='header__account button link' to='/profile'><img src={person} alt='Аккаунт.' className='header__img-acc' />Аккаунт</Link>
                    <Burger />
                </Fragment>
            ) : (

                <div className='header__auth'>
                    <Link className='header__signup link' to='/signup'>Регистрация</Link>
                    <Link className='header__signin link' to='/signin'>Войти</Link>
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
