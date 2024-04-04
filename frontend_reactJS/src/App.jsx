
import './App.css'
import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Login from './components/Auth/admin/Login';
import PersonalDetails from './components/Auth/client/PersonalDetails';
import Register from './components/Auth/admin/Register';




function App() {


  return (
    <>
    <Routes>
    <>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/details" element={<PersonalDetails />} />

    </>
    
    </Routes>
   
    </>
  )
}

export default App
