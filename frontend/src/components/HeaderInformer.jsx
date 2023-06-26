import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function getClassName(mobile, email) {
  if (mobile && email) {
    return 'header__informer header__informer_type_mobile';
  }
  if (email) {
    return 'header__informer';
  }
  return 'header__informer header__informer_type_register';
}

function HeaderInformer({
  email,
  linkName,
  linkTo,
  logOut,
  mobile,
}) {
  return (
    <div
      className={getClassName(mobile, email)}
    >
      <p
        className={`header__user ${mobile && email ? 'header__user_type_mobile' : ''}`}
      >
        {email}
      </p>

      <Link
        to={linkTo}
        className={`header__link ${mobile && email ? 'header__link_type_mobile' : ''}`}
        onClick={logOut}
      >
        {linkName}
      </Link>

    </div>
  );
}

HeaderInformer.propTypes = {
  email: PropTypes.string,
  linkName: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  logOut: PropTypes.func,
  mobile: PropTypes.bool.isRequired,
};

HeaderInformer.defaultProps = {
  email: '',
  logOut: () => { },
};

export default HeaderInformer;
