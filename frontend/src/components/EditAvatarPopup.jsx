import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import useForm from '../hooks/useForm';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
}) {
  const {
    form,
    errors,
    isFormValid,
    handleChange,
    hardChangeIsFormValid,
    resetForm,
  } = useForm({
    avatar: '',
  });

  const newAvatar = useRef();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: newAvatar.current.value,
    });
  }, [onUpdateAvatar, form]);

  useEffect(() => {
    resetForm();
    hardChangeIsFormValid(false);
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <input
        type="url"
        className="form__input popup__input_name_subtitle"
        name="avatar"
        placeholder="Ссылка на картинку"
        id="place-url-avatar-input"
        required
        value={form.avatar}
        ref={newAvatar}
        onChange={handleChange}
      />
      <span className="form__error-text place-url-avatar-input-error">
        {errors.avatar}
        {' '}
      </span>
    </PopupWithForm>
  );
}

EditAvatarPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateAvatar: PropTypes.func.isRequired,
};
