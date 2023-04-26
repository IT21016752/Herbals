import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AddItem from './pages/ItemManagement/AddItem.js';
import AddDeliveryInfo from './pages/DeliveryManagement/addDelInfo';
import Header from './pages/Header.js';
import UserHeader from './pages/UserHeader.js';
import SellerHeader from './pages/SellerHeader.js';
import AllItems from './pages/ItemManagement/AllItems.js';
import DisplayItems from './pages/ItemManagement/DisplayItems';
import AllDelInfo from './pages/DeliveryManagement/AlldelInfo';
import AddPayInfo from './pages/PaymentManagement/AddPayInfo';
import AllPayments from './pages/PaymentManagement/AllPayments';
import Login from './pages/UserManagement/login.js';
import Signup from './pages/UserManagement/signup.js';
import LandingPage from './pages/LandingPage.js';
import ExploreItems from './pages/ItemManagement/ExploreItems.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Navigate to='/LandingPage' />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/ExploreItems" element={<ExploreItems />} />
        </Route>
        <Route element={<UserHeader />}>
          <Route path="/" />
          <Route path="/AddDelInfo" element={<AddDeliveryInfo />} />
          <Route path="/displayitems" element={<DisplayItems />} />
          <Route path="/AddPayInfo" element={<AddPayInfo />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Route>
        <Route element={<SellerHeader />}>
          <Route path="/" />
          <Route path="/additems" element={<AddItem />} />
          <Route path="/allitems" element={<AllItems />} />
          <Route path="/AllDelInfo" element={<AllDelInfo />} />
          <Route path="/AllPayments" element={<AllPayments />} />
        </Route>
      </Routes>
    </Router>


  );

}

export default App;
