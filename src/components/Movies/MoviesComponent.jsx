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
    const [keywordAll, setKeywordAll] = useState(localStorage.getItem('allSearchValue') ? localStorage.getItem('allSearchValue') : '');
    const [submittedAll, setSubmittedAll] = useState(localStorage.getItem('allIsSubmitted') === "true" ? true : keywordAll);

    const [keywordSave, setKeywordSave] = useState(localStorage.getItem('saveSearchValue') ? localStorage.getItem('saveSearchValue') : '');
    const [submittedSave, setSubmittedSave] = useState(localStorage.getItem('saveIsSubmitted') === "true" ? true : keywordSave);

    const [filterAllMovies, setFilterAllMovies] = useState(movies);
    const [filterSaveMovies, setFilterSaveMovies] = useState(saveMovie);
    const [moviesFilter, setMoviesFilter] = useState(false);
    const [searchLength, setSearchLength] = useState(false);
    const [searchLengthSave, setSearchLengthSave] = useState(false);
    const [submit, setSubmit] = useState(false)


    const filterMoviesAll = (mov) => {
        return mov.filter(movie => movie.nameRU.toLowerCase().includes(keywordAll.toLowerCase()))
    }

    const filterMoviesSave = (mov) => {
        return mov.filter(movie => movie.nameRU.toLowerCase().includes(keywordSave.toLowerCase()))
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

        localStorage.setItem('saveIsSubmitted', true)
    }

    const handleChangeInputValueAll = (value) => {
        localStorage.setItem('allSearchValue', value);
        setKeywordAll(value);
    }

    const handleChangeInputValueSave = (value) => {
        localStorage.setItem('saveSearchValue', value);
        setKeywordSave(value);
    }

    useEffect(() => {
        const filterValue = localStorage.getItem('savedMovies') === 'true' ? true : false
        const searchValue = localStorage.getItem('allSearchValue')
        const searchValueSave = localStorage.getItem('saveSearchValue')
        setMoviesFilter(filterValue)

        setKeywordAll(searchValue)
        setKeywordSave(searchValueSave)
        setFilterSaveMovies(filterMoviesSave(saveMovie))
        setFilterAllMovies(filterMoviesAll(movies))
    }, [])

    const onFilter = () => {
        setMoviesFilter((movFilter) => {
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
        console.log(submit)
    }

    return (
        <Fragment>
            <Header
                loggedIn={loggedIn}
                movies='true' />
            {(location.pathname === '/movies') ?
                <SearchForm
                    onSubmit={handleSearch}
                    moviesFilter={moviesFilter}
                    onFilter={onFilter}
                    keyword={keywordAll}
                    onSearchChange={handleChangeInputValueAll}
                    onClick={onClick} />
                :
                <SearchForm
                    onSubmit={handleSearchSave}
                    moviesFilter={moviesFilter}
                    onFilter={onFilter}
                    keyword={keywordSave}
                    onSearchChange={handleChangeInputValueSave}
                    onClick={onClick} />}
            {!isloading ? ((location.pathname === '/movies') ?
                (((!searchLength) ? (
                    <MoviesCardList
                        button={button}
                        movies={submittedAll ? filterAllMovies : []}
                        saveMovie={submittedSave ? filterSaveMovies : saveMovie}
                        loggedIn={loggedIn}
                        handleMovieDelete={handleMovieDelete}
                        moviesFilter={moviesFilter} />
                ) : (
                    <span>Ничего не найдено</span>
                ))) : (submit ? (<MoviesCardList
                button={button}
                movies={submittedAll ? filterAllMovies : []}
                saveMovie={saveMovie}
                loggedIn={loggedIn}
                handleMovieDelete={handleMovieDelete}
                moviesFilter={moviesFilter} />) :

                ((!searchLengthSave ?
                    (<MoviesCardList
                        button={button}
                        movies={submittedAll ? filterAllMovies : []}
                        saveMovie={submittedSave ? filterSaveMovies : saveMovie}
                        loggedIn={loggedIn}
                        handleMovieDelete={handleMovieDelete}
                        moviesFilter={moviesFilter} />)
                       
                 : (
                    <>
                    <span>Ничего не найдено</span>
                    <MoviesCardList
                        button={button}
                        movies={submittedAll ? filterAllMovies : []}
                        saveMovie={saveMovie}
                        loggedIn={loggedIn}
                        handleMovieDelete={handleMovieDelete}
                        moviesFilter={moviesFilter} />
                    </>
                ))))
                // (
                //     ((searchLengthSave) ? (
                //         <>
                //             <MoviesCardList
                //                 button={button}
                //                 movies={[]}
                //                 saveMovie={saveMovie}
                //                 loggedIn={loggedIn}
                //                 handleMovieDelete={handleMovieDelete}
                //                 moviesFilter={moviesFilter} />
                //         </>
                //     ) : (
                //         <MoviesCardList
                //             button={button}
                //             movies={submittedAll ? filterAllMovies : []}
                //             // saveMovie={submittedSave ? filterSaveMovies : saveMovie}
                //             saveMovie={submittedSave && ((keywordSave === '') ? saveMovie : (filterSaveMovies))}
                //             loggedIn={loggedIn}
                //             handleMovieDelete={handleMovieDelete}
                //             moviesFilter={moviesFilter} />
                //     ))
                // )
                ) : (<Preloader />)}
            <Footer movies='true' />
        </Fragment>
    )
}

export default Movies;

