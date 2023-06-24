/* eslint-disable */
import React, { useEffect } from 'react';

const ImagePopup = ({ selectedCard, onClose, isOpen, imageInfo }) => {

  const handleOverlayClose = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscClose = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
    }
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlayClose}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button" onClick={onClose}></button>
        <img src={selectedCard.link}
          alt={selectedCard.alt}
          className="popup__image" />
        <p className="popup__image-title">{selectedCard.name}</p>
      </div>
    </div>
  );
};

export default ImagePopup;