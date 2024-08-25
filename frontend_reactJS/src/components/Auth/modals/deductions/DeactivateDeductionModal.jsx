/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { FcOk } from 'react-icons/fc';

const DeactivateDeductionModal = ({ isOpen, onClose, deactivateDeduction, deductionId }) => {  // Accept deductionId as a prop
  if (!isOpen) return null;

  const handleDeactivateDeduction = () => {
    deactivateDeduction(deductionId);  // Use the ID when confirming
  };

  return (
    <dialog open className="modal border border-black">
      <div className="modal-box bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% border border-black relative">
        <form method="dialog">
          <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
        </form>
        <span className="font-bold text-3xl text-black">REMOVE DEDUCTION</span>
        <p className="py-4 text-2xl">Are you sure you want to remove this item?</p>
        <div className="flex">
          <button 
            className="btn hover:text-white hover:bg-indigo-400" 
            style={{ fontSize: "40px", color: "transparent", border: "none", backgroundColor: "transparent" }} 
            onClick={handleDeactivateDeduction}  // Call the function that uses the ID
          >
            <FcOk style={{ fontSize: "40px" }} className='text-lime-400 hover:text-black' />
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeactivateDeductionModal;
