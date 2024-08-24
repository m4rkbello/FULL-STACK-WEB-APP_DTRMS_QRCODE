/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
//ICONS
import { FcFolder, FcOpenedFolder, FcPlus, FcSalesPerformance, FcSearch, FcPrevious, FcViewDetails, FcEmptyTrash, FcNext } from "react-icons/fc";
//TOASTER
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Deduction = () => {
  return (
    <div className='h-full max-h-full w-full max-w-full glass mx-auto p-4 shadow-slate-900/100 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg'>
    <div className="flex flex-col bg-transparent mb-10 shadow-slate-900/100" >
      <div className="flex items-center text-sm breadcrumbs">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className='flex items-center hover:text-white'>
              <FcPrevious style={{ height: "2rem", width: "2rem" }} />
              <span className="ml-2">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/employee/dashboard" className='flex items-center hover:text-white'>
              <FcFolder
                style={{ height: "2rem", width: "2rem" }} />
              <span className="ml-2">Rates</span>
            </Link>
          </li>
          <li>
            <Link to="" className='flex items-center hover:text-white'>
              <FcOpenedFolder style={{ height: "2rem", width: "2rem" }} />
              <span className="ml-2">Data</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
    <div className="diff aspect-[16/9] shadow-xl">
      <div className="diff-item-1">
        <div className="glass text-primary-content grid place-content-center text-9xl font-black shadow-xl">
         
        </div>
      </div>
      <div className="diff-item-2">
        <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% grid place-content-center text-7xl font-black shadow-xl">BAR GRAPH</div>
      </div>
      <div className="diff-resizer"></div>
    </div>
  </div>
  )
}

export default Deduction;