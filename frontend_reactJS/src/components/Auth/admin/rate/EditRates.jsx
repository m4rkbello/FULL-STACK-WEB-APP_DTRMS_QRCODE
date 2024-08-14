import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
// ICONS
import { FcFolder, FcOpenedFolder, FcPrevious, FcOk } from "react-icons/fc";
// REDUX ACTIONS
import { fetchRates, updateRate } from '../../../redux/actions/rateAction';

const EditRates = ({ fetchRates, updateRate, ratesData, loading }) => {
  const { id } = useParams();
  const numericId = parseInt(id, 10);

  // Local state to store form data
  const [formData, setFormData] = useState({
    rate_name: '',
    rate_amount_per_day: '',
    rate_details: '',
    rate_description: '',
    rate_department_id: '',
    rate_status_id: '1',
  });

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  useEffect(() => {
    const rate = ratesData.find(item => item.id === numericId);
    if (rate) {
      setFormData({
        rate_name: rate.rate_name || '',
        rate_amount_per_day: rate.rate_amount_per_day || '',
        rate_details: rate.rate_details || '',
        rate_description: rate.rate_description || '',
        rate_department_id: rate.rate_department_id || '',
        rate_status_id: rate.rate_status_id || '1',
      });
    }
  }, [ratesData, numericId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the updateRate action with the updated data
    updateRate({ id: numericId, ...formData });
  };

  if (loading) {
    return <div className="flex flex-col gap-4 w-full max-w-5xl ps-2 pe-2">
      <div className="skeleton h-48 w-full"></div>
      <div className="skeleton h-6 w-36"></div>
      <div className="skeleton h-6 w-full"></div>
      <div className="skeleton h-6 w-full"></div>
    </div>;
  }

  if (!formData.rate_name) {
    return <p>No rates found for the provided ID.</p>;
  }

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

      <div className="modal-action">
        <form onSubmit={handleSubmit} method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 glass">✕</button>
          <div className="grid grid-cols-3 gap-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black text-2xl">Rate Name</span>
              </label>
              <input
                name="rate_name"
                type="text"
                value={formData.rate_name}
                onChange={handleChange}
                placeholder="Enter rate name"
                className="input input-bordered glass shadow-2xl text-2xl text-black border-glass shadow-slate-900/100 custom-placeholder-text-color"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black text-2xl">Rate Amount</span>
              </label>
              <input
                name="rate_amount_per_day"
                type="text"
                value={formData.rate_amount_per_day}
                onChange={handleChange}
                placeholder="Enter rate amount"
                className="input input-bordered shadow-3xl glass text-2xl text-black border-1 border-glass shadow-slate-900/100 custom-placeholder-text-color"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black text-2xl">Rate Details</span>
              </label>
              <input
                name="rate_details"
                type="text"
                value={formData.rate_details}
                onChange={handleChange}
                placeholder="Enter rate details"
                className="input input-bordered shadow-2xl glass text-2xl text-black border-1 border-glass shadow-slate-900/100 custom-placeholder-text-color"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black text-2xl">Rate Description</span>
              </label>
              <input
                name="rate_description"
                type="text"
                value={formData.rate_description}
                onChange={handleChange}
                placeholder="Enter rate description"
                className="input input-bordered shadow-2xl glass text-2xl text-black border-1 border-glass shadow-slate-900/100 custom-placeholder-text-color"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black text-2xl">Rate Department</span>
              </label>
              <select
                name="rate_department_id"
                value={formData.rate_department_id}
                onChange={handleChange}
                className="input input-bordered shadow-2xl glass text-2xl text-black border-1 border-glass rounded-se-3xl shadow-slate-900/100 custom-placeholder-text-color"
              >
                <option value="">Select Department</option>
                {/* Add department options here */}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-glass text-2xl">Rate Status</span>
              </label>
              <select
                name="rate_status_id"
                value={formData.rate_status_id}
                onChange={handleChange}
                className="input input-bordered shadow-2xl glass text-2xl text-black border-1 border-glass rounded-se-3xl shadow-slate-900/100 custom-placeholder-text-color"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
          </div>
          <br />
          <div className="flex">
            <div>
              <button
                type="submit"
                className="btn glass hover:text-white hover:bg-indigo-400"
                style={{ fontSize: "40px", color: "transparent", border: "none", backgroundColor: "transparent" }}
              >
                <FcOk type="submit" style={{ fontSize: "40px", color: "transparent" }} className='text-black hover:text-black' />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ratesData: state.rateState.rates,
    loading: state.rateState.loading,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRates: () => dispatch(fetchRates()),
    updateRate: (UpdateRateData) => dispatch(updateRate(UpdateRateData)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRates);
