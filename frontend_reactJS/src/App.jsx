
import './App.css'
import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Login from './components/Auth/admin/Login';
import Register from './components/Auth/admin/Register';
import ForgotPassword from './components/Auth/admin/ForgotPassword';
import PersonalDetails from './components/Auth/employee/EmployeePersonalDetails';


function App() {


  return (
    <>
    <Routes>
    <>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/details" element={<PersonalDetails />} />

    </>
    
    </Routes>
   
    </>
  )
}

export default App
