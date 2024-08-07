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
      <div className="flex flex-wrap">
        <div>
          <div className="text-sm breadcrumbs mb-10 bg-transparent">
            <ul>
              <li>
                <FcFolder
                  style={{

                    boxShadow: "0 10px 15px rgba(4, 4, 4, 0.23)",
                  }}
                />
                <Link to="/" className='hover:text-white'>Home</Link>
              </li>
              <li>
                <FcFolder
                  style={{

                    boxShadow: "0 10px 15px rgba(4, 4, 4, 0.23)",
                  }}
                />
                <Link to="/employee/dashboard" className='hover:text-white'>Employee Dashboard</Link>
              </li>
              <li>
                <span className="inline-flex gap-2 items-center">
                  <FcFile
                    style={{

                      boxShadow: "0 10px 15px rgba(4, 4, 4, 0.23)",
                    }}
                  />
                  <Link to="" className='hover:text-white'>Employee Personal Details</Link>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overtime