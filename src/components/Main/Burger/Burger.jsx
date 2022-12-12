import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import burger from '../../../images/burger.svg';
import close from '../../../images/Close.svg';
import person from '../../../images/person.svg';

function Burger() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleToggle = () => {
        setMenuOpen(!menuOpen)
    }
    const closeMenu = () => {
        setMenuOpen(false)
    }

    return (
        <burger className='burger'>
            <button onClick={handleToggle} className='button burger__button_open'>
                <img src={burger} alt='burger' className='burger__open' />
            </button>
            <div className={`burger__menu ${menuOpen ? 'burger__show' : ''}`}>
                <div className='burger__header-menu'>
                    <button onClick={closeMenu} className='button burger__button_close'>
                        <img src={close} alt='close' className='burger__close burger__button' />
                    </button>
                </div>
                <div className="burger__list">
                <NavLink
                    to='/'
                    activeClassName='burger__link_active link'
                    className='burger__link_disactive link'
                    onClick={() => closeMenu()}
                    exact>
                    Главная
                </NavLink>
                <NavLink
                    to='/'
                    activeClassName='burger__link_active link'
                    className='burger__link_disactive link'
                    onClick={() => closeMenu()}
                    exact>
                    Фильмы
                </NavLink>
                <NavLink
                    to='/'
                    activeClassName='burger__link_active link'
                    className='burger__link_disactive link'
                    onClick={() => closeMenu()}
                    exact>
                    Сохранённые&nbsp;фильмы
                </NavLink>
                </div>
                <button className='header__account button burger__account'><img src={person} alt='Аккаунт.' className='header__img-acc' />Аккаунт</button>
            </div>
        </burger>
    )
};

export default Burger;