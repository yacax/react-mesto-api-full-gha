import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import successImage from '../images/success.svg';
import failImage from '../images/fail.svg';

function InfoTooltip({
  text,
  result,
  isOpen,
  onClose,
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
      className={`popup popup_type_register ${isOpen ? 'popup_opened' : ''}`}
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
        <div
          className="popup__content"
        >
          <img
            className="popup__picture"
            src={result ? successImage : failImage}
            alt={text}
          />
          <p className="popup__info">{text}</p>

        </div>
      </div>
    </div>
  );
}

InfoTooltip.propTypes = {
  text: PropTypes.string,
  result: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

InfoTooltip.defaultProps = {
  text: '',
  result: false,
};

export default InfoTooltip;
