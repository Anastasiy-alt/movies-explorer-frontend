import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../../context/CurrentUserContext';


function MoviesCard({ movie, onCardLike, save }) 
{

    const currentUser = useContext(CurrentUserContext);
    const [saved, setSaved] = useState(false)
    const location = useLocation();

    

    const handleSaveClick = () => {
        onCardLike(movie)
        setSaved(true)
    };

    const handleRemoveSaveClick = () => {
        onCardLike(movie)
        setSaved(false)
    };

    function handleChangeMovieStatus() {
        if (((location.pathname === '/saved-movies') && save) || (!(location.pathname === '/saved-movies') && save)) {
            handleRemoveSaveClick()
        } else {
            handleSaveClick()
        }
    }


    const cardSaveButtonClassName = `button card__button ${saved && 'card__button_click'}`

    return (
        <article className='card'>
            <h3 className='card__title'>{movie.nameRU}</h3>
            <p className='card__time'>{movie.duration}</p>
            {location.pathname === '/saved-movies' ?
                <button className='button card__button card__button_delete' type="button"></button>
                : <button className={cardSaveButtonClassName} type="button" onClick={saved ? handleRemoveSaveClick : handleSaveClick}></button>
            }
            <img src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} className='card__img' />
        </article>
    )
}

export default MoviesCard;

// onClick={saved ? handleRemoveSaveClick : handleSaveClick}