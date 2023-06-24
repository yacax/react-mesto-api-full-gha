import React, { useState, useEffect, useCallback } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';
import { api } from '../utils/Api';
import * as userAuth from '../utils/userAuth';

import Main from './Main';
import Footer from './Footer';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';

import { UserDataContext } from '../contexts/CurrentUserContext';

import ProtectedRoute from './ProtectedRoute';

import Register from './Register';
import Login from './Login';

function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  const [infoTool, setInfoTool] = useState({ isOpen: false, text: '', result: '' });

  const [userData, setUserData] = useState({
    _id: '',
    name: '',
    email: '',
    about: '',
    avatar: '',
  });

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    setToken(jwt);
    api.setToken(jwt);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (!token) {
      setIsLoading(false);
      return;
    }
    userAuth.getUserData(token)
      .then((user) => {
        setUserData({
          ...userData,
          _id: user.data._id,
          name: user.data.name,
          email: user.data.email,
          about: user.data.about,
          avatar: user.data.avatar,
        });

        setIsLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token, navigate]);

  const registerUser = ({
    name,
    about,
    avatar,
    email,
    password,
  }) => {
    setIsLoading(true);
    userAuth.register(name, about, avatar, email, password)
      .then((res) => {
        setUserData({
          ...userData,
          _id: res._id,
          name: res.email,
        });

        setInfoTool({
          ...infoTool,
          text: 'Вы успешно зарегистрировались!',
          isOpen: true,
          result: true,
        });
      }).then(() => {
        userAuth
          .authorize(email, password)
          .then((res) => {
            localStorage.setItem('jwt', res.token);
            api.setToken(res.token);
            setIsLoggedIn(true);
          });
      })
      .catch((err) => {
        console.log(err);
        setInfoTool({
          ...infoTool,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
          isOpen: true,
          result: false,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const loginUser = ({ email, password }) => {
    setIsLoading(true);
    userAuth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        api.setToken(res.token);
        return userAuth.getUserData(res.token);
      })
      .then((user) => {
        setUserData({
          _id: user.data._id,
          name: user.data.name,
          email: user.data.email,
          about: user.data.about,
          avatar: user.data.avatar,
        });
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setInfoTool({
          ...infoTool,
          text: 'Неправильный логин или пароль!',
          isOpen: true,
          result: false,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setToken('');
    setUserData({
      _id: '',
      name: '',
      email: '',
      about: '',
      avatar: '',
    });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/sign-in');
    } else if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        api.getUserData(),
        api.getInitialCards(),
      ]).then(([user, card]) => {
        setUserData(user.data);
        setCards(card.data.slice().reverse());
      })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoggedIn]);

  const handleCardDelete = useCallback((card) => {
    api
      .deleteCard(card._id).then(() => {
        setCards((state) => state.filter((o) => o._id !== card._id));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const isLiked = useCallback((card) => card.likes.some((i) => i === userData._id), [userData]);

  const handleCardLike = useCallback((card) => {
    api
      .toggleLike(card._id, !isLiked(card))
      .then((likeCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? likeCard.data : c)));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isLiked]);

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
        });
        break;
      default:
        break;
    }
  };

  const handleUpdateUser = useCallback((user) => {
    api
      .patchUserData(user.name, user.about)
      .then((newUser) => {
        setUserData(newUser.data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [closeAllPopups]);

  const handleUpdateAvatar = useCallback((newAvatar) => {
    api
      .patchAvatar(newAvatar.avatar)
      .then((res) => {
        setUserData(res.data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [closeAllPopups]);

  const handleAddPlaceSubmit = useCallback((newPlace) => {
    api
      .postNewCard(newPlace)
      .then((res) => {
        setCards((cardsSet) => [res.data, ...cardsSet]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [closeAllPopups]);

  if (isLoading) {
    return <div className="body"> Загрузка...</div>;
  }

  return (
    <UserDataContext.Provider value={userData}>
      <div className="body">
        <div className="page">

          <Routes>
            <Route
              path="/"
              element={(
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
              )}
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
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup
          name="card"
          selectedCard={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          result={infoTool.result}
          text={infoTool.text}
          isOpen={infoTool.isOpen}
          onClose={closeAllPopups}
        />

      </div>
    </UserDataContext.Provider>
  );
}

export default App;
