// import { useEffect, useState } from 'react'
// import './App.css'

import {BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';
import { LoggedIn , NotLoggedIn } from './Authenticated';
import Login1 from './Login1';
import Header from './Header';
import SideBar from './Sidebar';

function App() {

  return (
    // <DashBoard/>
    <BrowserRouter>
        {/* <LoggedIn> */}
          <div className="wrapper">
              <Header/>
              <SideBar/>
              <AppRoutes/>
          </div>
        {/* </LoggedIn> */}
        <NotLoggedIn>
          <Login1/>
        </NotLoggedIn>
    </BrowserRouter>
  )
}

export default App
