import React from 'react';
import { FcOk } from 'react-icons/fc';

const AddRateModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
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
              />
            </span>
            <span>
              <FcSearch />
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
  );
}

export default AddRateModal;
