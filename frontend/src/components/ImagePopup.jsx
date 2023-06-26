import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

function ImagePopup({ selectedCard, onClose, isOpen }) {
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
      className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`}
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
        <img
          src={selectedCard.link}
          alt={selectedCard.name}
          className="popup__image"
        />
        <p className="popup__image-title">{selectedCard.name}</p>
      </div>
    </div>
  );
}

ImagePopup.propTypes = {
  selectedCard: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    link: PropTypes.string,
    owner: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default ImagePopup;
