/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { FcOk } from 'react-icons/fc';

const DeactivateDepartmentModal = ({ isOpen, onClose, deactivateRate }) => {
  if (!isOpen) return null;

  const handleDeactivate = () => {
    deactivateRate(); // Call the deactivateRate function passed as a prop
    onClose(); // Close the modal after deactivation
  };

  return (
    <dialog open className="modal border border-black">
      <div className="modal-box bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% border border-black relative">
        <form method="dialog">
          <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
        </form>
        <span className="font-bold text-3xl text-black">REMOVE RATE</span>
        <p className="py-4 text-2xl">Are you sure you want to remove this item?</p>
        <div className="flex">
          <button 
            className="btn hover:text-white hover:bg-indigo-400" 
            style={{ fontSize: "40px", color: "transparent", border: "none", backgroundColor: "transparent" }} 
            onClick={handleDeactivate}
          >
            <FcOk style={{ fontSize: "40px" }} className='text-lime-400 hover:text-black' />
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default DeactivateDepartmentModal;
