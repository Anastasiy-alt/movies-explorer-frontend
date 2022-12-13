import '../../index.css';
import Header from '../Header/header';
import Promo from '../Main/Promo/promo';
import AboutProject from '../Main/AboutProject/aboutProject';
import Techs from '../Main/Techs/techs';
import AboutMe from '../Main/AboutMe/aboutMe';
import Footer from '../Footer/footer';
import Preloader from '../Movies/Preloader/Preloader';
import * as auth from '../../utils/auth';
import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import api from '../../utils/Api';
import Login from '../Login/Login';
import Register from '../Register/Register';
import SearchForm from '../Movies/SearchForm/SearchForm';

function App() {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [selectDelete, setSelectDelete] = useState(false);
  const [deleteCard, setDeleteCard] = useState('');

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
    // api
    //   .getInitialCards(jwt)
    //   .then((initialCards) => {
    //     setCards(initialCards)
    //   })
    //   .catch((err) => console.log(err));
  }

  useEffect(() => {
    tokenCheck()
  }, []);

  // useEffect(() => {
  //   if (loggedIn) {
  //     Promise.all([api.getInitialCards(), api.getUserInfo()])
  //       .then(([cardData, userData]) => {
  //         setCards(cardData);
  //         setCurrentUser(userData);
  //       })
  //       .catch((err) => {
  //         console.log(`Ошибка: ${err}`);
  //       })
  //   }
  // }, [loggedIn])

  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push("/signin");
  }

  const handleUpdateUser = (userData) => {
    api.setUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
  };
  const handleAddCard = (card) => {
    api.addCard(card)
      .then(({ data }) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };
  const handleUpdateAvatar = ({ avatar }) => {
    api.setUserAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
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
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
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
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  const handleRemoveClick = (cardId) => {
    setSelectDelete(!selectDelete);
    setDeleteCard(cardId);
  };
  const handleUserInfo = (userInfo) => {
    setCurrentUser(userInfo);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectDelete(false);
    setSelectedCard({});
    setIsInfoTooltipPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Switch>
          {/* <Route exact path='/'>

            <Header
              loggedIn={loggedIn}
              onSignOut={handleSignOut}
              movies='false' />
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Footer />

          </Route> */}

          <Route exact path='/'>

            <Header
              loggedIn='true'
              onSignOut={handleSignOut}
              movies='true' />

              <SearchForm />


          </Route>

          <Route exact path='/signup'>
            <Register onRegister={handleRegister} />
          </Route>

          <Route exact path='/signin'>
            <Login onLogin={handleLogin} />
          </Route>

          <Route exact path='*'>
            {/* 404  */}
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        {/* <Preloader /> */}

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
