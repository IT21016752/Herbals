import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, Outlet } from 'react-router-dom';

const UserPrivateRoute = () => {

  const loggedUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  let type;
  let link;

  if (!loggedUser) {
    type = 'notuser'
    link = '/login'
  } else if (loggedUser.userType === 'user') {
    type = 'user'
    link = 'displayitems'
  } else {
    type = 'notuser'
    link = '/allitems'
  }


  return (
    <>
      {type === 'user' ? <Outlet /> : <Navigate to={link} />}
    </>
  );
};

export default UserPrivateRoute;