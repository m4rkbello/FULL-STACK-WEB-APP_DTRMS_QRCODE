import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
// ICONS
import { FcFolder, FcOpenedFolder, FcPrevious } from "react-icons/fc";
// REDUX ACTIONS
import { fetchRates, updateRate } from '../../../redux/actions/rateAction';

const EditRates = ({ fetchRates, updateRate, ratesData, loading }) => {
  const { id } = useParams(); // Destructure `id` from `useParams`
  const numericId = parseInt(id, 10); // Convert the id to a number
  console.log("DATA SA ratesData", ratesData);

  useEffect(() => {
    fetchRates(); // Fetch all rates when the component mounts
  }, [fetchRates]);

  // Filter the ratesData based on the numeric id
  const filteredRates = ratesData.filter(rate => rate.id === numericId);
  console.log("DATA SA filteredRates", filteredRates);

  return (
    <div className='h-full max-h-full w-full max-w-full glass mx-auto p-4 shadow-slate-900/100'>
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
      
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : filteredRates.length > 0 ? (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Rate Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Rate Amount</th>
                {/* <th className="px-4 py-2">Created At</th> */}
                {/* Add more columns as necessary */}
              </tr>
            </thead>
            <tbody>
              {filteredRates.map(rate => (
                <tr key={rate.id}>
                  <td className="border px-4 py-2">{rate.rate_name}</td>
                  <td className="border px-4 py-2">{rate.rate_description}</td>
                  <td className="border px-4 py-2">{rate.rate_amount_per_day}</td>
                  {/* <td className="border px-4 py-2">{new Date(rate.created_at).toLocaleDateString()}</td> */}
                  {/* Add more fields as necessary */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No rates found for the provided ID.</p>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ratesData: state.rateState.rates, // Destructure the rates data from state
    loading: state.rateState.loading, // Destructure the loading state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRates: () => dispatch(fetchRates()), // Dispatch fetchRates action
    updateRate: (UpdateRateData) => dispatch(updateRate(UpdateRateData)), // Dispatch updateRate action
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRates);
