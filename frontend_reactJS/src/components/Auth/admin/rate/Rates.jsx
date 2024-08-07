import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FcFolder, FcFile } from "react-icons/fc";
import { fetchRates, addRate, updateRate, deactivateRate, searchRates } from '../../../redux/actions/rateAction';

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

  return (
    <div className='h-full max-h-full w-full max-w-full glass mx-auto p-4 '>
      <div className="flex flex-wrap">
        <div>
          <div className="text-sm breadcrumbs mb-10 bg-transparent">
            <ul>
              <li>
                <FcFolder style={{ boxShadow: "0 10px 15px rgba(4, 4, 4, 0.23)" }} />
                <Link to="/" className='hover:text-white'>Home</Link>
              </li>
              <li>
                <FcFolder style={{ boxShadow: "0 10px 15px rgba(4, 4, 4, 0.23)" }} />
                <Link to="/employee/dashboard" className='hover:text-white'>Employee Dashboard</Link>
              </li>
              <li>
                <span className="inline-flex gap-2 items-center">
                  <FcFile style={{ boxShadow: "0 10px 15px rgba(4, 4, 4, 0.23)" }} />
                  <Link to="" className='hover:text-white'>Employee Personal Details</Link>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-lg">
        <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
          <div className="flex flex-wrap bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
            <div>
              <div className="text-sm breadcrumbs mb-10 bg-transparent">
                <ul>
                  <li>
                    <a>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                      <Link to="/" className='hover:text-white'>
                        Home
                      </Link>
                    </a>
                  </li>
                  <li>
                    <a>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                      <Link to="/archieve" className='hover:text-white'>
                        Employee Archive List
                      </Link>
                    </a>
                  </li>
                  <li>
                    <span className="inline-flex gap-2 items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      <Link to="" className='hover:text-white'>
                        Employee Archive Details
                      </Link>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <span className="text-4xl font-black">
            <center>
              <div className='pb-5 pt-5 glass'>
                RATES LIST
              </div>
            </center>
          </span>
          <div className=" bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
            {Array.isArray(ratesDataObjectCollection) && ratesDataObjectCollection.length != 0 ? (
              <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <table className="table bg-white py-10 px-10 my-10 mx-10 border-2 border-black">
                  <thead className=" text-red ">
                    <tr className="md:table-row" style={{ fontSize: "17px", backgroundColor: 'black', color: "white" }}>
                      <th className="md:table-cell text-white">RATE NAME</th>
                      <th className="md:table-cell text-white">RATE AMOUNT</th>
                      <th className="md:table-cell text-white">RATE DETAILS</th>
                      <th className="md:table-cell text-white">RATE DESCRIPTION</th>
                      <th className="md:table-cell text-white">RATE DEPARTMENT</th>
                      <th className="md:table-cell text-white">RATE STATUS</th>
                      <th className="md:table-cell text-white">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className='text-black'>
                    {resultAllRatesCollection && resultAllRatesCollection.map((item, index) => (
                      item.rate_status_id !== 0 && (
                        <tr className="md:table-row" key={index}>
                          <td className="md:table-cell">{item.rate_name}</td>
                          <td className="md:table-cell">{item.rate_amount_per_day}</td>
                          <td className="md:table-cell">{item.rate_details}</td>
                          <td className="md:table-cell">{item.rate_description}</td>
                          <td className="md:table-cell">{item.rate_department_id}</td>
                          <td className="md:table-cell">{item.rate_status_id}</td>
                           <td className="md:table-cell"></td>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRates: () => dispatch(fetchRates()),
    addRate: (AddRateData) => dispatch(addRate(AddRateData)),
    updateRate: (rateId, updateRateData) => dispatch(updateRate(rateId, updateRateData)),
    deactivateRate: (rateId) => dispatch(deactivateRate(rateId)),
    searchRates: (searchQuery) => dispatch(searchRates(searchQuery)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rates);
