// import { useEffect, useState } from 'react'
// import './App.css'

import {BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes/Routes';
import { LoggedIn , NotLoggedIn } from './Utils/Authenticated';
import Login1 from './Login';
import MainLayout from './Layout/MainLayout';

function App() {

  return (
    // <DashBoard/>
    <BrowserRouter>
        {/* <LoggedIn> */}
          <MainLayout>
            <AppRoutes/>
          </MainLayout>
        {/* </LoggedIn> */}
        <NotLoggedIn>
          <Login1/>
        </NotLoggedIn>
    </BrowserRouter>
  )
}

export default App
