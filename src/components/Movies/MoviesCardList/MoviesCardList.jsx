import MoviesCard from "../MoviesCard/MoviesCard";
import More
    from "../More/More";
import { useLocation } from 'react-router-dom';
import useScreenWidth from '../../../hooks/useScreenWidth';
import { useState, useEffect, Fragment } from "react";

function MoviesCardList({ saveMovie, movies, button, handleMovieDelete, moviesFilter }) {

    const location = useLocation();
    const screenWidth = useScreenWidth();
    const [loadingMov, setLoadingMov] = useState(0);
    const [showMov, setShowMov] = useState(0);
    const [moviesListShow, setMoviesListShow] = useState([]);
    const [moviesSaveList, setMoviesSaveList] = useState([]);
    const [notMov, setNotMov] = useState(false)

    useEffect(() => {
        if (movies.length) {
            const result = movies.filter((item, index) => index < showMov)
            setMoviesListShow(result)
        }
    }, [movies, showMov])

    useEffect(() => {
        if (screenWidth <= 625) {
            setShowMov(5);
            setLoadingMov(2);
        } else if (screenWidth <= 768 && screenWidth > 625) {
            setShowMov(8);
            setLoadingMov(2);
        } else if (screenWidth > 768) {
            setShowMov(12);
            setLoadingMov(3);
        }
    }, [screenWidth]);

    const handleShowMoreMovies = () => {
        setMoviesListShow(movies.slice(0, moviesListShow.length + loadingMov))
    };

    useEffect(() => {
        if ((location.pathname === '/saved-movies') === true) {
            setMoviesSaveList(saveMovie)
        }
    }, [saveMovie, location.pathname])

    function getSavedMoviesFun(movieList, movie) {
        return movieList.find((mov) => {
            //return mov.owner === movie.owner;
            return mov.movieId === (movie.id || movie.movieId);
        });
    }

    const shortMovies = movies.filter(movie => movie.duration < 40)
    const shortSaveMovies = saveMovie.filter(movie => movie.duration < 40)
    const moviesShortcheck = moviesFilter ? shortMovies : moviesListShow
    const moviesShortcheckForSaved = moviesFilter ? shortSaveMovies : moviesSaveList

    useEffect(() => {
        console.log('filter', moviesFilter)
        if (moviesFilter === true) {
            if (location.pathname === '/movies') {
                if (moviesShortcheck.length === 0) {
                    setNotMov(true)
                } else {
                    setNotMov(false)
                } }
                if (location.pathname === '/saved-movies') {
                    if (moviesShortcheckForSaved.length === 0) {
                        console.log('not', notMov)
                        setNotMov(true)
                    } else {
                        console.log('not', notMov)
                        setNotMov(false)
                    }
                
            }
        } else {
            setNotMov(false)
        }
        console.log('not', notMov)
    }, [location.pathname, moviesFilter, moviesShortcheck.length, moviesShortcheckForSaved.length, notMov])

    return (
        <Fragment>
            {(notMov) ? (<span>Ничего не найдено</span>) : (
                <section className='cardlist'>
                    {(location.pathname === '/movies') ? moviesShortcheck.map((movie) => (
                        <MoviesCard movie={movie}
                            key={movie._id || movie.id}
                            save={getSavedMoviesFun(saveMovie, movie)}
                            onCardLike={button}
                            handleMovieDelete={handleMovieDelete}
                        />
                    ))
                        :
                        moviesShortcheckForSaved.map((movie) => (
                            <MoviesCard movie={movie}
                                key={movie._id || movie.id}
                                save={saveMovie}
                                onCardLike={button}
                                handleMovieDelete={handleMovieDelete}
                            />))}
                </section>
            )}
            {location.pathname === '/movies' && ((moviesShortcheck.length < (moviesFilter ? shortMovies.length : movies.length)) && (<More onClick={handleShowMoreMovies} />))}
        </Fragment>
    )
}

export default MoviesCardList;