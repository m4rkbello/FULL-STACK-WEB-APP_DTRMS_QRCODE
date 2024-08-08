/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
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
import { MoveLeft, FolderOpen, Component } from 'lucide-react';



const Payroll = () => {

  return (
    <div className='h-full max-h-full w-full max-w-full glass mx-auto p-4 '>
      <div className="flex flex-wrap">
        <div>
          <div className="text-sm breadcrumbs mb-10 bg-transparent">
            <ul>
              <li>
                <MoveLeft />
                <Link to="/" className='hover:text-white'>Home</Link>
              </li>
              <li>
                <FolderOpen />
                <Link to="/employee/dashboard" className='hover:text-white'>Payrolls</Link>
              </li>
              <li>
                <span className="inline-flex gap-2 items-center">
                  <Component />
                  <Link to="" className='hover:text-white'>Payrolls Data</Link>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payroll;