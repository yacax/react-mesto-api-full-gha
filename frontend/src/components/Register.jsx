import PageWithForm from "./PageWithForm";
import { Link } from "react-router-dom";
import Header from "./Header";
import useForm from "../hooks/useForm";

const SignUp = ({ registerUser, errorMessage }) => {

  const { form, errors, isFormValid, handleChange } = useForm({
    username: "",
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
          name="username"
          autoComplete="username"
          placeholder="Имя"
          required
          minLength="4"
          maxLength="40"
          id="username"
          value={form.username}
          onChange={handleChange}
        />

        <span className="form__error-text profile-name-input-error" >{errors.username}</span>

        <input
          type="email"
          className="form__input form__input_color_white"
          name="email"
          autoComplete="email"
          placeholder="Email"
          required
          minLength="4"
          maxLength="40"
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
          placeholder="Пароль"
          required
          minLength="4"
          maxLength="40"
          id="password"
          value={form.password}
          onChange={handleChange}
        />
        <span className="form__error-text profile-name-input-error">{errors.password}</span>

        <input
          type="password"
          autoComplete="new-password"
          className="form__input form__input_color_white"
          name="confirmPassword"
          placeholder="Подтвердите пароль"
          required
          minLength="4"
          maxLength="40"
          id="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <span className="form__error-text profile-name-input-error">{errors.confirmPassword}</span>

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