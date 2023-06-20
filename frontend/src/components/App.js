import React, { useState, useEffect } from 'react';

import { api } from '../utils/Api';
import * as userAuth from '../utils/userAuth';
import * as randomPicture from '../utils/randomPicture'
import { randomQuote } from '../utils/randomQuote'

import Main from './Main';
import Footer from './Footer';

import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';

import { UserDataContext } from '../contexts/CurrentUserContext';

import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Register from './Register';
import Login from './Login';

const App = () => {

  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  const [infoTool, setInfoTool] = useState({ isOpen: false, text: '', result: '' });

  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    about: "",
    avatar: "",
  })

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    setToken(jwt);
    api.setToken(jwt);
  }, [])

  useEffect(() => {
    setIsLoading(true);
    if (!token) {
      setIsLoading(false);
      return
    }
    userAuth.getUserData(token)
      .then((user) => {
        setUserData({
          ...userData,
          id: user.data._id,
          name: user.data.name,
          email: user.data.email,
          about: user.data.about,
          avatar: user.data.avatar,
        });
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token, navigate])

  const registerUser = ({ name, password, email }) => {
    userAuth.register(name, password, email)
      .then((res) => {
        setUserData({
          ...userData,
          id: res.data._id,
          name: res.data.email,
        });

        setInfoTool({
          ...infoTool,
          text: "Вы успешно зарегистрировались!",
          isOpen: true,
          result: true,
        }
        )
      }).then((res) => {
        userAuth
          .authorize(email, password)
          .then((res) => {
            localStorage.setItem("jwt", res.token);
            setToken(res.token)
          })
      })

      .catch((err) => {
        console.log(err)

        setInfoTool({
          ...infoTool,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          isOpen: true,
          result: false,
        }
        )
      })
  }

  const loginUser = ({ email, password }) => {
    userAuth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setToken(res.token)
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setInfoTool({
          ...infoTool,
          text: "Неправильный логин или пароль!",
          isOpen: true,
          result: false,
        }
        )
      })
  }

  const logOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setToken("");
    setUserData({
      email: "",
      password: "",
      name: "",
    })
  }

  const [magicRandomData, setMagicRandomData] = useState("");

  function smartTrim(str) {
    if (!str || typeof str !== 'string' || str.trim() === '') {
      return '';
    }
    if (str.length <= 30) {
      return str;
    }
    let end = -1;
    for (let i = 30; i >= 15; i--) {
      if (str[i] === '.' || str[i] === '?' || str[i] === '!') {
        end = i + 1;
        break;
      }
    }
    if (end !== -1) {
      return str.substring(0, end);
    }
    end = Math.min(30, str.length);
    while (end > 0 && str[end] !== ' ') {
      end--;
    }
    return str.substring(0, end);
  }


  const generateSomething = (activeInput) => {

    if (activeInput === 'link') {

      randomPicture
        .getPicture()
        .then((image) => {
          setMagicRandomData(image.urls.regular)
        })
        .catch((err) => {
          console.log(err);
        })

    } else if (activeInput === 'name') {

      randomQuote()
        .then((res) => setMagicRandomData(smartTrim(res.quote)))
        .catch((err) => {
          console.log(err);
        })

    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        api.getInitialCards(),
        api.getUserData()
      ]).then(([initialCards, userData]) => {
        setCards(initialCards.data.slice().reverse())
        setUserData(userData.data)
      })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoggedIn])

  function handleCardDelete(card) {
    api
      .deleteCard(card._id).then(() => {
        setCards((state) => state.filter((o) => o._id !== card._id))

      })
      .catch((error) => {
        console.log(error);
      });
  }

  function isLiked(card) {
    return card.likes.some(i => i === userData._id);
  }

  function handleCardLike(card) {

    api
      .toggleLike(card._id, !isLiked(card))
      .then((likeCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? likeCard.data : c));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    switch (true) {
      case isEditProfilePopupOpen:
        setIsEditProfilePopupOpen(false);
        break;
      case isAddPlacePopupOpen:
        setIsAddPlacePopupOpen(false);
        break;
      case isEditAvatarPopupOpen:
        setIsEditAvatarPopupOpen(false);
        break;
      case isImagePopupOpen:
        setIsImagePopupOpen(false);
        break;
      case infoTool.isOpen:
        setInfoTool({
          ...infoTool,
          isOpen: false,
        })
        break;
      default:
        break;
    }
  }

  function handleUpdateUser(user) {

    api
      .patchUserData(user.name, user.about)
      .then((newUser) => {
        setUserData(newUser.data)

        closeAllPopups()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateAvatar(newAvatar) {

    api
      .patchAvatar(newAvatar.avatar)
      .then((res) => {
        setUserData(res.data)
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAddPlaceSubmit(newPlace) {

    api
      .postNewCard(newPlace)
      .then((res) => {
        setCards([res.data, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (isLoading) {
    return <div className='body'>Загрузка...</div>;
  }

  return (
    <UserDataContext.Provider value={userData}>
      <div className="body">
        <div className="page">

          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  path="/"
                  loggedIn={isLoggedIn}
                  component={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  isLiked={isLiked}
                  cards={cards}
                  setCards={setCards}
                  onCardDelete={handleCardDelete}
                  logOut={logOut}
                />
              }
            />

            <Route
              path="/sign-up"
              element={
                <Register registerUser={registerUser} />
              }
            />

            <Route
              path="/sign-in"
              element={
                <Login loginUser={loginUser} />
              }
            />

          </Routes>
          {isLoggedIn && <Footer />}

        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          generateSomething={generateSomething}
          magicRandomData={magicRandomData} />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup
          name="card"
          selectedCard={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups} />

        <InfoTooltip
          result={infoTool.result}
          text={infoTool.text}
          isOpen={infoTool.isOpen}
          onClose={closeAllPopups} />

      </div>
    </UserDataContext.Provider>
  );
};

export default App;
