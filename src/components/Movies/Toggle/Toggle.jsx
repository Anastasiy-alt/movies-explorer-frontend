import React from "react";

function Toggle() {
    const [toggle, setToggle] = React.useState(false);

    const handleClick = (event) => {
        setToggle(event.target.checked)
    }

    return (
        <label className='toggle'>
            <input type='checkbox' onChange={handleClick} className='toggle__input' />
            <div className='toggle__switch' />
            <p className='toggle__text'>Короткометражки</p>
        </label>
    );
}

export default Toggle;