import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...props }) {
  if (!props.loggedIn) {
    return <Navigate to="/sign-in" />;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...props} />;
}

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
