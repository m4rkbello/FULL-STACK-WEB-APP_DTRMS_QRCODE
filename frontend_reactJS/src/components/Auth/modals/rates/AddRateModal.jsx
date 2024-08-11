import React from 'react';
import { FcOk } from 'react-icons/fc';

const AddRateModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (

<dialog className="modal border border-black">
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

  );
}

export default AddRateModal;
