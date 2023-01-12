import '../../index.css';
import Header from '../Header/header';
import Promo from '../Main/Promo/promo';
import AboutProject from '../Main/AboutProject/aboutProject';
import Techs from '../Main/Techs/techs';
import AboutMe from '../Main/AboutMe/aboutMe';
import Footer from '../Footer/footer';
import * as auth from '../../utils/auth';
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';
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
        .then(() => {
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
    if (!loggedIn) {
      setCurrentUser({})
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api.getUser()
        .then((userData) => {
          setCurrentUser(userData);
          console.log('useEffect get user')
          console.dir(currentUser)
          console.log('userdata')
          console.dir(userData)
        })
        .catch((err) => {
          setCurrentUser({})
          console.log(`Ошибка: ${err}`);
        });
    } else {
      setIsLoading(false)
      setCurrentUser({});
      console.log('current user else')
      console.dir(currentUser)
    }
  }, [loggedIn])

  useEffect(() => {
    setIsLoading(true);
    if (loggedIn) {
      moviesApi.getMovies()
        .then((moviesData) => {
          setMovie(moviesData);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [loggedIn])

  const handleSignOut = () => {
    // localStorage.clear();
    // localStorage.removeItem('jwt');
    // setLoggedIn(false);
    // setCurrentUser({});
    // history.push('/');
    // console.log('handleSignOut')
    // console.dir(currentUser)
    return api.logout()
      .then(() => {
        localStorage.clear();
        localStorage.removeItem('jwt');
        localStorage.removeItem('token');
        setLoggedIn(false);
        history.push('/');
        setCurrentUser({});
        console.log('handleSignOut')
        console.dir(loggedIn)
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }

  const handleUpdateUser = ({ name, email }) => {
    if (loggedIn) {
      return api.setUserInfo({ name, email })
      .then((data) => {
        setCurrentUser(data);
        console.log('handleUpdateUser')
        console.dir(currentUser)
        console.log('data handleUpdateUser')
        console.dir(data)
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
    }
  };

  function handleLogin(user) {
    return auth
      .authorize(user)
      .then((data) => {
        if (data) {
          setLoggedIn(true)
          // setCurrentUser(data);
          localStorage.setItem('jwt', data.token);
          history.push("/movies");
          tokenCheck();
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleRegister(data) {
    console.dir(data)
    return auth
      .register(data)
      .then((user) => {
        console.log('user register')
        console.dir(user)
        // setLoggedIn(true)
        // setCurrentUser(user);
        handleLogin(user)
        history.push("/movies");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    if (loggedIn) {
      api.getSavedMovies()
        .then((res) => {
          setSavedMovies(res);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [loggedIn])

  const handleSaveMovie = (mov) => {
    return api.saveMovie(mov)
      .then((mov) => {
        setSavedMovies([...savedMovies, mov.data]);
      })
      .catch((err) => {
        console.dir(err)
        console.log(`Ошибка: ${err} ${err.message}`);
      })
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
            {loggedIn ? <Redirect to="/" /> : <Register onRegister={handleRegister} />}
          </Route>

          <Route exact path='/signin'>
            {loggedIn ? <Redirect to="/" /> : <Login onLogin={handleLogin} />}
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
