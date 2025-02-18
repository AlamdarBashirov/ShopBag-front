import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// protected route bileşeni
const ProtectedRouter = ({ component: Component, ...rest }) => {
  // LocalStorage'dan token'ı alıyoruz
  const token = localStorage.getItem('token');

  return (
    <Route
      {...rest}  // Rest parametrelerini alıyoruz
      render={(props) =>
        token ? (
          <Component {...props} />  // Eğer token varsa, Component'i render et
        ) : (
          <Redirect to="/login" />  // Eğer token yoksa, login sayfasına yönlendir
        )
      }
    />
  );
};

export default ProtectedRouter;
