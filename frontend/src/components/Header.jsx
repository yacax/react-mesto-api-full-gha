import React, { useEffect, useState } from 'react';
import HeaderInformer from './HeaderInformer';

const Header = ({ linkTo, linkName, email = '', logOut }) => {

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleToggleClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  useEffect(() => {

    const handleResize = () =>
      setIsMenuVisible(false);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="header">

      {isMenuVisible && email && (<HeaderInformer
        mobile={true}
        email={email}
        linkName={linkName}
        linkTo={linkTo}
        logOut={logOut}
      />)}

      <div className="header__base">

        <div className="header__logo" />

        {email && (
          <button
            className={`header__button ${isMenuVisible ? 'header__button_type_close' : 'header__button_type_menu'}`}
            onClick={handleToggleClick} />
        )}

        <HeaderInformer
          mobile={false}
          email={email}
          linkName={linkName}
          linkTo={linkTo}
          logOut={logOut}
        />

      </div>
    </header >
  );
};

export default Header;


