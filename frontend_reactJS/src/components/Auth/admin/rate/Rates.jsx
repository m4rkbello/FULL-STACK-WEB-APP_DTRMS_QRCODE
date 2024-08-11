import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FcFolder, FcFile, FcPlus, FcSalesPerformance, FcOk, FcApproval, FcCancel, FcEmptyTrash, FcSearch, FcViewDetails } from "react-icons/fc";
import { FaUpload } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { fetchRates, addRate, updateRate, deactivateRate, searchRates } from '../../../redux/actions/rateAction';
import { MoveLeft, FolderOpen, Component } from 'lucide-react';
//E-IMPORT TANANG MODALS SA RATES!
import AddRateModal from '../../modals/rates/AddRateModal';
import DeactivateRateModal from '../../modals/rates/DeactivateRateModal'; // Make sure the import is correct

const Rates = (props) => {
  const [isAddRateDetailsModal, isSetAddRateDetailsModal] = useState(false);
  const [isDeactivateRateModal, setIsDeactivateRateModal] = useState(false);

  useEffect(() => {
    props.fetchRates();
  }, []);

  const ratesDataObjectCollection = props?.ratesData?.rates;

  function getAllRatesPopulations(ratesDataObjectCollection) {
    let items = [];
    if (Array.isArray(ratesDataObjectCollection) && ratesDataObjectCollection.length !== 0) {
      for (let ez = 0; ez < ratesDataObjectCollection.length; ez++) {
        items.push(ratesDataObjectCollection[ez]);
      }
    }
    return items;
  }

  const resultAllRatesCollection = getAllRatesPopulations(ratesDataObjectCollection);

  if (props.loading) {
    return (
      <div>
        <span className="loading loading-spinner text-accent loading-lg"></span>
      </div>
    );
  }

  return (
    <div className='h-full max-h-full w-full max-w-full glass mx-auto p-4 shadow-slate-900/100 '>
      {/***E-MOUNT SA COMPONENT ANG MODAL */}
      <AddRateModal isOpen={isAddRateDetailsModal} onClose={() => isSetAddRateDetailsModal(false)} />
      <DeactivateRateModal isOpen={isDeactivateRateModal} onClose={() => setIsDeactivateRateModal(false)} />

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
                  <span className="inline-grid grid-cols-2 gap-4 py-5">
                    <span>
                      <input
                        type="text"
                        placeholder="Search Departments"
                        className="p-2 m-2 border-b-4 bg-black rounded text-white"
                      />
                    </span>
                    <span>
                      <FcSearch />
                    </span>
                  </span>
                </div>
                <div className="pb-5 pt-5  flex justify-center">
                  RATES LIST
                </div>
                <div className="p-3 flex justify-end">
                  <FcPlus
                  onClick={() => isSetAddRateDetailsModal(true)}
                  />
                </div>
              </div>
            </div>
          </span>

          <div className=" bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
            {Array.isArray(ratesDataObjectCollection) && ratesDataObjectCollection.length !== 0 ? (
              <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <table className="table glass py-10 px-10 my-10 mx-10 border-2 border-black">
                  <thead className=" text-red ">
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
                    {resultAllRatesCollection.map((item, index) => (
                      item.rate_status_id !== 0 && (
                        <tr className="md:table-row" key={index}>
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
                                onClick={() => setIsDeactivateRateModal(true)}
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
