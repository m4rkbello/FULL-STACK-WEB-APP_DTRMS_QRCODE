/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { defer, Link, useParams } from 'react-router-dom';
//ICONS
import { FcFolder, FcOpenedFolder, FcPlus, FcSalesPerformance, FcSearch, FcPrevious, FcViewDetails, FcEmptyTrash, FcNext } from "react-icons/fc";
//REDUXISM
import { fetchAttendances } from '../../../actions/redux/attendanceAction';
//MODALS
import AddRateModal from '../../modals/rates/AddRateModal';
import DeactivateRateModal from '../../modals/rates/DeactivateRateModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeAttendance = () => {
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
    
    </div>


  );
};


const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return{

  }
}


export default  connect(mapStateToProps, mapDispatchToProps)(EmployeeAttendance);