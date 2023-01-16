import { Fragment } from "react";
import Footer from "../../Footer/footer";
import Header from "../../Header/header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useState, useEffect } from 'react';
import Preloader from "../Preloader/Preloader";

function MoviesSaved({ loggedIn, button, movies, saveMovie, handleMovieDelete, isloading }) {

    const [keywordSave, setKeywordSave] = useState('');
    const [submittedSave, setSubmittedSave] = useState(keywordSave);
    const [filterSaveMovies, setFilterSaveMovies] = useState(saveMovie);
    const [moviesFilterSave, setMoviesFilterSave] = useState(false);
    const [searchLengthSave, setSearchLengthSave] = useState(false);
    const [submit, setSubmit] = useState(true)

    const filterMoviesSave = (mov) => {
        return mov.filter(movie => movie.nameRU.toLowerCase().includes(keywordSave.toLowerCase()))
    }
    
    const handleSearchSave = () => {
        const searcSaveMovies = filterMoviesSave(saveMovie)
        const searchMovSave = keywordSave ? searcSaveMovies : saveMovie
        if (searchMovSave.length === 0) {
            setSearchLengthSave(true)
            setFilterSaveMovies(saveMovie)
        } else {
            setSearchLengthSave(false)
            setSubmittedSave(true)
        }
        setFilterSaveMovies(searchMovSave)
    }

    const handleChangeInputValueSave = (value) => {
        setKeywordSave(value);
    }

    const onFilterSave = () => {
        setMoviesFilterSave((movFilter) => {
            localStorage.setItem('savedMovies', JSON.stringify(!movFilter));
            return !movFilter
        })
    }

    const onClick = () => {
        if (keywordSave === '') {
            setSubmit(true)
        } else {
            setSubmit(false)
        }
    }

    return (
        <Fragment>
            <Header
                loggedIn={loggedIn}
                movies='true' />
                <SearchForm
                    onSubmit={handleSearchSave}
                    moviesFilter={moviesFilterSave}
                    onFilter={onFilterSave}
                    keyword={keywordSave}
                    onSearchChange={handleChangeInputValueSave}
                    onClick={onClick} />
            {!isloading ? (submit ? (<MoviesCardList
                button={button}
                movies={[]}
                saveMovie={saveMovie}
                loggedIn={loggedIn}
                handleMovieDelete={handleMovieDelete}
                moviesFilter={moviesFilterSave} />) :

                ((!searchLengthSave ?
                    (<MoviesCardList
                        button={button}
                        movies={[]}
                        saveMovie={submittedSave ? filterSaveMovies : saveMovie}
                        loggedIn={loggedIn}
                        handleMovieDelete={handleMovieDelete}
                        moviesFilter={moviesFilterSave} />)
                       
                 : (
                    <>
                    <span>Ничего не найдено</span>
                    <MoviesCardList
                        button={button}
                        movies={[]}
                        saveMovie={saveMovie}
                        loggedIn={loggedIn}
                        handleMovieDelete={handleMovieDelete}
                        moviesFilter={moviesFilterSave} />
                    </>
                ))))
                 : (<Preloader />)}
            <Footer movies='true' />
        </Fragment>
    )
}

export default MoviesSaved;

