/* eslint-disable no-unused-vars */
import React from 'react'
import { Route, Routes, Link } from 'react-router-dom';



const Sidebar = () => {
  return (
    <div className="drawer-side bg-base-200">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 bg-base-200 text-base-content">
        <li><Link to='/admin/login'>test</Link></li>
        <li><Link to='/admin/register'>Link 1</Link></li>
        <li><Link to='/content'>Content</Link></li>
        <li><Link to='/'>Link 1</Link></li>
  
      </ul>
    </div>
  )
}

export default Sidebar