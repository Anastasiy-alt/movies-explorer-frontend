import logo from '../../images/logo.svg';
// import { Link, Switch, Route } from 'react-router-dom';

function Header({ userEmail, onSignOut, loggedIn }) {
    return (
        <header className='header'>
            <img src={logo} alt='Логотип.' className='header__logo' />
            <div className='header__auth'>
                <button className='button header__signup'>Регистрация</button>
                <button className='button header__signin'>Войти</button>
            </div>
            {/* {loggedIn ? (
                <div className="header__auth">
                    <p className="header__email">{userEmail}</p>
                    <Link className="header__link button header__link_exit" onClick={onSignOut} to="/sign-up">Выйти</Link>
                </div>
            ) : (
                <Switch>
                    <Route exact path="/sign-in">
                        <Link to="/sign-up" className="header__link button">Регистрация</Link>
                    </Route>
                    <Route exact path="/sign-up">
                        <Link to="/sign-in" className="header__link button">Войти</Link>
                    </Route>
                </Switch>
            )} */}

        </header>
    )
};

export default Header;
