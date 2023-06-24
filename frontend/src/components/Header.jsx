/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderInformer from './HeaderInformer';

function Header({
  linkTo,
  linkName,
  email = '',
  logOut,
}) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleToggleClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  useEffect(() => {
    const handleResize = () => setIsMenuVisible(false);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="header">

      {isMenuVisible && email && (
        <HeaderInformer
          mobile
          email={email}
          linkName={linkName}
          linkTo={linkTo}
          logOut={logOut}
        />
      )}

      <div className="header__base">

        <div className="header__logo" />

        {email && (
          <button
            className={`header__button ${isMenuVisible ? 'header__button_type_close' : 'header__button_type_menu'}`}
            onClick={handleToggleClick}
            type="button"
            aria-label={isMenuVisible ? 'Close menu' : 'Open menu'}
          />
        )}

        <HeaderInformer
          mobile={false}
          email={email}
          linkName={linkName}
          linkTo={linkTo}
          logOut={logOut}
        />

      </div>
    </header>
  );
}

// Header.propTypes = {
//   linkTo: PropTypes.string.isRequired,
//   linkName: PropTypes.string.isRequired,
//   email: PropTypes.string,
//   logOut: PropTypes.func.isRequired,
// };

// Header.defaultProps = {
//   email: '',
// };

export default Header;
