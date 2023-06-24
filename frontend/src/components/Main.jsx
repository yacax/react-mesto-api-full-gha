/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';
import { UserDataContext } from '../contexts/CurrentUserContext';
import Header from './Header';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  ...props
}) {
  const userData = React.useContext(UserDataContext);

  let cardsElements = [];
  if (props.cards) {
    cardsElements = props.cards.map((card) => (
      <Card
        key={card._id}
        card={card}
        isLiked={props.isLiked}
        onCardClick={props.onCardClick}
        onCardLike={props.onCardLike}
        onCardDelete={props.onCardDelete}
      />
    ));
  }

  return (
    <>
      <Header
        linkTo="/sign-in"
        linkName="Выйти"
        email={userData.email}
        logOut={props.logOut}
      />
      <main>
        <section className="profile">
          { /* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div
            className="profile__avatar-container"
            onClick={onEditAvatar}
          >
            <div className="profile__avatar-edit" />
            <img
              src={userData.avatar}
              alt="Фотография пользователя."
              className="profile__avatar"
            />
          </div>

          <div className="profile__info">
            <h1 className="profile__title">
              {userData.name}
            </h1>
            { /* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            />
            <p className="profile__subtitle">{userData.about}</p>
          </div>
          <button
            className="profile__add-button"
            type="button"
            onClick={onAddPlace}
          />
        </section>

        <section
          className="elements"
          aria-label="Галлерея мест пользователя"
        >
          {cardsElements}
        </section>

      </main>
    </>
  );
}

Main.propTypes = {
  onEditProfile: PropTypes.func.isRequired,
  onAddPlace: PropTypes.func.isRequired,
  onEditAvatar: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
  isLiked: PropTypes.func.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      likes: PropTypes.arrayOf(PropTypes.string).isRequired,
      owner: PropTypes.string.isRequired,
    }),
  )
    .isRequired,
  setCards: PropTypes.func.isRequired,
  onCardDelete: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,

};

export default Main;
