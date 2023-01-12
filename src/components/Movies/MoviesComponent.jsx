import { Fragment } from "react";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Preloader from "./Preloader/Preloader";

function Movies({ loggedIn, button, movies, saveMovie, handleMovieDelete, isloading }) {

    const location = useLocation();
    const [keyword, setKeyword] = useState(localStorage.getItem('allSearchValue') ? localStorage.getItem('allSearchValue') : '');
    const [filterAllMovies, setFilterAllMovies] = useState(movies);
    const [filterSaveMovies, setFilterSaveMovies] = useState(saveMovie);
    const [submitted, setSubmitted] = useState(localStorage.getItem('allIsSubmitted') === "true" ? true : keyword);
    const [moviesFilter, setMoviesFilter] = useState(false);
    const [searchLength, setSearchLength] = useState(false);
    const [searchLengthSave, setSearchLengthSave] = useState(false);


    const filterMovies = (mov) => {
        return mov.filter(movie => movie.nameRU.toLowerCase().includes(keyword.toLowerCase()))
    }

    const handleSearch = () => {
        const searchMovies = filterMovies(movies)
        const searcSaveMovies = filterMovies(saveMovie)
        const searchMovAll = keyword ? searchMovies : movies
        const searchMovSave = keyword ? searcSaveMovies : saveMovie
        if (searchMovAll.length === 0) {
            setSearchLength(true)
        } else {
            setSearchLength(false)
        }
        if (searchMovSave.length === 0) {
            setSearchLengthSave(true)
            setFilterSaveMovies(saveMovie)
        } else {
            setSearchLengthSave(false)
        }
        setFilterAllMovies(searchMovAll)
        setFilterSaveMovies(searchMovSave)
        setSubmitted(true)
        localStorage.setItem('allIsSubmitted', true)
    }

    const handleChangeInputValue = (value) => {
        localStorage.setItem('allSearchValue', value);
        setKeyword(value);
    }

    useEffect(() => {
        const filterValue = localStorage.getItem('savedMovies') === 'true' ? true : false
        const searchValue = localStorage.getItem('allSearchValue')
        setMoviesFilter(filterValue)
        setKeyword(searchValue)
        setFilterSaveMovies(filterMovies(saveMovie))
        setFilterAllMovies(filterMovies(movies))
    }, [])

    const onFilter = () => {
        setMoviesFilter((movFilter) => {
            localStorage.setItem('savedMovies', JSON.stringify(!movFilter));
            return !movFilter
        })
    }

    return (
        <Fragment>
            <Header
                loggedIn={loggedIn}
                movies='true' />
            <SearchForm
                onSubmit={handleSearch}
                moviesFilter={moviesFilter}
                onFilter={onFilter}
                keyword={keyword}
                onSeachChange={handleChangeInputValue} />
            {!isloading ? ((location.pathname === '/movies') ?
                ((!searchLength ? (
                    <MoviesCardList
                        button={button}
                        movies={submitted ? filterAllMovies : []}
                        saveMovie={submitted ? filterSaveMovies : saveMovie}
                        loggedIn={loggedIn}
                        handleMovieDelete={handleMovieDelete}
                        moviesFilter={moviesFilter} />
                ) : (
                    <span>Ничего не найдено</span>
                ))) : (
                    ((searchLengthSave || keyword === '') ? (
                        <>
                            {!(keyword === '') && (<span>Ничего не найдено</span>)}
                            <MoviesCardList
                                button={button}
                                movies={submitted ? filterAllMovies : []}
                                saveMovie={saveMovie}
                                loggedIn={loggedIn}
                                handleMovieDelete={handleMovieDelete}
                                moviesFilter={moviesFilter} />
                        </>
                    ) : (
                        <MoviesCardList
                            button={button}
                            movies={submitted ? filterAllMovies : []}
                            saveMovie={submitted ? filterSaveMovies : saveMovie}
                            loggedIn={loggedIn}
                            handleMovieDelete={handleMovieDelete}
                            moviesFilter={moviesFilter} />
                    ))
                )) : (<Preloader />)}
            <Footer movies='true' />
        </Fragment>
    )
}

export default Movies;

