import { Fragment } from "react";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import More from "./More/More";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";

function Movies({ loggedIn, button, movies, saveMovie }) {
    return(
    <Fragment>
        <Header
            loggedIn={loggedIn}
            movies='true' />
        <SearchForm />
        <MoviesCardList
        button={button}
        movies={movies}
        saveMovie={saveMovie}
        loggedIn={loggedIn} />
        <More />
        <Footer movies='true' />
    </Fragment>
    )
}

export default Movies;