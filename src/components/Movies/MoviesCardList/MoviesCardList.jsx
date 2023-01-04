import MoviesCard from "../MoviesCard/MoviesCard";
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import api from '../../../utils/MainApi'

function MoviesCardList({ saveMovie, movies, button }) {

    const [moviesSaveList, setMoviesSaveList] = useState([]);
    
    let savedPage = false;
    const location = useLocation();

    if (location.pathname === '/saved-movies') {
        savedPage = true;
    }


    useEffect(() => {
        if (savedPage === true) {
            setMoviesSaveList(saveMovie)
        }
    }, [saveMovie, savedPage])

    const currentUser = useContext(CurrentUserContext);

// console.log('card list: ', movies)

    return (
        <section className='cardlist'>
            {!savedPage ? movies?.map((movie) => (
                    <MoviesCard  movie={movie}
                        key={movie.Id}
                        // save={api.getSavedMovies(saveMovie, movies)}
                        // onCardClick={onCardClick}
                        onCardLike={button}
                        // onCardDelete={onDeleteClick}
                         />
                ))
            :
            saveMovie?.map((movie) => (
                <MoviesCard  movie={movie}
                    key={movie.Id}
                    // save={api.getSavedMovies(saveMovie, movies)}
                    // onCardClick={onCardClick}
                    onCardLike={button}
                    // onCardDelete={onDeleteClick}
                     /> )) 
            }


        </section>
    )
}

export default MoviesCardList;