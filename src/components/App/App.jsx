import '../../index.css';
import Header from '../Header/header';
import Promo from '../Main/Promo/promo';
import AboutProject from '../Main/AboutProject/aboutProject';
import Techs from '../Main/Techs/techs';
import AboutMe from '../Main/AboutMe/aboutMe';
import Footer from '../Footer/footer';
import * as auth from '../../utils/auth';
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import api from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Movies from '../Movies/MoviesComponent';

function App() {

  const history = useHistory();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isloading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState([]);

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((data) => {
          setCurrentUser(data);
          setLoggedIn(true);
          history.push(location.pathname);
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    tokenCheck()
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api.getUser()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) {
      moviesApi.getMovies()
        .then((moviesData) => {
          setMovie(moviesData);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
      // console.log('3 useEffect: ', movie)
    }
  }, [loggedIn])

  const handleSignOut = () => {
    api.logout()
      .then((data) => {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        setCurrentUser({});
        history.push('/signup');
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })

  }

  const handleUpdateUser = ({ name, email }) => {
    api.setUserInfo({ name, email })
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
  };

  function handleLogin(email, password) {
    return auth
      .authorize(email, password)
      .then((data) => {
        if (data) {
          setLoggedIn(true)
          localStorage.setItem('jwt', data.token);
          history.push("/movies");
          tokenCheck();
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleRegister(name, email, password) {
    return auth
      .register(name, email, password)
      .then((user) => {
        setLoggedIn(true)
        setCurrentUser(user);
        history.push("/movies");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      api.getSavedMovies()
        .then((res) => {
          setSavedMovies(res);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
    }
  }, [loggedIn])

  const handleSaveMovie = (mov) => {
    setIsLoading(true);
    api.saveMovie(mov)
      .then((mov) => {
        setSavedMovies([...savedMovies, mov]);
      })
      .catch((err) => {
        console.dir(err)
        console.log(`Ошибка: ${err} ${err.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleMovieDelete = (movie) => {
    const saveMovie = savedMovies.find((mov) => mov.movieId === movie.id || mov.movieId === movie.movieId);
    api.deleteSavedMovie(saveMovie._id)
      .then(() => {
        const newLSavedMoviesList = savedMovies.filter((mov) => {
          if (movie.id === mov.movieId || movie.movieId === mov.movieId) {
            return false
          } else {
            return true
          }
        })
        setSavedMovies(newLSavedMoviesList);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err} ${err.message}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path='/'>
            <Header
              loggedIn={loggedIn} />
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Footer />

          </Route>

          <ProtectedRoute exact path='/saved-movies'
            isloading={isloading}
            component={Movies}
            loggedIn={loggedIn}
            movies={movie}
            saveMovie={savedMovies}
            button={handleSaveMovie}
            handleMovieDelete={handleMovieDelete}
          />

          <ProtectedRoute exact path='/movies'
            isloading={isloading}
            movies={movie}
            component={Movies}
            loggedIn={loggedIn}
            saveMovie={savedMovies}
            button={handleSaveMovie}
            handleMovieDelete={handleMovieDelete}
          />

          <ProtectedRoute exact path='/profile'
            component={Profile}
            loggedIn={loggedIn}
            onUpdateUser={handleUpdateUser}
            onSignOut={handleSignOut} />

          <Route exact path='/signup'>
            <Register onRegister={handleRegister} />
          </Route>

          <Route exact path='/signin'>
            <Login onLogin={handleLogin} />
          </Route>

          {/* <Route exact path='/loading'>
            <Preloader />
          </Route> */}

          <Route exact path='*'>
            <NotFound />
          </Route>



        </Switch>


      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
