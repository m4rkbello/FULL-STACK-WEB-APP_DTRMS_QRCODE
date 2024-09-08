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
import { fetchAttendances } from '../../../redux/actions/attendanceAction';
//TOASTER
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//DISTRUCTURING
const EditPayroll = ({ fetchPayrolls, fetchRates, fetchDepartments, fetchOvertimes, fetchDeductions, fetchEmployees, fetchAttendances, payrollData, userData, rateData, departmentData, overtimeData, deductionData, attendanceData, updateRate, loading }) => {
  //id sa rate.id
  const { payrollId } = useParams();
  console.log("DATA sa payrollId", payrollId);

  const [formDataUpdatePayroll, setFormDataUpdatePayroll] = useState(null);

  console.log("DATA SA payroll", payrollData);
  console.log("DATA SA rateData", rateData);
  console.log("DATA SA ATTENDANCE", attendanceData);

  useEffect(() => {
    fetchPayrolls();
    fetchEmployees();
    fetchRates();
    fetchDepartments();
    fetchOvertimes();
    fetchDeductions();
    fetchAttendances();
  }, [fetchPayrolls, fetchEmployees, fetchRates, fetchDepartments, fetchOvertimes, fetchDeductions, fetchAttendances]);

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
      console.log("DATA SA error handleSubmitUpdateRate", error);
    }
  };

  const attendanceDataObjectCollection = attendanceData && attendanceData?.attendances && attendanceData?.attendances?.data?.details;
  console.log("attendanceDataObjectCollection:", attendanceDataObjectCollection);

  const getAllAttendanceById = (payrollId, attendanceDataObjectCollection) => {
    return attendanceDataObjectCollection.filter(item => item.attendance_employee_id == payrollId);
  };

  const filteredEmployeeAttendances = getAllAttendanceById(payrollId, attendanceDataObjectCollection);
  console.log("DATA SA LINE 82 filteredEmployeeAttendances", filteredEmployeeAttendances);

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
              <Link to="/admin/payrollemployee/dashboard" className='flex items-center hover:text-white'>
                <FcFolder style={{ height: "2rem", width: "2rem" }} />
                <span className="ml-2">Payroll</span>
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

            </span>
          </div>
          <div className="pb-5 pt-5 flex justify-center">
            <h3 className="font-bold text-4xl text-black">EMPLOYEE PAYROLLS</h3>
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
      ) :  (
        <div className='w-full max-w-full glass mx-auto'>

        <div className="hero bg-b min-h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%" style={{ background: 'linear-gradient(90deg, #213A5757, #0B6477, #14919B, #45DFB1, #80ED99)' }}>
                <div className="hero-content flex-col lg:flex-row">
                <img
                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                className="max-w-sm rounded-lg shadow-2xl" />
                <div className="avatar">
  <div className="ring-primary ring-offset-base-100 w-48 rounded-full ring ring-offset-2">
    <img src="https://i.ibb.co/xL6Mbx0/m4rk.png" />
  </div>
</div>
                <div>
                <h1 className="text-5xl font-bold">TEST</h1>
                <p className="py-3">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                quasi. In deleniti eaque aut repudiandae et a id nisi.
                </p>
                <button className="btn btn-primary">Get Started</button>
                </div>
                </div>
                </div>

<br />
          <div role="tablist" className="tabs tabs-lifted tabs-lg">
            <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="ATTENDANCE" />
            <div role="tabpanel" className="tab-content glass rounded-box p-6">
              <div className="overflow-x-auto">
                <table className="table bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%" >
                  <thead className='bg-black text-white'>
                    <tr>
                      <th></th>
                      <th>ATTENDANCE DATA</th>
                      <th>ATTENDANCE TIME-IN</th>
                      <th>ATTENDANCE TIME-OUT</th>
                      <th>ATTENDANCE BY</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployeeAttendances.map(item => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          {item.attendance_note}
                        </td>
                        <td>{item.attendance_time_in}</td>
                        <td>{item.attendance_time_out}</td>
                        <td>{item.employee_fullname}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label="RATE"
              checked="checked" />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">

            </div>
            <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="OVERTIME" />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
              Tab content 3
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 my-10">
            <div className="artboard glass phone-3">414×736</div>
            <div className="artboard glass phone-3">414×736</div>
            <div className="artboard glass artboard-horizontal phone-3">736×414</div>
          </div>
        </div>
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
    attendanceData: state.attendanceState,
    loading: state.payrollState.loading,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPayrolls: () => dispatch(fetchPayrolls()),
    fetchEmployees: () => dispatch(fetchEmployees()),
    fetchRates: () => dispatch(fetchRates()),
    fetchDepartments: () => dispatch(fetchDepartments()),
    fetchDeductions: () => dispatch(fetchDeductions()),
    fetchOvertimes: () => dispatch(fetchOvertimes()),
    fetchAttendances: () => dispatch(fetchAttendances()),
    addPayroll: (AddPayrollData) => dispatch(addPayroll(AddPayrollData)),
    updatePayroll: (payrollId, updatePayrollData) => dispatch(updatePayroll(payrollId, updatePayrollData)),
    deactivatePayroll: (payrollId) => dispatch(deactivatePayroll(payrollId)),
    searchPayroll: (searchPayroll) => dispatch((searchPayroll(searchPayroll))),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(EditPayroll);
