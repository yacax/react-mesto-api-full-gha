import { useEffect, useRef } from "react";
import useForm from "../hooks/useForm";
import PopupWithForm from "./PopupWithForm"

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const { form, errors, isFormValid, handleChange } = useForm({
    avatar: "",
  });

  const newAvatar = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: newAvatar.current.value,
    });
  }

  useEffect(() => {
    newAvatar.current.value = '';
  }, [isOpen])

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
      <span className="form__error-text place-url-avatar-input-error" >{errors.avatar} </span>
    </PopupWithForm>
  )
}