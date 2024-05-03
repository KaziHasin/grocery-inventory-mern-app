import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const notify = () => toast("Wow so easy !");

  return (
    <div>
      <ToastContainer />
      <Outlet />
    </div>
  );
};

export default App;
