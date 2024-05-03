import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const userInfo = localStorage.getItem('userInfo');
  return (
    userInfo ? <Outlet /> : <Navigate to="/login" replace />
  )
}
