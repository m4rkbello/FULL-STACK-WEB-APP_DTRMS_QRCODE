/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
// ICONS
import { FcFolder, FcOpenedFolder, FcPrevious, FcOk } from "react-icons/fc";
// REDUXISM
import { fetchRates, updateRate } from '../../../redux/actions/rateAction';
import { fetchDepartments } from '../../../redux/actions/departmentAction';
//TOASTER
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditRates = ({ fetchRates, updateRate, ratesData, departmentData, fetchDepartments, loading }) => {
  const { rateId } = useParams();
  
  const [formDataUpdateRate, setFormDataUpdateRate] = useState(null);

  useEffect(() => {
    fetchRates();
    fetchDepartments();
  }, [fetchRates, fetchDepartments]);

  useEffect(() => {
    if (ratesData.rates && !loading) {
      const rate = ratesData.rates.find(rate => rate.id === parseInt(rateId, 10));
      if (rate) {
        setFormDataUpdateRate(rate);
      } else {
        setFormDataUpdateRate(null);
      }
    }
  }, [ratesData, rateId, loading]);

  const handleChange = (e) => {
    setFormDataUpdateRate({
      ...formDataUpdateRate,
      [e.target.name]: e.target.value,
    });
  };

  //function para e update ang data
  const handleSubmitUpdateRate = async (e) => {
    e.preventDefault();
    try {
      await updateRate(rateId, formDataUpdateRate);

      toast.success('Updated Successfully!👌👌👌', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
            background: 'white',
            color: 'green',
            fontSize: '15px'
        }
    });

    } catch (error) {

      toast.error('Fill-up correctly! 🥺⚠️👽', {
        position: 'top-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        style: {
            background: 'black',
            color: 'red',
            fontSize: '15px'
        }
    });
    
    }
  };

  if (loading || formDataUpdateRate === null) {
    return <div>Loading...</div>;
  }

  if (!formDataUpdateRate) {
    return <p>No rate found for the provided ID.</p>;
  }

  const departmentsCollection = departmentData?.departments?.data?.details || [];

  return (
    <div className='h-full max-h-full w-full max-w-full glass mx-auto p-4 shadow-slate-900/100 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg'>
      <ToastContainer />
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

      <form onSubmit={handleSubmitUpdateRate}>
        <div className="grid grid-cols-3 gap-6">

          <div className="form-control">
            <label className="label">
              <span className="label-text text-black text-2xl">Rate Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered shadow-2xl text-2xl bg-black text-glass"
              style={{ backgroundColor: 'transparent', color: "black", border: "none" }}
              name="rate_name"
              value={formDataUpdateRate.rate_name || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-black text-2xl">Rate Amount</span>
            </label>
            <input
              type="text"
              className="input input-bordered shadow-2xl text-2xl bg-black text-glass"
              name="rate_amount_per_day"
              value={formDataUpdateRate.rate_amount_per_day || ''}
              onChange={handleChange}
              style={{ backgroundColor: 'transparent', color: "black", border: "none" }}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-black text-2xl">Rate Details</span>
            </label>
            <input
              type="text"
              className="input input-bordered shadow-2xl text-2xl bg-black text-glass"
              name="rate_details"
              value={formDataUpdateRate.rate_details || ''}
              onChange={handleChange}
              style={{ backgroundColor: 'transparent', color: "black", border: "none" }}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-black text-2xl">Rate Description</span>
            </label>
            <input
              type="text"
              className="input input-bordered shadow-2xl text-2xl bg-black text-glass"
              name="rate_description"
              value={formDataUpdateRate.rate_description || ''}
              onChange={handleChange}
              style={{ backgroundColor: 'transparent', color: "black", border: "none" }}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-black text-2xl">Rate Department</span>
            </label>
            <select
              name="rate_department_id"
              value={formDataUpdateRate.rate_department_id || ''}
              onChange={handleChange}
              className="input input-bordered shadow-2xl glass text-2xl text-black border-1 border-glass rounded-se-3xl shadow-slate-900/100 custom-placeholder-text-color"
            >
              <option value="">Select Department</option>
              {departmentsCollection.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.department_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-glass text-2xl">Rate Status</span>
            </label>
            <select
              name="rate_status_id"
              value={formDataUpdateRate.rate_status_id || '1'}
              onChange={handleChange}
              className="input input-bordered shadow-2xl glass text-2xl text-black border-1 border-glass rounded-se-3xl shadow-slate-900/100 custom-placeholder-text-color"
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>

        </div>

        <div className="flex">
          <div>
            <button
              type="submit"
              className="btn glass hover:text-white hover:bg-indigo-400"
              style={{ fontSize: "40px", color: "transparent", border: "none", backgroundColor: "transparent" }}
            >
              <FcOk style={{ fontSize: "40px", color: "transparent" }} className='text-black hover:text-black' />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ratesData: state.rateState,
    loading: state.rateState.loading,
    departmentData: state.departmentState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRates: () => dispatch(fetchRates()),
    updateRate: (rateId, UpdateRateData) => dispatch(updateRate(rateId, UpdateRateData)),
    fetchDepartments: () => dispatch(fetchDepartments()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRates);
