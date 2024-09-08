/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
//ICONS
import { FcFolder, FcOpenedFolder, FcPrint, FcDataSheet, FcPlus, FcSalesPerformance, FcSearch, FcPrevious, FcViewDetails, FcEmptyTrash, FcNext } from "react-icons/fc";
//REDUXISM
import { fetchPayrolls, addPayroll, updatePayroll, deactivatePayroll, searchPayroll } from '../../../redux/actions/payrollAction';
import { fetchEmployees } from '../../../redux/actions/employeeAction';
import { fetchRates } from '../../../redux/actions/rateAction';
import { fetchDepartments } from '../../../redux/actions/departmentAction';
import { fetchOvertimes } from '../../../redux/actions/overtimeAction';
import { fetchDeductions } from '../../../redux/actions/deductionAction';
//COMPONENT
import EditPayroll from './EditPayroll';
//MODALS
import AddPayrollModal from '../../modals/payrolls/AddPayrollModal';
import DeactivatePayrollModal from '../../modals/payrolls/DeactivatePayrollModal';
//TOASTERS
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Payroll = (props) => {
  const [isAddPayrollDetailsModal, setIsAddPayrollDetailsModal] = useState(false);
  const [isDeactivatePayrollModal, setIsDeactivatePayrollModal] = useState(false);
  const [selectedPayrollId, setSelectedPayrollId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  console.log("DATA SA PAYROLL props", props);

  //id sa rate.id para gamiton sa useParams
  const { payrollId } = useParams();

  useEffect(() => {
    const fetchDataPayrolls = async () => {
      try {
        await props.fetchPayrolls();
        props.fetchDepartments();
        props.fetchEmployees();
        props.fetchRates();
        props.fetchOvertimes();
        props.fetchDeductions();
      } catch (error) {
        toast.error('Failed to fetch rates.');
      }
    };
    fetchDataPayrolls();
  }, [props.fetchPayrolls]);

  const handleDeactivateRate = (payrollId) => {
    setSelectedPayrollId(payrollId);
    setIsDeactivatePayrollModal(true);
  };

  const confirmDeactivatePayroll = async () => {
    setIsDeactivatePayrollModal(false);
    try {
      await props.deactivateRate(payrollId);
      await props.fetchRates();
    } catch (error) {
      toast.error('Failed to deactivate rate.');
    }
  };

  // Handle search and data filtering
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
    props.searchPayroll(e.target.value);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

    // Filter and paginate payments
    const filteredPayrolls = props.payrollData?.payrolls?.data?.details?.filter((payrollItem) =>
      (payrollItem?.payroll_details?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       payrollItem?.employee_name?.toLowerCase().includes(searchQuery.toLowerCase()))
    ) || [];
    
//filter without load purposes
  const indexOfLastRate = currentPage * itemsPerPage;
  const indexOfFirstRate = indexOfLastRate - itemsPerPage;
  const currentPayrolls = filteredPayrolls?.slice(indexOfFirstRate, indexOfLastRate);
  const totalPages = Math.ceil(filteredPayrolls.length / itemsPerPage);

  return (
    <div className='h-full max-h-full w-full max-w-full glass mx-auto p-4 shadow-slate-900/100 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg'>
      <ToastContainer />
      {/**modal sa addModal rate */}
      <AddPayrollModal
        isOpen={isAddPayrollDetailsModal}
        onClose={() => setIsAddPayrollDetailsModal(false)}
      />
      {/**modal sa deactivate rate */}
      <DeactivatePayrollModal
        isOpen={isDeactivatePayrollModal}
        onClose={() => setIsDeactivatePayrollModal(false)}
        deactivatePayroll={confirmDeactivatePayroll}
      />

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
              <Link to="/admin/payrolls" className='flex items-center hover:text-white'>
                <FcFolder 
                style={{ height: "2rem", width: "2rem" }} />
                <span className="ml-2">Payrolls</span>
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

      <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg">
        <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg">

          <div className='glass shadow-slate-900/100'>
            <div className="grid grid-cols-3 items-center mt-10 mb-10 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg">
              <div>
                <span className="inline-grid grid-cols-3 gap-4 py-5">
                  <div className="p-3 flex justify-start">
                    <input
                      type="text"
                      placeholder="Search Name..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="border-b-4 bg-transparent text-md rounded text-black custom-placeholder-text-color"
                    />
                  </div>
                  <div className="p-3 flex justify-end">
                    <FcSearch style={{ height: "2rem", width: "2rem" }} />
                  </div>
                </span>
              </div>
              <div className="pb-5 pt-5 flex justify-center">
                <h3 className="font-bold text-4xl text-black">PAYROLL EMPLOYEE LIST</h3>
              </div>
              <div className="p-3 flex justify-end">
                <FcPlus onClick={() => {
                  setIsAddPayrollDetailsModal(true);
                }}
                  style={{ height: "2rem", width: "2rem" }}
                />

          
                {/***
                  
                  <DownloadTableExcel
                      filename="ExportEmployee"
                      sheet="users"
                      currentTableRef={tableRef.current}
                  >
                  </DownloadTableExcel>
                  */}
                <button>
                    <FcDataSheet
                    style={{ height: "2rem", width: "2rem" }}
                    /></button>
            <button 
            // onClick={printEmployeeDashboard}
            >
                <FcPrint
                style={{ height: "2rem", width: "2rem" }}
                />
            </button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 flex flex-col items-center justify-center">
            {props.loading ? (
              <div className="flex flex-col gap-4 w-full max-w-5xl ps-2 pe-2 mt-48 mb-48">
                <div className="skeleton h-48 w-full"></div>
                <div className="skeleton h-6 w-36"></div>
                <div className="skeleton h-6 w-full"></div>
                <div className="skeleton h-6 w-full"></div>
              </div>
            ) : filteredPayrolls.length === 0 ? (
              <div className="mockup-browser bg-base-300 border mt-48 mb-48">
                <div className="mockup-browser-toolbar">
                  <div className="input">https://markbello.website</div>
                </div>
                <div className="bg-base-200 flex justify-center px-4 py-16">        <span
                  style={{ fontSize: '30px', fontWeight: 'Bolder' }}
                >
                  <b>
                    AYAW NA PANGITAA ANG <u>{searchQuery}</u> KAY WALA!
                  </b>
                </span></div>
              </div>
            ) : currentPayrolls?.length > 0 ? (
              <div className="w-full max-w-5xl">
                <table className="table glass w-full border-2 border-black">
                  <thead className="text-red">
                    <tr className="md:table-row" style={{ fontSize: "17px", backgroundColor: 'black', color: "white" }}>
                      <th className="md:table-cell text-white">FULLNAME</th>
                      <th className="md:table-cell text-white">PAYROLL</th>
                      <th className="md:table-cell text-white">DETAILS</th>
        
                      <th className="md:table-cell text-white">DEPARTMENT</th>
                      <th className="md:table-cell text-white">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className='text-black'>
                    {currentPayrolls.map((item) => (
                   
                      item.payroll_status_id !== 0 && (
                        
                        <tr className="md:table-row" key={item.id}>
                          <td className="md:table-cell">{item.employee_fullname.toUpperCase()}</td>
                          <td className="md:table-cell">
                            <span>&#8369;</span>
                            <b>{item.payroll_total_amount}</b>
                          </td>
                          <td className="md:table-cell">{item.payroll_details.toUpperCase()}</td>
                       
                          <td className="md:table-cell text-center">
                           {item.department_name.toUpperCase()}
                          </td>
                          <td className="md:table-cell">
                            <div className="flex items-center space-x-2">
                              <Link to={`/admin/payroll/edit/${item.payroll_employee_id}`}>
                                <FcViewDetails
                                  style={{ height: "2rem", width: "2rem" }}
                                />
                              </Link>

                              <FcEmptyTrash
                                onClick={() => handleDeactivateRate(item.id)}
                                style={{ height: "2rem", width: "2rem" }}
                              />
                            </div>
                          </td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-center mt-4 mb-4">
                  <div className="join grid grid-cols-2">
                    <button
                      className="join-item btn btn-outline  glass"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <FcPrevious
                        style={{ height: "2rem", width: "2rem" }}
                      /> Previous
                    </button>
                    <button
                      className="join-item btn btn-outline glass"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <FcNext
                        style={{ height: "2rem", width: "2rem" }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ) : (

              <div className="mockup-browser  border border-t-4 pb-10 pt-10">
                <div className="mockup-browser-toolbar">
                  <div className="input text-black-400">https://markbello.com</div>
                </div>
                <div className="flex justify-center px-4 py-16 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                  <span
                    style={{ fontSize: '50px', fontWeightL: 'Bolder' }}
                  >
                    <b>
                      AYAW NA PANGITAA ANG WALA!
                    </b>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Payroll);
