/* eslint-disable */
import PageWithForm from "./PageWithForm";
import Header from "./Header";
import useForm from "../hooks/useForm";

const SignIn = ({ loginUser }) => {

  const { form, errors, isFormValid, handleChange } = useForm({
    email: "",
    password: "",
  })

  const handleSubmit = (evt) => {
    evt.preventDefault();
    loginUser(form);
  }

  return (
    <>
      <Header linkTo='/sign-up' linkName='Регистрация' />

      <PageWithForm
        pageName="Вход"
        submitName="Войти"
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
      >
        <input
          type="email"
          autoComplete="email"
          className="form__input form__input_color_white"
          name="email"
          placeholder="Email"
          required
          maxLength="30"
          id="email"
          value={form.username}
          onChange={handleChange}
        />
        <span className="form__error-text" > {errors.email} </span>

        <input
          type="password"
          autoComplete="current-password"
          className="form__input form__input_color_white"
          name="password"
          placeholder="Пароль"
          required
          maxLength="40"
          id="password"
          value={form.password}
          onChange={handleChange}
        />
        <span className="form__error-text"> {errors.password} </span>

      </PageWithForm>
    </>
  )
}

export default SignIn;