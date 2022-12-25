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
import api from '../../utils/Api';
import Login from '../Login/Login';
import Register from '../Register/Register';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import More from '../Movies/More/More';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';

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

  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push("/signin");
  }

  const handleUpdateUser = (userData) => {
    api.setUserInfo(userData)
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
        history.push("/signin");
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

          <Route exact path='/saved-movies'>
            <Header
              loggedIn='true'
              movies='true' />
            
              <SearchForm />
              <MoviesCardList />
              <More />
            
            <Footer movies='true' />
          </Route>

          <Route exact path='/movies'>
            <Header
              loggedIn='true'
              movies='true' />
            
              <SearchForm />
              <MoviesCardList />
              <More />
            
            <Footer movies='true' />
          </Route>

          <Route exact path='/signup'>
            <Register onRegister={handleRegister} />
          </Route>

          <Route exact path='/signin'>
            <Login onLogin={handleLogin} />
          </Route>

          <Route exact path='/profile'>
            <Header
              loggedIn='true'
              movies='true' />
            
              <Profile
                handleUpdateUser={handleUpdateUser}
                onSignOut={handleSignOut} />
            
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
