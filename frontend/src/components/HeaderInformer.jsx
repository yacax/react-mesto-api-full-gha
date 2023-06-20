import { Link } from "react-router-dom"


const HeaderInformer = ({ email, linkName, linkTo, logOut, mobile }) => {


  return (
    <div
      className={`header__informer ${mobile && email ? 'header__informer_type_mobile' :
        email ? '' :
          'header__informer_type_register'
        }`}>

      <p
        className={`header__user ${mobile && email ? 'header__user_type_mobile' : ''}`}>
        {email}
      </p>

      <Link
        to={linkTo}
        className={`header__link ${mobile && email ? 'header__link_type_mobile' : ''}`}
        onClick={logOut ? logOut : null}>
        {linkName}
      </Link>

    </div>
  )

}

export default HeaderInformer;