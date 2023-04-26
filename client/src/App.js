import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddItem from './pages/ItemManagement/AddItem.js';
import AddDeliveryInfo from './pages/DeliveryManagement/addDelInfo';
import Header from './pages/Header.js';
import AllItems from './pages/ItemManagement/AllItems.js';
import DisplayItems from './pages/ItemManagement/DisplayItems';
import AllDelInfo from './pages/DeliveryManagement/AlldelInfo';
import AddPayInfo from './pages/PaymentManagement/AddPayInfo';
import AllPayments from './pages/PaymentManagement/AllPayments';
import Login from './pages/UserManagement/login';
import Signup from './pages/UserManagement/signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" />
          <Route path="/additems" element={<AddItem />} />
          <Route path="/allitems" element={<AllItems />} />
          <Route path="/AddDelInfo" element={<AddDeliveryInfo />} />
          <Route path="/AllDelInfo" element={<AllDelInfo />} />
          <Route path="/displayitems" element={<DisplayItems />} />
          <Route path="/AddPayInfo" element={<AddPayInfo/>}/>
          <Route path="/AllPayments" element={<AllPayments/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Signup" element={<Signup/>}/>
        </Route>
      </Routes>
    </Router>
   
    
  );
  
}

export default App;
