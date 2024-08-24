/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { FcFolder, FcOpenedFolder, FcPrevious, FcOk, FcCancel, FcSearch, FcPlus } from "react-icons/fc";
import { fetchOvertimes, updateOvertime } from '../../../redux/actions/overtimeAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const EditOvertime = ({ fetchOvertimes, updateOvertime, overtimeData, loading }) => {
  const { overtimeId } = useParams();
  const [formDataUpdateOvertime, setFormDataUpdateOvertime] = useState(null);

  useEffect(() => {
    fetchOvertimes();
  }, [fetchOvertimes]);

  useEffect(() => {
    if (overtimeData?.overtimes?.data?.details && !loading) {
      const overtimeItem = overtimeData.overtimes.data.details.find(item => item.id === parseInt(overtimeId, 10));
      if (overtimeItem) {
        setFormDataUpdateOvertime(overtimeItem);
      } else {
        setFormDataUpdateOvertime(null);
      }
    }
  }, [overtimeData, overtimeId, loading]);

  const handleChange = (e) => {
    setFormDataUpdateOvertime({
      ...formDataUpdateOvertime,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitUpdateOvertime = async (e) => {
    e.preventDefault();
    try {
      await updateOvertime(overtimeId, formDataUpdateOvertime);
      toast.success('Overtime has been updated Successfully!👌👌👌', {
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
      console.error("Error updating overtime:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4 w-full m-30 max-w-5xl ps-2 pe-2 mt-30 mb-30">
        <div className="skeleton h-48 w-full"></div>
        <div className="skeleton h-6 w-36"></div>
        <div className="skeleton h-6 w-full"></div>
        <div className="skeleton h-6 w-full"></div>
      </div>
    );
  }

  if (!formDataUpdateOvertime) {
    return (
      <div className="w-full max-w-5xl text-center text-lg font-semibold text-gray-500">
        <div className="mockup-browser border border-t-4 pb-10 pt-10">
          <div className="mockup-browser-toolbar">
            <div className="input text-black-400">https://markbello.com</div>
          </div>
          <div className="flex justify-center text-black px-4 py-16 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500">
            <span style={{ fontSize: '30px', fontWeight: 'Bolder' }}>
              <b>AYAW NA PANGITAA ANG WALA!</b>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='h-full max-h-full w-full max-w-full glass mx-auto p-4 shadow-slate-900/100 rounded-lg'>
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
              <Link to="/admin/overtimes" className='flex items-center hover:text-white'>
                <FcFolder style={{ height: "2rem", width: "2rem" }} />
                <span className="ml-2">Overtime</span>
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

      <div className='glass bg-black'>
        <div className="grid grid-cols-3 items-center mt-10 mb-10 rounded-lg">
          <div>
            <span className="inline-grid grid-cols-3 gap-4 py-5">
              <div className="p-3 flex justify-start">
              </div>
              <div className="p-3 flex justify-end">
              <span style={{ height: "2rem", width: "2rem" }}></span>
              </div>
            </span>
          </div>
          <div className="pb-5 pt-5 flex justify-center">
            <h3 className="font-bold text-4xl text-white">UPDATE OVERTIME</h3>
          </div>
          <div className="p-3 flex justify-end">
              <span style={{ height: "2rem", width: "2rem" }}></span>
     
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmitUpdateOvertime}>
        <div className="grid grid-cols-2 gap-6 my-10">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black text-2xl">Overtime Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered shadow-2xl glass text-2xl text-black border-1 border-glass rounded-se-3xl shadow-slate-900/100 custom-placeholder-text-color"
              style={{ backgroundColor: 'transparent', color: "black", border: "none" }}
              name="overtime_name"
              value={formDataUpdateOvertime.overtime_name || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-black text-2xl">Overtime Hour</span>
            </label>
            <input
              type="text"
              className="input input-bordered shadow-2xl glass text-2xl text-black border-1 border-glass rounded-se-3xl shadow-slate-900/100 custom-placeholder-text-color"
              name="overtime_hour"
              value={formDataUpdateOvertime.overtime_hour || ''}
              onChange={handleChange}
              style={{ backgroundColor: 'transparent', color: "black", border: "none" }}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-black text-2xl">Overtime per hour</span>
            </label>
            <input
              type="text"
              className="input input-bordered shadow-2xl glass text-2xl text-black border-1 border-glass rounded-se-3xl shadow-slate-900/100 custom-placeholder-text-color"
              name="overtime_rate_per_hour"
              value={formDataUpdateOvertime.overtime_rate_per_hour || ''}
              onChange={handleChange}
              style={{ backgroundColor: 'transparent', color: "black", border: "none" }}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-black text-2xl">Overtime Description</span>
            </label>
            <input
              type="text"
              className="input input-bordered shadow-2xl glass text-2xl text-black border-1 border-glass rounded-se-3xl shadow-slate-900/100 custom-placeholder-text-color"
              name="overtime_description"
              value={formDataUpdateOvertime.overtime_description || ''}
              onChange={handleChange}
              style={{ backgroundColor: 'transparent', color: "black", border: "none" }}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-black text-2xl">Overtime Status</span>
            </label>
            <select
              name="overtime_status_id"
              value={formDataUpdateOvertime.overtime_status_id || '1'}
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
          <div className='mx-1'>
            <button
              type="submit"
              className="btn glass hover:text-white hover:bg-indigo-400"
              style={{ fontSize: "40px", color: "transparent", border: "none", backgroundColor: "transparent" }}
              >
              <FcOk style={{ fontSize: "40px", color: "transparent" }} className='text-black hover:text-black' />
            </button>
          </div>
          <div className='mx-1'>
            <Link to="/admin/overtimes">
              <button
                className="btn glass hover:text-white hover:bg-indigo-400"
                style={{ fontSize: "40px", color: "transparent", border: "none", backgroundColor: "transparent" }}
              >
                <FcCancel style={{ fontSize: "40px", color: "transparent" }} className='text-black hover:text-black' />
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  overtimeData: state.overtimeState,
  loading: state.overtimeState.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOvertimes: () => dispatch(fetchOvertimes()),
  updateOvertime: (overtimeId, updateOvertimeData) => dispatch(updateOvertime(overtimeId, updateOvertimeData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditOvertime);
