import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, Outlet } from 'react-router-dom';

const AdminPrivateRoute = () => {

    const loggedUser = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
  
    let type;
    let link;
  
    if (!loggedUser) {
      type = 'notadmin'
      link = '/login'
    } else if (loggedUser.userType === 'admin') {
      type = 'admin'
      link = '/allitems'
    } else {
      type = 'notadmin'
      link = '/displayitems'
    }
  
  
    return (
      <>
        {type === 'admin' ? <Outlet /> : <Navigate to={link} />}
      </>
    );
  };
  
  export default AdminPrivateRoute;