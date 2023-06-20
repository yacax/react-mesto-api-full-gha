import React from 'react';

import { Card } from './Card';
import { UserDataContext } from '../contexts/CurrentUserContext';
import Header from './Header';

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, ...props }) => {

  const userData = React.useContext(UserDataContext);

  let cardsElements = [];
  if (props.cards) {

    cardsElements = props.cards.map(card => {

      return (
        <Card
          key={card._id}
          card={card}
          isLiked={props.isLiked}
          onCardClick={props.onCardClick}
          onCardLike={props.onCardLike}
          onCardDelete={props.onCardDelete}
        />
      )
    })
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
          <div
            className="profile__avatar-container"
            onClick={onEditAvatar}>
            <div className="profile__avatar-edit" />
            <img
              src={userData.avatar}
              alt="Фотография пользователя."
              className="profile__avatar" />
          </div>

          <div className="profile__info">
            <h1 className="profile__title"> {userData.name} </h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile} />
            <p className="profile__subtitle">{userData.about}</p>
          </div>
          <button
            className="profile__add-button"
            type="button"
            onClick={onAddPlace} />
        </section>

        <section
          className="elements"
          aria-label="Галлерея мест пользователя">
          {cardsElements}
        </section>

      </main>
    </>
  );
};

export default Main;