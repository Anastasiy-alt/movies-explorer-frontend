import { Fragment } from "react";
import Footer from "../../Footer/footer";
import Header from "../../Header/header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useState, useEffect } from 'react';
import Preloader from "../Preloader/Preloader";

function MoviesAll({ loggedIn, button, movies, saveMovie, handleMovieDelete, isloading }) {

    const [keywordAll, setKeywordAll] = useState(localStorage.getItem('allSearchValue') ? localStorage.getItem('allSearchValue') : '');
    const [filterAllMovies, setFilterAllMovies] = useState(movies);
    const [moviesFilterAll, setMoviesFilterAll] = useState(false);
    const [searchLength, setSearchLength] = useState(false);
    const shortMovies = movies.filter(movie => movie.duration < 40)

    const filterMoviesAll = (mov) => {
        return mov.filter(movie => movie.nameRU.toLowerCase().includes(keywordAll.toLowerCase()))
    }

    const handleSearch = () => {
        const searchMovies = filterMoviesAll(movies)
        localStorage.setItem('movies', JSON.stringify(searchMovies))
        const searchMovAll = keywordAll ? searchMovies : movies
        if (searchMovAll.length === 0) {
            setSearchLength(true)
        } else {
            setSearchLength(false)
        }
        setFilterAllMovies(searchMovAll)
    }

    const handleChangeInputValueAll = (value) => {
        localStorage.setItem('allSearchValue', value);
        setKeywordAll(value);
    }

    useEffect(() => {
        const filterValue = localStorage.getItem('filter') === 'true' ? true : false
        const searchValue = localStorage.getItem('allSearchValue')
        setMoviesFilterAll(filterValue)
        setKeywordAll(searchValue)
        setFilterAllMovies(filterMoviesAll(movies))
    }, [])

    const onFilterAll = () => {
        setMoviesFilterAll((movFilter) => {
            localStorage.setItem('filter', JSON.stringify(!movFilter));
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
                moviesFilter={moviesFilterAll}
                onFilter={onFilterAll}
                keyword={keywordAll}
                onSearchChange={handleChangeInputValueAll}
            // onClick={onClick}
            />
            {JSON.parse(localStorage.getItem('movies')) === null ? <span>Начните поиск фильмов</span> :
                (!isloading ?
                    ((!searchLength) ? (
                        <MoviesCardList
                            button={button}
                            movies={filterAllMovies.length === 0 ? JSON.parse(localStorage.getItem('movies')) : filterAllMovies}
                            saveMovie={saveMovie}
                            handleMovieDelete={handleMovieDelete}
                            moviesFilter={moviesFilterAll}
                            shortMovies={shortMovies}
                            shortSaveMovies={[]} />
                    ) : (
                        <>
                            <span>Ничего не найдено</span>
                            <MoviesCardList
                                button={button}
                                movies={[]}
                                saveMovie={[]}
                                handleMovieDelete={handleMovieDelete}
                                moviesFilter={moviesFilterAll}
                                shortMovies={shortMovies}
                                shortSaveMovies={[]} />
                        </>
                    )) : (<Preloader />))
            }
            <Footer movies='true' />
        </Fragment>
    )
}

export default MoviesAll;

