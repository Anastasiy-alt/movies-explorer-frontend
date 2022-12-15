import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({ title, time, poster }) {
    // const currentUser = useContext(CurrentUserContext);
    const [saved, setSaved] = useState(false)
    const location = useLocation();

    const handleSaveClick = () => {
        setSaved(!saved);
    };

    const handleRemoveSaveClick = () => {
        setSaved(false);
    };

    const cardSaveButtonClassName = `button card__button ${saved && 'card__button_click'}`

    return (
        <article className='card'>
            <h3 className='card__title'>{title}</h3>
            <p className='card__time'>{time}</p>
            {location.pathname === '/saved-movies' ?
                <button className='button card__button card__button_delete' type="button"></button>
                : <button className={cardSaveButtonClassName} type="button" onClick={saved ? handleRemoveSaveClick : handleSaveClick}></button>
            }
            <img src={poster} alt={title} className='card__img' />
        </article>
    )
}

export default MoviesCard;