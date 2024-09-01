/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
//ICONS
import { FcFolder, FcOpenedFolder, FcPlus, FcSalesPerformance, FcDepartment, FcSearch, FcPrevious, FcViewDetails, FcEmptyTrash, FcNext } from "react-icons/fc";
//REDUXISM
import { fetchDepartments, addDepartment, updateDepartment, deactivateDepartment, searchDepartments } from '../../../redux/actions/departmentAction';
//COMPONENT
import EditDepartment from './EditDepartment';
//MODALS
import AddDepartmentModal from '../../modals/departments/AddDepartmentModal';
import DeactivateDepartmentModal from '../../modals/departments/DeactivateDepartmentModal';
//TOSTER
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Departments = (props) => {
  console.log("data sa props", props);
  const [isAddDepartmentDetailsModal, setIsAddDepartmentDetailsModal] = useState(false);
  const [isDeactivateDepartmentModal, setIsDeactivateDepartmentModal] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  //id sa rate.id para gamiton sa useParams
  const { departmentId } = useParams();

  console.log("DATA SA departmentId", departmentId);

  useEffect(() => {
    props.fetchDepartments();
  }, [props.fetchDepartments]);

  const handleDeactivateDepartment = (departmentId) => {
    setSelectedDepartmentId(departmentId);
    setIsDeactivateDepartmentModal(true);
  };

  const confirmDeactivateDepartment = async () => {
    setIsDeactivateDepartmentModal(false);
    try {
      await props.deactivateDepartment(selectedDepartmentId);
      await props.fetchDepartments();
    } catch (error) {
      toast.error('Failed to deactivate rate.');
    }
  };

  // Handle search and data filtering
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
    props.searchDepartments(e.target.value); // This should update Redux state
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter and paginate rates
  const departmentsInvoke = props.departmentData?.departments.data?.details || [];

  const filteredDepartments = departmentsInvoke.filter(department =>
    department.department_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("Filtered Departments", filteredDepartments);

  const indexOfLastRate = currentPage * itemsPerPage;
  const indexOfFirstRate = indexOfLastRate - itemsPerPage;
  const currentDepartments = filteredDepartments?.slice(indexOfFirstRate, indexOfLastRate);

  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);


console.log("Search Query:", searchQuery);
console.log("Departments Data:", departmentsInvoke);
console.log("Filtered Departments:", filteredDepartments);
console.log("Current Departments:", currentDepartments);

  return (
    <div className='h-full max-h-full w-full max-w-full glass mx-auto p-4 shadow-slate-900/100 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg'>
      <ToastContainer />
      {/**modal sa addModal rate */}
      <AddDepartmentModal
        isOpen={isAddDepartmentDetailsModal}
        onClose={() => setIsAddDepartmentDetailsModal(false)}
      />
      {/**modal sa deactivate rate */}
      <DeactivateDepartmentModal
        isOpen={isDeactivateDepartmentModal}
        onClose={() => setIsDeactivateDepartmentModal(false)}
        deactivateRate={confirmDeactivateDepartment}
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
              <Link to="/admin/departments" className='flex items-center hover:text-white'>
                <FcFolder
                  style={{ height: "2rem", width: "2rem" }} />
                <span className="ml-2">Departments</span>
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
                      placeholder="Search Department"
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
                <h3 className="font-bold text-4xl text-black">DEPARTMENT LIST</h3>
              </div>
              <div className="p-3 flex justify-end">
                <FcPlus onClick={() => {
                  setIsAddDepartmentDetailsModal(true);
                }}
                  style={{ height: "3rem", width: "3rem" }}
                />
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
            ) : filteredDepartments.length === 0 ? (
              <div className="mockup-browser bg-base-300 border mt-48 mb-48">
                <div className="mockup-browser-toolbar">
                  <div className="input">https://daisyui.com</div>
                </div>
                <div className="bg-base-200 flex justify-center px-4 py-16">        <span
                  style={{ fontSize: '30px', fontWeight: 'Bolder' }}
                >
                  <b>
                    AYAW NA PANGITAA ANG <u>
                      {searchQuery}
                    </u> KAY WALA!
                  </b>
                </span></div>
              </div>
            ) : currentDepartments?.length > 0 ? (
              <div className="w-full max-w-5xl">
                <table className="table glass w-full border-2 border-black">
                  <thead className="text-red">
                    <tr className="md:table-row" style={{ fontSize: "17px", backgroundColor: 'black', color: "white" }}>
                      <th className="md:table-cell text-white"></th>
                      <th className="md:table-cell text-white">NAME</th>
                      <th className="md:table-cell text-white">DESCRIPTION</th>
                      <th className="md:table-cell text-white">STATUS</th>
                      <th className="md:table-cell text-white">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className='text-black'>
                    {currentDepartments.map((item) => (
                      item.department_status_id !== 0 && (
                        <tr className="md:table-row"
                          key={item.id}
                        >
                          <td className="md:table-cell"><FcDepartment style={{ fontSize: "40px", color: "transparent" }} /></td>
                          <td className="md:table-cell">
                            {item.department_name}
                          </td>
                          <td className="md:table-cell">
                            <span>&#8369;</span>
                            {item.department_description}
                          </td>
                          <td className="md:table-cell text-center">
                            {item.department_status_id}
                          </td>
                          <td className="md:table-cell">
                            <div className="flex items-center space-x-2">
                              <Link to={`/admin/department/edit/${item.id}`}>
                                <FcViewDetails
                                  style={{ height: "2rem", width: "2rem" }}
                                />
                              </Link>
                              <FcEmptyTrash
                                onClick={() => handleDeactivateDepartment(item.id)}
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
                    <button className="join-item btn btn-outline  glass"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <FcPrevious
                        style={{ height: "2rem", width: "2rem" }}
                      /> Previous
                    </button>
                    <button className="join-item btn btn-outline glass"
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
    departmentData: state.departmentState,
    loading: state.departmentState.loading,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDepartments: () => dispatch(fetchDepartments()),
    addDepartment: (departmentData) => dispatch(addDepartment(departmentData)),
    updateDepartment: (updateDepartmentData) => dispatch(updateDepartment(updateDepartmentData)),
    deactivateDepartment: (departmentId) => dispatch(deactivateDepartment(departmentId)),
    searchDepartments: (query) => dispatch(searchDepartments(query)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Departments);
