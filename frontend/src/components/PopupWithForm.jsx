import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
  buttonText = 'Сохранить',
  onSubmit,
  isFormValid,
  generateSomething,
  activeInput,
}) {
  const handleOverlayClose = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleEscClose = useCallback((event) => {
    if (event.key === 'Escape' || event.key === 'Enter') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
    }
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isOpen, handleEscClose]);

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlayClose}
      onKeyDown={handleEscClose}
      role="button"
      tabIndex={0}
    >
      <div className="popup__container">
        <button
          aria-label="Popup close button"
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />

        <form className={`popup__form popup__form_name_${name}`} onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {activeInput && (
            <button
              aria-label="Magic button that insert random text and pictures"
              className="popup__random-button"
              type="button"
              title="Волшебная кнопка автозаполнения! Заполнить?"
              onClick={generateSomething}
            />
          )}
          {children}
          <input
            type="submit"
            className={`popup__save-button ${!isFormValid ? 'popup__save-button_disabled' : ''}`}
            name="popup-save-button"
            value={buttonText}
            disabled={!isFormValid}
          />
        </form>
      </div>
    </div>
  );
}

PopupWithForm.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  generateSomething: PropTypes.func,
  activeInput: PropTypes.string,
};

PopupWithForm.defaultProps = {
  generateSomething: () => { },
  activeInput: '',
  buttonText: 'Сохранить',
};

export default PopupWithForm;
