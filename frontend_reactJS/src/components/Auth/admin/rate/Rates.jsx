import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FcFolder, FcPlus, FcSalesPerformance, FcApproval, FcCancel, FcEmptyTrash, FcSearch, FcViewDetails } from "react-icons/fc";
import { fetchRates, addRate, updateRate, deactivateRate, searchRates } from '../../../redux/actions/rateAction';
import { MoveLeft, FolderOpen, Component } from 'lucide-react';
import AddRateModal from '../../modals/rates/AddRateModal';
import DeactivateRateModal from '../../modals/rates/DeactivateRateModal'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Rates = (props) => {
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

  return (
    <div className='h-full max-h-full w-full max-w-full glass mx-auto p-4 shadow-slate-900/100'>
      <ToastContainer /> 
      <AddRateModal isOpen={isAddRateDetailsModal} onClose={() => setIsAddRateDetailsModal(false)} />
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
                <MoveLeft />
                <Link to="/" className='hover:text-white'>Home</Link>
              </li>
              <li>
                <FolderOpen />
                <Link to="/employee/dashboard" className='hover:text-white'>Rates</Link>
              </li>
              <li>
                <span className="inline-flex gap-2 items-center">
                  <Component />
                  <Link to="" className='hover:text-white'>Rates Data</Link>
                </span>
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
                  <FcPlus onClick={() => setIsAddRateDetailsModal(true)} />
                </div>
              </div>
            </div>
          </span>

          <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% flex items-center justify-center ">
            {props.loading ? (
              <div className="flex flex-col gap-6 w-96">
                <div className="skeleton h-48 w-full"></div>
                <div className="skeleton h-6 w-36"></div>
                <div className="skeleton h-6 w-full"></div>
                <div className="skeleton h-6 w-full"></div>
              </div>
            ) : props.ratesData?.rates && props.ratesData.rates.length > 0 ? (
              <div style={{ maxWidth: 'auto', overflowY: 'auto' }}>
                <table className="table glass py-10 px-10 my-10 mx-10 border-2 border-black">
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
                            {item.rate_status_id === 1 ? (
                              <FcApproval style={{ fontSize: "40px", color: "green", alignItems: "center" }} />
                            ) : (
                              <FcCancel style={{ fontSize: "40px", color: "yellow" }} />
                            )}
                          </td>
                          <td className="md:table-cell">
                            <div className="flex items-center space-x-4">
                              <FcViewDetails style={{ fontSize: "35px" }} />
                              <FcEmptyTrash
                                onClick={() => handleDeactivateRate(item.id)}
                                style={{ fontSize: "35px" }}
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
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRates: () => dispatch(fetchRates()),
    addRate: (AddRateData) => dispatch(addRate(AddRateData)),
    updateRate: (rateId, updateRateData) => dispatch(updateRate(rateId, updateRateData)),
    deactivateRate: (rateId) => dispatch(deactivateRate(rateId)),
    searchRates: (searchQuery) => dispatch(searchRates(searchQuery)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Rates);
