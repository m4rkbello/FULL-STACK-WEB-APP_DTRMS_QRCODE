/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
//REDUXISM
import { fetchDeductions, addDeduction, updateDeduction, deactivateDeduction, searchDeduction } from '../../../redux/actions/deductionAction';
//DEDUCTIONS MODALS
import AddDeductionModal from '../../modals/deductions/AddDeductionModal';
import DeactivateDeductionModal from '../../modals/deductions/DeactivateDeductionModal';
//ICONS
import { FcFolder, FcOpenedFolder, FcPlus, FcSalesPerformance, FcOvertime, FcDebt, FcSearch, FcPrevious, FcViewDetails, FcEmptyTrash, FcNext } from "react-icons/fc";
//TOASTER
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Deduction = (props) => {
  
  //deduction.id gamit useParams / matchParams
  const { deductionId } = useParams;
  console.log("ID SA deductionId", deductionId);

  //DEDUCTIONS USESTATES
  const [isAddDeductionDetailsModal, setIsAddDeductionDetailsModal] = useState(false);
  const [isDeactivateDeductionModal, setIsDeactivateDeductionModal] = useState(false);
  const [selectedDeductionId, setSelectedDeductionId] = useState(null);
  const [searchQueryDeduction, setSearchQueryDeduction] = useState('');
  const [currentPageDeduction, setCurrentPageDeduction] = useState(1);
  const [itemsPerPageDeduction, setItemsPerPageDeduction] = useState(10);

  useEffect(() => {
    props.fetchDeductions();
  }, []);

  // Handle search and data filtering
  const handleSearchChange = (e) => {
    setSearchQueryDeduction(e.target.value);
    setCurrentPageDeduction(1);
    props.searchDeduction(e.target.value);
  };

  // Handle page change para magchange!
  const handlePageChange = (pageNumber) => {
    setCurrentPageDeduction(pageNumber);
  };

  //DATA DISPLAY SA TABLE UG GIGAMIT PUD SA FILTER SEARCH
  const filteredDeductions = props.deductionData?.deductions?.data?.details?.filter(deductionItem =>
    deductionItem.deduction_name.toLowerCase().includes(searchQueryDeduction.toLowerCase())
  ) || [];

  //PARA SA SEARCH UG PAGINATION
  const indexOfLastRate = currentPageDeduction * itemsPerPageDeduction;
  const indexOfFirstRate = indexOfLastRate - itemsPerPageDeduction;
  const currentDeductions = filteredDeductions?.slice(indexOfFirstRate, indexOfLastRate);
  const totalPages = Math.ceil(filteredDeductions.length / itemsPerPageDeduction);

    //PAG DEACTIVATE SA ACCOUNT 
    const handleDeactivateRate = (deductionId) => {
      setSelectedDeductionId(deductionId);
      setIsDeactivateDeductionModal(true);
    };

  const confirmDeactivateDeduction = async () => {
    setIsDeactivateDeductionModal(false);
    try {
      await props.deactivateDeduction(selectedDeductionId);  // Use the selected ID here
      await props.fetchDeductions();
    } catch (error) {
      toast.error('Failed to deactivate deduction.');
    }
  };

  return (
    <div className='h-full max-h-full w-full max-w-full glass mx-auto p-4 shadow-slate-900/100 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg'>

      <AddDeductionModal
        isOpen={isAddDeductionDetailsModal}
        onClose={() => setIsAddDeductionDetailsModal(false)}
        addDeduction={props.addDeduction}
        fetchDeductions={props.fetchDeductions}
      />

      <DeactivateDeductionModal
      isOpen={isDeactivateDeductionModal}
      onClose={() => setIsDeactivateDeductionModal(false)}
      deactivateDeduction={confirmDeactivateDeduction}
      deductionId={selectedDeductionId}
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
              <Link to="/admin/overtimes" className='flex items-center hover:text-white'>
                <FcFolder
                  style={{ height: "2rem", width: "2rem" }} />
                <span className="ml-2">Overtimes</span>
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
        <ToastContainer />
        <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg">
          <div className='glass shadow-slate-900/100'>
            <div className="grid grid-cols-3 items-center mt-10 mb-10 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg">
              <div>
                <span className="inline-grid grid-cols-3 gap-4 py-5">
                  <div className="p-3 flex justify-start">
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchQueryDeduction} // Bind value to the state
                      onChange={handleSearchChange} // Call search handler on change
                      className="border-b-4 bg-transparent text-md rounded text-black custom-placeholder-text-color"
                    />
                  </div>
                  <div className="p-3 flex justify-end">
                    <FcSearch 
                    style={{ height: "2rem", width: "2rem" }} />
                  </div>
                </span>
              </div>
              <div className="pb-5 pt-5 flex justify-center">
                <h3 className="font-bold text-4xl text-black">DEDUCTION LIST</h3>
              </div>
              <div className="p-3 flex justify-end">
                <FcPlus
                onClick={() => {
                  setIsAddDeductionDetailsModal(true);
                }}
                
                  style={{ height: "3rem", width: "3rem" }}
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 flex flex-col items-center justify-center">
            {props.loading && props.loading ? (
              <div className="flex flex-col gap-4 w-full max-w-5xl ps-2 pe-2 mt-32 mb-32">
                <div className="skeleton h-48 w-full"></div>
                <div className="skeleton h-6 w-36"></div>
                <div className="skeleton h-6 w-full"></div>
                <div className="skeleton h-6 w-full"></div>
              </div>
            ) : filteredDeductions.length === 0 ? (
              <div className="mockup-browser bg-base-300 border mt-36 mb-36">
                <div className="mockup-browser-toolbar">
                  <div className="input">https://markbello.com</div>
                </div>
                <div className="bg-base-200 flex justify-center px-4 py-16">        <span
                  style={{ fontSize: '30px', fontWeight: 'Bolder' }}
                >
                  <b>
                    AYAW NA PANGITAA ANG <u>{searchQueryDeduction}</u> KAY WALA!
                  </b>
                </span></div>
              </div>
            ) : currentDeductions?.length > 0 ? (
              <div className="w-full max-w-5xl">
                <table className="table glass w-full border-2 border-black">
                  <thead className="text-red">
                    <tr className="md:table-row" style={{ fontSize: "17px", backgroundColor: 'black', color: "white" }}>
                      <th className="md:table-cell text-white">Avatar</th>
                      <th className="md:table-cell text-white">NAME</th>
                      <th className="md:table-cell text-white">AMOUNT</th>
                      <th className="md:table-cell text-white">DESCRIPTION</th>
                      <th className="md:table-cell text-white">STATUS</th>

                      <th className="md:table-cell text-white">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className='text-black'>
                    {currentDeductions.map((item) => (
                      item.deduction_status_id !== 0 && (
                        <tr className="md:table-row"
                          key={item.id}
                        >
                          <td className="md:table-cell"><FcDebt style={{ fontSize: "40px", color: "transparent" }} /></td>
                          <td className="md:table-cell">{item.deduction_name}</td>
                          <td className="md:table-cell">
                            <span>&#8369;</span>
                            <b>{item.deduction_amount}</b>
                          </td>

                          <td className="md:table-cell">{item.deduction_description}</td>
                          <td className="md:table-cell">{item.deduction_status_id}</td>
                          <td className="md:table-cell">
                            <div className="flex items-center space-x-2">
                              <Link to={`/admin/deduction/edit/${item.id}`}>
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
                      onClick={() => handlePageChange(currentPageDeduction - 1)}
                      disabled={currentPageDeduction === 1}
                    >
                      <FcPrevious
                        style={{ height: "2rem", width: "2rem" }}
                      /> Previous
                    </button>
                    <button
                      className="join-item btn btn-outline glass"
                      onClick={() => handlePageChange(currentPageDeduction + 1)}
                      disabled={currentPageDeduction === totalPages}
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
              <div className="mockup-browser bg-base-300 border mt-36 mb-36">
                <div className="mockup-browser-toolbar">
                  <div className="input">https://markbello.com</div>
                </div>
                <div className="bg-base-200 flex justify-center px-4 py-16">        <span
                  style={{ fontSize: '30px', fontWeight: 'Bolder' }}
                >
                  <b>
                    AYAW NA PANGITAA ANG <u>{searchQueryDeduction}</u> KAY WALA!
                  </b>
                </span></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    deductionData: state.deductionState,
    loading: state.deductionState.loading,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDeductions: () => dispatch(fetchDeductions()),
    addDeduction: (AddDeductionData) => dispatch(addDeduction(AddDeductionData)),
    updateDeduction: (deductionId, updateDeductionData) => dispatch(updateDeduction(deductionId, updateDeductionData)),
    deactivateDeduction: (deductionId) => dispatch(deactivateDeduction(deductionId)),
    searchDeduction: (searchQuery) => dispatch(searchDeduction(searchQuery)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Deduction);