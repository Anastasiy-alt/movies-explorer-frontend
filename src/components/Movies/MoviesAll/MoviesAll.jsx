import { Fragment } from "react";
import Footer from "../../Footer/footer";
import Header from "../../Header/header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Preloader from "../Preloader/Preloader";

function MoviesAll({ loggedIn, button, movies, saveMovie, handleMovieDelete, isloading }) {

    const [keywordAll, setKeywordAll] = useState(localStorage.getItem('allSearchValue') ? localStorage.getItem('allSearchValue') : '');
    const [submittedAll, setSubmittedAll] = useState(localStorage.getItem('allIsSubmitted') === "true" ? true : keywordAll);

    const [filterAllMovies, setFilterAllMovies] = useState(movies);

    const [moviesFilterAll, setMoviesFilterAll] = useState(false);
    
    const [searchLength, setSearchLength] = useState(false);
    const [submit, setSubmit] = useState(true)


    const filterMoviesAll = (mov) => {
        return mov.filter(movie => movie.nameRU.toLowerCase().includes(keywordAll.toLowerCase()))
    }

    const handleSearch = () => {
        const searchMovies = filterMoviesAll(movies)
        const searchMovAll = keywordAll ? searchMovies : movies
        if (searchMovAll.length === 0) {
            setSearchLength(true)
        } else {
            setSearchLength(false)
        }
        setFilterAllMovies(searchMovAll)
        setSubmittedAll(true)
        localStorage.setItem('allIsSubmitted', true)
    }

    const handleChangeInputValueAll = (value) => {
        localStorage.setItem('allSearchValue', value);
        setKeywordAll(value);
    }

    useEffect(() => {
        const filterValue = localStorage.getItem('savedMovies') === 'true' ? true : false
        const searchValue = localStorage.getItem('allSearchValue')
        setMoviesFilterAll(filterValue)
        setKeywordAll(searchValue)
        setFilterAllMovies(filterMoviesAll(movies))
    }, [])

    const onFilterAll = () => {
        setMoviesFilterAll((movFilter) => {
            localStorage.setItem('savedMovies', JSON.stringify(!movFilter));
            return !movFilter
        })
    }

    const onClick = () => {
        if (keywordAll === '') {
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
                    onSubmit={handleSearch}
                    moviesFilter={moviesFilterAll}
                    onFilter={onFilterAll}
                    keyword={keywordAll}
                    onSearchChange={handleChangeInputValueAll}
                    onClick={onClick} />
            {!isloading ? 
               ((!searchLength) ? (
                <MoviesCardList
                    button={button}
                    movies={submittedAll ? filterAllMovies : []}
                    saveMovie={saveMovie}
                    loggedIn={loggedIn}
                    handleMovieDelete={handleMovieDelete}
                    moviesFilter={moviesFilterAll} />
            ) : (
                <span>Ничего не найдено</span>
            )) : (<Preloader />)}
            <Footer movies='true' />
        </Fragment>
    )
}

export default MoviesAll;

