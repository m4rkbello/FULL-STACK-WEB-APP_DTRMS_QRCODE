/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
// ICONS
import { FcFolder, FcOpenedFolder, FcPrevious, FcOk, FcCancel, FcSearch, FcPlus } from "react-icons/fc";
// REDUXISM
import { fetchPayrolls, addPayroll, updatePayroll, deactivatePayroll, searchPayroll } from '../../../redux/actions/payrollAction';
import { fetchEmployees } from '../../../redux/actions/employeeAction';
import { fetchRates } from '../../../redux/actions/rateAction';
import { fetchDepartments } from '../../../redux/actions/departmentAction';
import { fetchOvertimes } from '../../../redux/actions/overtimeAction';
import { fetchDeductions } from '../../../redux/actions/deductionAction';
//TOASTER
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//DISTRUCTURING
const EditPayroll = ({ fetchPayrolls, fetchRates, fetchDepartments, fetchOvertimes, fetchDeductions, fetchEmployees, payrollData, userData, rateData, departmentData, overtimeData, deductionData, updateRate, loading }) => {
  //id sa rate.id
  const { payrollId } = useParams();
  console.log("DATA sa payrollId", payrollId );


  const [formDataUpdatePayroll, setFormDataUpdatePayroll] = useState(null);

  console.log("DATA SA payroll", payrollData);

  useEffect(() => {
    fetchPayrolls();
    fetchEmployees();
    fetchRates();
    fetchDepartments();
    fetchOvertimes();
    fetchDeductions();
  }, [fetchPayrolls,fetchEmployees, fetchRates, fetchDepartments, fetchOvertimes, fetchDeductions]);

  useEffect(() => {
    if (payrollData && payrollData.payrolls && payrollData.payrolls.data && payrollData.payrolls.data.details && !loading) {
      const payrollItems = payrollData.payrolls.data.details.find(payroll => payroll.id === parseInt(payrollId, 10));
      if (payrollItems) {
        setFormDataUpdatePayroll(payrollItems);
      } else {
        setFormDataUpdatePayroll(null);
      }
    }
  }, [payrollData, payrollId, loading]);
  

  const handleChange = (e) => {
    setFormDataUpdatePayroll({
      ...formDataUpdatePayroll,
      [e.target.name]: e.target.value,
    });
  };

  //function para e update ang data
  const handleSubmitUpdatePayroll = async (e) => {
    e.preventDefault();
    try {
      await updatePayroll(payrollId, formDataUpdatePayroll);
    } catch (error) {
      console.log("DATA SA error handleSubmitUpdateRate",error);
    }
  };


  return (
    <div className='h-full max-h-full w-full max-w-full glass mx-auto p-4 shadow-slate-900/100 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg'>
      <ToastContainer />
      <div className="flex flex-col bg-transparent mb-10 shadow-slate-900/100">
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
                <FcFolder style={{ height: "2rem", width: "2rem" }} />
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

      <div className='glass shadow-slate-900/100'>
        <div className="grid grid-cols-3 items-center mt-10 mb-10 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg">
          <div>
            <span className="inline-grid grid-cols-3 gap-4 py-5">
              <div className="p-3 flex justify-start">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-b-4 bg-transparent text-md rounded text-black custom-placeholder-text-color"
                />
              </div>
              <div className="p-3 flex justify-end">
                <FcSearch style={{ height: "2rem", width: "2rem" }} />
              </div>
            </span>
          </div>
          <div className="pb-5 pt-5 flex justify-center">
            <h3 className="font-bold text-4xl text-black">UPDATE PAYROLLS</h3>
          </div>
          <div className="p-3 flex justify-end">
            <FcPlus
              style={{ height: "3rem", width: "3rem" }}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col gap-4 w-full m-30 max-w-5xl ps-2 pe-2 mt-30 mb-30">
          <div className="skeleton h-48 w-full"></div>
          <div className="skeleton h-6 w-36"></div>
          <div className="skeleton h-6 w-full"></div>
          <div className="skeleton h-6 w-full"></div>
        </div>

      ) : !formDataUpdatePayroll ? (
        <div className="w-full max-w-5xl text-center text-lg font-semibold text-gray-500">
          <div className="mockup-browser  border border-t-4 pb-10 pt-10">
            <div className="mockup-browser-toolbar">
              <div className="input text-black-400">https://markbello.com</div>
            </div>
            <div className="flex justify-center text-black px-4 py-16 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
              <span
                style={{ fontSize: '30px', fontWeight: 'Bolder' }}
              >
                <b>
                  AYAW NA PANGITAA ANG WALA!
                </b>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmitUpdatePayroll}>
          <div className="grid grid-cols-2 gap-6 my-10">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black text-2xl">Rate Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered shadow-2xl glass text-2xl text-black border-1 border-glass rounded-se-3xl shadow-slate-900/100 custom-placeholder-text-color"
                style={{ backgroundColor: 'transparent', color: "black", border: "none" }}
                name="rate_name"
                value={formDataUpdatePayroll?.payroll_total_amount || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-black text-2xl">Rate Amount</span>
              </label>
              <input
                type="text"
                className="input input-bordered shadow-2xl glass text-2xl text-black border-1 border-glass rounded-se-3xl shadow-slate-900/100 custom-placeholder-text-color"
                name="rate_amount_per_day"
                value={formDataUpdatePayroll?.payroll_total_amount || ''}
                onChange={handleChange}
                style={{ backgroundColor: 'transparent', color: "black", border: "none" }}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-black text-2xl">Rate Details</span>
              </label>
              <input
                type="text"
                className="input input-bordered shadow-2xl glass text-2xl text-black border-1 border-glass rounded-se-3xl shadow-slate-900/100 custom-placeholder-text-color"
                name="rate_details"
                value={formDataUpdatePayroll?.payroll_total_amount || ''}
                onChange={handleChange}
                style={{ backgroundColor: 'transparent', color: "black", border: "none" }}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-black text-2xl">Rate Description</span>
              </label>
              <input
                type="text"
                className="input input-bordered shadow-2xl glass text-2xl text-black border-1 border-glass rounded-se-3xl shadow-slate-900/100 custom-placeholder-text-color"
                name="rate_description"
                value={formDataUpdatePayroll?.payroll_total_amount || ''}
                onChange={handleChange}
                style={{ backgroundColor: 'transparent', color: "black", border: "none" }}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-black text-2xl">Rate Department</span>
              </label>
              <select
                name="rate_department_id"
                value={formDataUpdatePayroll?.payroll_total_amount || ''}
                onChange={handleChange}
                className="input input-bordered shadow-2xl glass text-2xl text-black border-1 border-glass rounded-se-3xl shadow-slate-900/100 custom-placeholder-text-color"
              >
                <option value="">Select Department</option>
                {/***
                  
                  {departmentsCollection.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.department_name}
                    </option>
                  ))}
                  */}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-glass text-2xl">Rate Status</span>
              </label>
              <select
                name="rate_status_id"
                value={formDataUpdatePayroll?.payroll_total_amount || '1'}
                onChange={handleChange}
                className="input input-bordered shadow-2xl glass text-2xl text-black border-1 border-glass rounded-se-3xl shadow-slate-900/100 custom-placeholder-text-color"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>

          </div>
          <br />
          <div className="flex">
          <div className='mx-1'>
            <button
            type="submit"
            className="btn glass hover:text-white hover:bg-indigo-400"
            style={{ fontSize: "40px", color: "transparent", border: "none", backgroundColor: "transparent" }}
            >
            <FcOk style={{ fontSize: "40px", color: "transparent" }} className='text-black hover:text-black' />
            </button>
            </div>
            <div className='mx-1'>
            <Link to="/admin/rates">
                <button
                className="btn glass hover:text-white hover:bg-indigo-400"
                style={{ fontSize: "40px", color: "transparent", border: "none", backgroundColor: "transparent" }}
                >
                <FcCancel style={{ fontSize: "40px", color: "transparent" }} className='text-black hover:text-black' />
              </button>
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    payrollData: state.payrollState,
    userData: state.userState,
    rateData: state.rateState,
    departmentData: state.departmentState,
    overtimeData: state.overtimeState,
    deductionData: state.deductionState,
    loading: state.payrollState.loading,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPayrolls: () => dispatch(fetchPayrolls()),
    fetchEmployees: () => dispatch(fetchEmployees()),
    fetchRates: () => dispatch(fetchRates()),
    fetchDepartments: () => dispatch(fetchDepartments()),
    fetchDeductions:  () => dispatch(fetchDeductions()),
    fetchOvertimes: () => dispatch(fetchOvertimes()),
    addPayroll: (AddPayrollData) => dispatch(addPayroll(AddPayrollData)),
    updatePayroll: (payrollId, updatePayrollData) => dispatch(updatePayroll(payrollId, updatePayrollData)),
    deactivatePayroll: (payrollId) => dispatch(deactivatePayroll(payrollId)),
    searchPayroll: (searchPayroll) => dispatch((searchPayroll(searchPayroll))),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(EditPayroll);
