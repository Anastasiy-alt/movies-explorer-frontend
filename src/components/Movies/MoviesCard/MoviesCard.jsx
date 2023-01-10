import { useState } from 'react';
import { useLocation } from 'react-router-dom';


function MoviesCard({ movie, onCardLike, handleMovieDelete, save }) {
    const location = useLocation();
console.dir(save)
    const handleSaveClick = () => {
        onCardLike(movie)
    };

    const handleRemoveSaveClick = () => {
        handleMovieDelete(movie)
    };

    function handleChangeMovieStatus() {
        if (((location.pathname === '/movies') && save) || (!(location.pathname === '/movies') && save)) {
            handleRemoveSaveClick()
        } else {
            handleSaveClick()
        }
    }

    function timeConvert(duration) {
        let hours = Math.floor(duration / 60);
        let minutes = duration % 60;
        return(`${hours}ч ${minutes}м`)
    }

    const cardSaveButtonClassName = `button card__button ${save && 'card__button_click'}`

    return (
        <article className='card'>
            <h3 className='card__title'>{movie.nameRU}</h3>
            <p className='card__time'>{timeConvert(movie.duration)}</p>
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