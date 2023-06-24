import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm';
import { UserDataContext } from '../contexts/CurrentUserContext';
import useForm from '../hooks/useForm';

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
}) {
  const {
    form, errors, isFormValid, handleChange, setForm,
  } = useForm({
    name: '',
    about: '',
  });

  const userData = React.useContext(UserDataContext);

  React.useEffect(() => {
    if (userData.name || userData.about) {
      setForm({
        name: userData.name || '',
        about: userData.about || '',
      });
    }
  }, [isOpen, userData]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onUpdateUser(form);
  }, [form]);

  return (

    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <input
        type="text"
        className="form__input popup__input_name_title"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="30"
        id="profile-name-input"
        value={form.name}
        onChange={handleChange}
      />
      <span className="form__error-text profile-name-input-error">
        {errors.name}
        {' '}
      </span>

      <input
        type="text"
        className="form__input popup__input_name_subtitle"
        name="about"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="30"
        id="profile-description-input"
        value={form.about}
        onChange={handleChange}
      />
      <span className="form__error-text profile-about-input-error">{errors.about}</span>

    </PopupWithForm>
  );
}

EditProfilePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
};
