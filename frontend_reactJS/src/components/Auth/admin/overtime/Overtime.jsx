/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa6";
import { MdAutoDelete } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { HiStatusOnline } from "react-icons/hi";
import { MdOutlineNoAccounts } from "react-icons/md";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";
import { FaUserEdit, FaSave, FaLongArrowAltLeft } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { SiMicrosoftexcel } from "react-icons/si";
import { IoIosPrint } from "react-icons/io";
import { FcPrint, FcDataSheet, FcPlus, FcSearch, FcFolder, FcFile, FcCheckmark, FcViewDetails, FcEmptyTrash, FcCancel } from "react-icons/fc";
//REDUX-ACTION-DISPATCH

const Overtime = () => {
  return (
    <div className='h-full max-h-full w-full max-w-full glass mx-auto p-4 '>
      <div className="hero" style={{ backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)", }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overtime