import { Fragment } from "react";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import More from "./More/More";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";

function Movies({ loggedIn }) {
    return(
    <Fragment>
        <Header
            loggedIn={loggedIn}
            movies='true' />
        <SearchForm />
        <MoviesCardList />
        <More />
        <Footer movies='true' />
    </Fragment>
    )
}

export default Movies;