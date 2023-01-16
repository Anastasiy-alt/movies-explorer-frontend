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
import MoviesAll from '../Movies/MoviesAll/MoviesAll';
import PopupSuccess from '../popup/popup';
import MoviesSaved from '../Movies/MoviesSaved/MoviesSaved';

function App() {

  const history = useHistory();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('jwt'));
  const [currentUser, setCurrentUser] = useState({});
  const [isloading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState('')
  const [messageError, setMessageError] = useState('')

  // useEffect(() => {
  //   const now = new Date(); console.log(`${now.toString()} save movie === `); console.dir(currentUser)
  //   }, [currentUser]);

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then(() => {
          setLoggedIn(true);
          history.push(location.pathname);
        })
        .catch((err) => console.log(err.statusCode));
    }
  }

  useEffect(() => {
    tokenCheck()
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    if (loggedIn && jwt) {
      api.getUser(jwt)
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          setCurrentUser({})
          console.log(`Ошибка: ${err.statusCode}`);
          console.dir(err)
        });
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
    return api.logout()
      .then(() => {
        localStorage.clear();
        localStorage.removeItem('jwt');
        localStorage.removeItem('token');
        setLoggedIn(false);
        history.push('/');
        setCurrentUser({});
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.statusCode}`);
      });
  }

  const handleUpdateUser = ({ name, email }) => {
    const jwt = localStorage.getItem('jwt')
    if (loggedIn) {
      return api.setUserInfo({ name, email }, jwt)
      .then((data) => {
        setCurrentUser(data);
        setMessageSuccess('Вы успешно изменили данные!')
        setIsSuccess(true);
        setIsPopupOpen(true);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.statusCode}`);
        if (err.statusCode === 1100) {
          setMessageError('Пользователь с данным email уже существует.')
        } else {
          setMessageError('Что-то пошло не так! Попробуйте ещё раз')
        }

        setIsSuccess(false)
        setIsPopupOpen(true);
      })
    }
  };

  function handleLogin(data) {
    return auth
      .authorize(data)
      .then((data) => {
        if (data.user) {
          setCurrentUser(data.user);
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true)
          history.push('/movies');
          Promise.all([api.getSavedMovies(data.token), api.getUser(data.token)])
          .then(([userData, moviesData]) => {
            setSavedMovies(moviesData);
            setCurrentUser(userData)
          })
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.statusCode}`);
        if (err.statusCode === 401) {
          setMessageError('Неправильные почта или пароль.')
        }
        setIsSuccess(false)
        setIsPopupOpen(true);
      })
  }

  function handleRegister(data) {
    return auth
      .register(data)
      .then((data) => {  
        handleLogin(data)
        setMessageSuccess('Вы успешно зарегестрировались!')
        setIsSuccess(true);
        setIsPopupOpen(true);
      })
      .catch((err) => {
        if (err.statusCode === 409) {
          setMessageError('Пользователь с данным email уже существует.')
        } else {
          setMessageError('Что-то пошло не так! Попробуйте ещё раз')
        }
        setIsSuccess(false);
        setIsPopupOpen(true);
        console.log(`Ошибка: ${err.statusCode}`);
      })
  }

  useEffect(() => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt')
    if (loggedIn && jwt) {
      api.getSavedMovies(jwt)
        .then((res) => {
          setSavedMovies(res);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err.statusCode}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [loggedIn])

  const handleSaveMovie = (mov) => {
    const jwt = localStorage.getItem('jwt')
    return api.saveMovie(mov, jwt)
      .then((mov) => {
        setSavedMovies([...savedMovies, mov.data]);
      })
      .catch((err) => {
        console.dir(err)
        console.log(`Ошибка: ${err.statusCode} ${err.message}`);
      })
  }

  const handleMovieDelete = (movie) => {
    const jwt = localStorage.getItem('jwt')
    const saveMovie = savedMovies.find((mov) => mov.movieId === movie.id || mov.movieId === movie.movieId);
    api.deleteSavedMovie(saveMovie._id, jwt)
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
        console.log(`Ошибка: ${err.statusCode} ${err.message}`);
      });
  }

  const closePopup = () => {
    setIsPopupOpen(false)
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
            component={MoviesSaved}
            loggedIn={loggedIn}
            saveMovie={savedMovies}
            button={handleSaveMovie}
            handleMovieDelete={handleMovieDelete}
          />

          <ProtectedRoute exact path='/movies'
            isloading={isloading}
            movies={movie}
            component={MoviesAll}
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
        <PopupSuccess
                    isSuccess={isSuccess}
                    isOpen={isPopupOpen}
                    onClose={closePopup}
                    messageSuccess={messageSuccess}
                    messageError={messageError} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
