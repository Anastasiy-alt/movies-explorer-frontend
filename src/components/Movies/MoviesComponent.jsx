import { Fragment } from "react";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import { useState, useEffect } from 'react';

function Movies({ loggedIn, button, movies, saveMovie, handleMovieDelete }) {


    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const handleSearch = e => {
        e.preventDefault();
      setSearchTerm(e.target.value);
    };
    useEffect(() => {
      const results = movies.filter(mov =>
        mov.includes(searchTerm)
      );
      setSearchResults(results);
    }, [searchTerm]);
      
    
    return(
    <Fragment>
        <Header
            loggedIn={loggedIn}
            movies='true' />
        <SearchForm
        search={handleSearch}
        value={searchTerm} />
        <MoviesCardList
        searchResults={searchResults}
        button={button}
        movies={movies}
        saveMovie={saveMovie}
        loggedIn={loggedIn}
        handleMovieDelete={handleMovieDelete} />
        <Footer movies='true' />
    </Fragment>
    )
}

export default Movies;