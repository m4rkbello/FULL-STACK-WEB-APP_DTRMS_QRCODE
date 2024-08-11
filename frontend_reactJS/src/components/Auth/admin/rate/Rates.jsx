import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// REDUXISM - ACTIONS DISPATCH!
import { fetchRates, addRate, updateRate, deactivateRate, searchRates } from '../../../redux/actions/rateAction';
import { fetchDepartments } from '../../../redux/actions/departmentAction';
// ICONS
import { FcFolder, FcOpenedFolder, FcPlus, FcSalesPerformance, FcApproval, FcCancel, FcEmptyTrash, FcSearch, FcViewDetails, FcPrevious } from "react-icons/fc";
// MODALS SA RATES
import AddRateModal from '../../modals/rates/AddRateModal';
import DeactivateRateModal from '../../modals/rates/DeactivateRateModal';
// TOASTER 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Rates = (props) => {
  console.log("DATA TANAN SA RATES GLOBAL STATE", props);
  const [isAddRateDetailsModal, setIsAddRateDetailsModal] = useState(false);
  const [isDeactivateRateModal, setIsDeactivateRateModal] = useState(false);
  const [selectedRateId, setSelectedRateId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await props.fetchRates();
      } catch (error) {
        toast.error('Failed to fetch rates.');
      }
    };
    fetchData();
    props.fetchDepartments();
  }, [props.fetchRates]);

  const handleDeactivateRate = (rateId) => {
    setSelectedRateId(rateId);
    setIsDeactivateRateModal(true);
  };

  const confirmDeactivateRate = async () => {
    setIsDeactivateRateModal(false);
    try {
      await props.deactivateRate(selectedRateId);
      // Fetch updated rates after deactivation
      await props.fetchRates();
    } catch (error) {
      toast.error('Failed to deactivate rate.');
      console.log("DATA SA props", props);
    }
  };

  // Get department data
  const departmentsObjectDataCollection = props.departmentData && props.departmentData.departments?.data?.details;
  console.log("DATA SA departmentsObjectDataCollection", departmentsObjectDataCollection);

  // Function to get department name by ID
  const getDepartmentNameById = (departmentId) => {
    const department = departmentsObjectDataCollection?.find(dept => dept.id === departmentId);
    return department ? department.department_name : 'Unknown Department';
  };

  return (
    <div className='h-full max-h-full w-full max-w-full glass mx-auto p-4 shadow-slate-900/100'>
      <ToastContainer />
      <AddRateModal
        isOpen={isAddRateDetailsModal}
        onClose={() => setIsAddRateDetailsModal(false)}
      />

      <DeactivateRateModal
        isOpen={isDeactivateRateModal}
        onClose={() => setIsDeactivateRateModal(false)}
        deactivateRate={confirmDeactivateRate}
      />

      <div className="flex flex-wrap">
        <div>
          <div className="text-sm breadcrumbs mb-10 bg-transparent">
            <ul>
              <li>
                <Link to="/" className='hover:text-white'>
                  <FcPrevious
                    style={{ height: "2rem", width: "2rem" }}
                  />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/employee/dashboard" className='hover:text-white'>
                  <FcFolder
                    style={{ height: "2rem", width: "2rem" }}
                  />
                  Rates
                </Link>
              </li>
              <li>
                <Link to="" className='hover:text-white'>
                  <FcOpenedFolder style={{ height: "2rem", width: "2rem" }} />
                  Data
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-lg">
        <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
          <span className="text-4xl font-black">
            <div className='glass'>
              <div className="grid grid-cols-3 items-center mt-5">
                <div>
                  <span className="inline-grid grid-cols-3 gap-4 py-5">
                    <div className="p-3 flex justify-start">
                      <span>
                        <input
                          type="text"
                          placeholder="Search"
                          className="border-b-4 bg-transparent text-md rounded text-white"
                        />
                      </span>
                    </div>
                    <span>
                      <FcSearch />
                    </span>
                  </span>
                </div>
                <div className="pb-5 pt-5 flex justify-center">
                  RATES LIST
                </div>
                <div className="p-3 flex justify-end">
                  <FcPlus onClick={() => {
                    console.log("Opening AddRateDetailsModal");
                    setIsAddRateDetailsModal(true);
                  }} />
                </div>
              </div>
            </div>
          </span>

          <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% flex flex-col items-center justify-center">
            {props.loading ? (
              <div className="flex flex-col gap-4 w-full max-w-5xl ps-2 pe-2">
                <div className="skeleton h-48 w-full"></div>
                <div className="skeleton h-6 w-36"></div>
                <div className="skeleton h-6 w-full"></div>
                <div className="skeleton h-6 w-full"></div>
              </div>
            ) : props.ratesData?.rates && props.ratesData.rates.length > 0 ? (
              <div className="w-full max-w-5xl">
                <table className="table glass w-full border-2 border-black">
                  <thead className="text-red">
                    <tr className="md:table-row" style={{ fontSize: "17px", backgroundColor: 'black', color: "white" }}>
                      <th className="md:table-cell text-white"></th>
                      <th className="md:table-cell text-white">NAME</th>
                      <th className="md:table-cell text-white">AMOUNT</th>
                      <th className="md:table-cell text-white">DETAILS</th>
                      <th className="md:table-cell text-white">DESCRIPTION</th>
                      <th className="md:table-cell text-white">DEPARTMENT</th>
                      <th className="md:table-cell text-white">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className='text-black'>
                    {props.ratesData.rates.map((item) => (
                      item.rate_status_id !== 0 && (
                        <tr className="md:table-row" key={item.id}>
                          <td className="md:table-cell"><FcSalesPerformance style={{ fontSize: "40px", color: "transparent" }} /></td>
                          <td className="md:table-cell">{item.rate_name}</td>
                          <td className="md:table-cell">
                            <span>&#8369;</span>
                            <b>{item.rate_amount_per_day}</b>
                          </td>
                          <td className="md:table-cell">{item.rate_details}</td>
                          <td className="md:table-cell">{item.rate_description}</td>
                          <td className="md:table-cell text-center">
                            {getDepartmentNameById(item.rate_department_id)}
                          </td>
                          <td className="md:table-cell">
                            <div className="flex items-center space-x-2">
                              <FcViewDetails style={{ fontSize: "30px" }} />
                              <FcEmptyTrash
                                onClick={() => handleDeactivateRate(item.id)}
                                style={{ fontSize: "30px" }}
                              />
                            </div>
                          </td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>No rates available</div>
            )}
          </div>


        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ratesData: state.rateState,
    loading: state.rateState.loading,
    departmentData: state.departmentState,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRates: () => dispatch(fetchRates()),
    addRate: (AddRateData) => dispatch(addRate(AddRateData)),
    updateRate: (UpdateRateData) => dispatch(updateRate(UpdateRateData)),
    deactivateRate: (RateId) => dispatch(deactivateRate(RateId)),
    fetchDepartments: () => dispatch(fetchDepartments()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Rates);
