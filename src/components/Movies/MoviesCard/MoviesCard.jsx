import { useState } from 'react';
import { useLocation } from 'react-router-dom';


function MoviesCard({ movie, onCardLike, handleMovieDelete, save }) {

    const [saved, setSaved] = useState(false)
    const location = useLocation();

    const handleSaveClick = () => {
        onCardLike(movie)
        setSaved(true)
    };

    const handleRemoveSaveClick = () => {
        handleMovieDelete(movie)
        setSaved(false)
    };

    function handleChangeMovieStatus() {
        if (((location.pathname === '/saved-movies') && save) || (!(location.pathname === '/saved-movies') && save)) {
            handleRemoveSaveClick()
        } else {
            handleSaveClick()
        }
    }


    const cardSaveButtonClassName = `button card__button ${save && 'card__button_click'} ${saved && 'card__button_click'}`

    return (
        <article className='card'>
            <h3 className='card__title'>{movie.nameRU}</h3>
            <p className='card__time'>{movie.duration}</p>
            {location.pathname === '/saved-movies' ?
                <>
                    <button className='button card__button card__button_delete' type="button" onClick={handleRemoveSaveClick}></button>
                    <img src={`${movie.image}`} alt={movie.nameRU} className='card__img' />
                </>
                :
                <>
                    <button className={cardSaveButtonClassName} type="button" onClick={handleChangeMovieStatus}></button>
                    <img src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} className='card__img' />
                </>
            }
        </article>
    )
}

export default MoviesCard;

// src={`https://api.nomoreparties.co${movie.image.url}`}

// onClick={saved ? handleRemoveSaveClick : handleSaveClick}