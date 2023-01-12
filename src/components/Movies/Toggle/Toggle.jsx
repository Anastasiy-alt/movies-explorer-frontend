import React from "react";

function Toggle({ moviesFilter, onFilter }) {

    return (
        <label className='toggle'>
            <input type='checkbox'
                onChange={onFilter}
                checked={moviesFilter}
                className='toggle__input' />
            <div className='toggle__switch' />
            <p className='toggle__text'>Короткометражки</p>
        </label>
    );
}

export default Toggle;