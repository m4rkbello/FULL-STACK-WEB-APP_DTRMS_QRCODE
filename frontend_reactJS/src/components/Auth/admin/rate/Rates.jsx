import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FcFolder, FcFile, FcPlus, FcSalesPerformance, FcOk, FcApproval, FcCancel, FcEmptyTrash, FcSearch, FcViewDetails } from "react-icons/fc";
import { FaUpload } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";

import { fetchRates, addRate, updateRate, deactivateRate, searchRates } from '../../../redux/actions/rateAction';
import { MoveLeft, FolderOpen, Component } from 'lucide-react';


const Rates = (props) => {
  useEffect(() => {
    props.fetchRates();
  }, []);

  const ratesDataObjectCollection = props?.ratesData?.rates;
  console.log("ratesDataObjectCollection: ", ratesDataObjectCollection);

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
  console.log("resultAllRatesCollection: ", resultAllRatesCollection);

  if (props.loading) {
    return (
      <div>
        <span className="loading loading-spinner text-accent loading-lg"></span> {/* Adjust fontSize as needed */}
      </div>
    );
  }

  return (
    <div className='h-full max-h-full w-full max-w-full glass mx-auto p-4 shadow-slate-900/100 '>

      {/**ADD-RATE-MODAL */}
      <dialog id="addRateDetailsModal" className="modal border border-black">
        <div className=" modal-box w-11/12 max-w-5xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%  border border-black">
          <span className="font-bold text-3xl text-black">ADD RATE DETAILS</span>
          <div className="modal-action ">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 glass">✕</button>
              <div className="grid grid-cols-3 gap-8">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black text-2xl">Rate Name</span>
                  </label>
                  <input
                    name="employee_fullname"
                    type="text"
                    placeholder="Enter rate name"
                    className="input input-bordered
                    glass 
                    shadow-2xl
                    text-2xl 
                    text-black
                    border-glass
                    shadow-slate-900/100
                    custom-placeholder-text-color
                    "
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black text-2xl">Rate Amount</span>
                  </label>

                  <input
                    name="employee_email" //key para sa formData
                    type="text"
                    placeholder="Enter rate amount"
                    className="
                    input input-bordered
                    shadow-3xl
                    glass
                    text-2xl
                    text-black
                    border-1
                    border-glass
                    shadow-slate-900/100
                    custom-placeholder-text-color"
                  />

                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black text-2xl">Rate Details</span>
                  </label>
                  <input
                    type="text"
                    name="employee_contact_no"
                    placeholder="Enter rate details"
                    className="
                    input input-bordered
                    shadow-2xl
                    glass
                    text-2xl
                    text-black
                    border-1
                    border-glass
                    shadow-slate-900/100
                    custom-placeholder-text-color"
                  />

                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black text-2xl">Rate Description</span>
                  </label>

                  <input
                    type="text"
                    name="employee_role"
                    placeholder="Enter rate details"
                    className="
                    input input-bordered
                    shadow-2xl
                    glass
                    text-2xl
                    text-black
                    border-1
                    border-glass
                    shadow-slate-900/100
                    custom-placeholder-text-color"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black text-2xl">Rate Department</span>
                  </label>

                  <select
                    name="employee_department_id"

                    className="input input-bordered
                     shadow-2xl
                    glass
                     text-2xl
                      text-black
                       border-1
                        border-glass
                         rounded-se-3xl
                          shadow-slate-900/100
                          custom-placeholder-text-color"
                  >

                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-glass text-2xl">Rate Status</span>
                  </label>
                  <select
                    name="employee_status_id"
                    className="input input-bordered
                     shadow-2xl
                      glass
                       text-2xl
                        text-black
                         border-1
                          border-glass
                           rounded-se-3xl
                            shadow-slate-900/100
                              custom-placeholder-text-color"
                    style={{ backgroundColor: '', color: "black" }}

                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>

                </div>
              </div>
              <br />
              <div className="flex">
                <div>
                  <button className="btn hover:text-white hover:bg-indigo-400" style={{ fontSize: "40px", color: "transparent", border: "none", backgroundColor: "transparent" }} >
                    <FcOk type="submit" style={{ fontSize: "40px", color: "transparent" }} className='text-lime-400 hover:text-black' />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </dialog>
      {/**DISABLED RATE-MODAL */}
      
      <dialog id="deactivateRateModal" className="modal">
        <div className="modal-box bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%  border border-black">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <span className="font-bold text-3xl text-black">REMOVE RATE</span>
          <p className="py-4 text-2xl">Are you sure you to remove this item?</p>
        </div>
      </dialog>

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
                        style={{ backgroundColor: "transparent", color: "white" }}
                      />
                    </span>
                    <span>
                      <FcSearch
                        style={{
                          backgroundColor: "transparent",
                          color: "black",
                        }}
                      />
                    </span>
                  </span>
                </div>
                <div className="pb-5 pt-5  flex justify-center">
                  RATES LIST
                </div>
                <div className="p-3 flex justify-end">
                  <FcPlus
                    onClick={() => document.getElementById('addRateDetailsModal').showModal()}
                  />
                </div>
              </div>
            </div>
          </span>
          <div className=" bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
            {Array.isArray(ratesDataObjectCollection) && ratesDataObjectCollection.length != 0 ? (
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
                    {resultAllRatesCollection && resultAllRatesCollection.map((item, index) => (
                      item.rate_status_id !== 0 && (
                        <tr className="md:table-row" key={index}>
                          <td className="md:table-cell">     <FcSalesPerformance style={{ fontSize: "40px", color: "transparent" }} /></td>
                          <td className="md:table-cell">{item.rate_name}</td>
                          <td className="md:table-cell">
                            <span>&#8369;</span>
                            <b>
                              {item.rate_amount_per_day}
                            </b>
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

                              <FcEmptyTrash onClick={() => document.getElementById('deactivateRateModal').showModal()} style={{ fontSize: "35px" }} />
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
