const PageWithForm = ({
  pageName,
  submitName,
  onSubmit,
  children,
  isFormValid
}) => {

  return (
    <div className="auth-page">
      <h2 className="auth-page__title">{pageName}</h2>
      <form
        className="form"
        onSubmit={onSubmit}
      >
        {children}
        <input
          type="submit"
          className={`auth-page__button ${!isFormValid ? 'auth-page__button_disabled' : ''}`}
          name="auth-page__submit"
          value={submitName}
          disabled={!isFormValid}
        />
      </form>
    </div>
  )
}


export default PageWithForm;