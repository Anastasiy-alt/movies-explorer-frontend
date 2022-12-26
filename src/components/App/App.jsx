import '../../index.css';
import Header from '../Header/header';
import Promo from '../Main/Promo/promo';
import AboutProject from '../Main/AboutProject/aboutProject';
import Techs from '../Main/Techs/techs';
import AboutMe from '../Main/AboutMe/aboutMe';
import Footer from '../Footer/footer';
// import Preloader from '../Movies/Preloader/Preloader';
import * as auth from '../../utils/auth';
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import api from '../../utils/MainApi';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Movies from '../Movies/MoviesComponent';

function App() {

  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      return;
    }
    auth
      .checkToken(jwt)
      .then((data) => {
        setUserEmail(data.email);
        setCurrentUser(data);
        setLoggedIn(true);
        history.push("/")
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    tokenCheck()
  }, []);

  useEffect(() => {
    console.log(loggedIn)
    if (loggedIn) {
        api.getUser()
            .then((userData) => {
              console.log(userData);
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }
}, [loggedIn])


  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push("/signin");
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
          setUserEmail(email);
          history.push("/");
          tokenCheck();
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  // registration
  function handleRegister(name, email, password) {
    return auth
      .register(name, email, password)
      .then((user) => {
        setLoggedIn(true)
        setCurrentUser(user);
        // setIsSuccess(true);
        // setIsInfoTooltipPopupOpen(true);
        history.push("/movies");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
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
            component={Movies}
            loggedIn={loggedIn} />

          <ProtectedRoute exact path='/movies'
            component={Movies}
            loggedIn={loggedIn} />

          <ProtectedRoute exact path='/profile'
            component={Profile}
            loggedIn={loggedIn}
            onUpdateUser={handleUpdateUser} />

          <Route exact path='/signup'>
            <Register onRegister={handleRegister} />
          </Route>

          <Route exact path='/signin'>
            <Login onLogin={handleLogin} />
          </Route>

          <Route exact path='*'>
            <NotFound />
          </Route>

        </Switch>
        {/* <Preloader /> */}

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
