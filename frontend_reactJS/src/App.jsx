
import './App.css'
import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Login from './components/Auth/admin/Login';



function App() {


  return (
    <>
    <Routes>
    <>
    <Route path="/login" element={<Login />} />

    </>
    
    </Routes>
   
    </>
  )
}

export default App
