import PageWithForm from "./PageWithForm";
import { Link } from "react-router-dom";
import Header from "./Header";
import useForm from "../hooks/useForm";

const SignUp = ({ registerUser, errorMessage }) => {

  const { form, errors, isFormValid, handleChange } = useForm({
    name: "",
    about: "",
    avatar: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = (evt) => {
    evt.preventDefault();
    registerUser(form);
  }

  return (
    <>
      <Header linkTo='/sign-in' linkName='Войти' />

      <PageWithForm
        pageName="Регистрация"
        submitName="Зарегистрироваться"
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
      >

        <input
          type="text"
          className="form__input form__input_color_white"
          name="name"
          autoComplete="name"
          placeholder="Имя"
          minLength="2"
          maxLength="30"
          id="name"
          value={form.name}
          onChange={handleChange}
        />

        <span className="form__error-text profile-name-input-error" >{errors.name}</span>

        <input
          type="text"
          className="form__input form__input_color_white"
          name="about"
          autoComplete="about"
          placeholder="О себе"
          minLength="2"
          maxLength="30"
          id="about"
          value={form.about}
          onChange={handleChange}
        />

        <span className="form__error-text profile-about-input-error" >{errors.about}</span>

        <input
          type="url"
          className="form__input form__input_color_white"
          name="avatar"
          placeholder="Ссылка на картинку"
          id="place-url-avatar-input"
          value={form.avatar}
          onChange={handleChange}
        />
        <span className="form__error-text place-url-avatar-input-error" >{errors.avatar} </span>

        <input
          type="email"
          className="form__input form__input_color_white"
          name="email"
          autoComplete="email"
          placeholder="Email *"
          required
          minLength="2"
          maxLength="30"
          id="email"
          value={form.email}
          onChange={handleChange}
        />

        <span className="form__error-text profile-name-input-error" >{errors.email}</span>

        <input
          type="password"
          autoComplete="new-password"
          className="form__input form__input_color_white"
          name="password"
          placeholder="Пароль *"
          required
          minLength="8"
          maxLength="40"
          id="password"
          value={form.password}
          onChange={handleChange}
        />
        <span className="form__error-text profile-password-input-error">{errors.password}</span>

        <input
          type="password"
          autoComplete="new-password"
          className="form__input form__input_color_white"
          name="confirmPassword"
          placeholder="Подтвердите пароль *"
          required
          minLength="8"
          maxLength="40"
          id="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <span className="form__error-text profile-password-input-error">{errors.confirmPassword}</span>

      </PageWithForm>

      <div className="auth-page__tips">
        <p className="auth-page__tip">Уже зарегистрированы? </p>
        <Link to="/sign-in" className="auth-page__link">
          Войти
        </Link>
      </div>
    </>

  )
}

export default SignUp;