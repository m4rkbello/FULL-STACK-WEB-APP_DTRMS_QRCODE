/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { FcOk } from 'react-icons/fc';
import { connect } from 'react-redux';
import { addRate } from '../../../redux/actions/rateAction';
import { fetchDepartments } from '../../../redux/actions/departmentAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddRateModal = ({ isOpen, onClose, addRate, fetchDepartments, departmentData }) => {
  // Log the department data to check its structure
  console.log("Department Data from Redux State:", departmentData);

  const [formData, setFormData] = useState({
    rate_name: '',
    rate_amount_per_day: '',
    rate_details: '',
    rate_description: '',
    rate_department_id: '',
    rate_status_id: '1',
  });

  useEffect(() => {
    if (isOpen) {
      fetchDepartments(); // Fetch departments when the modal is opened
    }
  }, [isOpen, fetchDepartments]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmitAddRateData = async (e) => {
    e.preventDefault();
    try {
      await addRate(formData);
      toast.success('Rate added successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to add rate');
      console.error('Failed to add rate', error);
    }
  };

  // Assuming departmentData has a structure like { data: { details: [array of departments] } }
  const departments = departmentData?.departments?.data?.details || [];
  console.log("DATA SA departmentsxxxx", departments);

  return (
    <dialog open className="modal border border-black">
      <div className="modal-box w-11/12 max-w-5xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% border border-black">
        <span className="font-bold text-3xl text-black">ADD RATE DETAILS</span>
        <div className="modal-action">
          <form method="dialog" onSubmit={handleSubmitAddRateData}>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 glass" onClick={onClose}>✕</button>
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
                  {departments.map((department) => (
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
    </dialog>
  );
}

const mapToStateToProps = (state) => ({
  departmentData: state.departmentState,
});

const mapToDispatchToProps = (dispatch) => ({
  addRate: (rateData) => dispatch(addRate(rateData)),
  fetchDepartments: () => dispatch(fetchDepartments()),
});

export default connect(mapToStateToProps, mapToDispatchToProps)(AddRateModal);
