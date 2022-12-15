import logo from '../../images/logo.svg';
import person from '../../images/person.svg';
import { Link, NavLink } from 'react-router-dom';
import { Fragment } from 'react';
import Burger from '../Main/Burger/Burger';

function Header({ loggedIn, movies }) {
    return (
        <header className={`header ${movies && 'section_white'}`}>
            <div className='header__layout'>
                <Link className='button logo-btn' to='/'>
                    <img src={logo} alt='Логотип.' className='logo' />
                </Link>


                {loggedIn ? (
                    <Fragment>
                        <div className='header__block-links'>
                            <NavLink className="header__link link header__link_for_all-movies" activeClassName="header__link link header__link_active" to='/movies' exact>Фильмы</NavLink>
                            <NavLink className="header__link link header__link_for_add-movies" activeClassName="header__link link header__link_active" to='/saved-movies' exact>Сохранённые фильмы</NavLink>
                        </div>
                        <Link className='account-button header__account link' to='/profile'><img src={person} alt='Аккаунт.' className='account-img' />Аккаунт</Link>
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
            </div>
        </header>
    )
};

export default Header;
