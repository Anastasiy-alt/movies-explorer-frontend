import React from "react";
import { useLocation } from 'react-router-dom';

function Toggle({ moviesFilter, onFilter }) {
    const location = useLocation();

    return (
        <>
            {(location.pathname === '/movies') ?
                (<label className='toggle'>
                    <input type='checkbox'
                        onChange={onFilter}
                        checked={moviesFilter}
                        className='toggle__input' />
                    <div className='toggle__switch' />
                    <p className='toggle__text'>Короткометражки</p>
                </label>) :
                (<label className='toggle'>
                    <input type='checkbox'
                        onChange={onFilter}
                        checked={moviesFilter}
                        className='toggle__input' />
                    <div className='toggle__switch' />
                    <p className='toggle__text'>Короткометражки</p>
                </label>)}
        </>
    );
}

export default Toggle;