import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FcFolder, FcFile } from "react-icons/fc";
import { fetchRates, addRate, updateRate, deactivateRate, searchRates } from '../../../redux/actions/rateAction';
import { MoveLeft, FolderOpen, Component } from 'lucide-react';


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
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>

      <div className="flex flex-wrap">
        <div>
          <div className="text-sm breadcrumbs mb-10 bg-transparent">
            <ul>
              <li>
                <MoveLeft />
                <Link to="/" className='hover:text-white'>Home</Link>
              </li>
              <li>
                <FolderOpen />
                <Link to="/employee/dashboard" className='hover:text-white'>Rates</Link>
              </li>
              <li>
                <span className="inline-flex gap-2 items-center">
                  <Component />
                  <Link to="" className='hover:text-white'>Rates Data</Link>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-lg">
        <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">

          <span className="text-4xl font-black">
            <center>
              <div className="grid grid-cols-3 items-center mt-5">
                {/* Left Column */}
                <div className="glass p-3 flex justify-center">
                  Your item here
                </div>

                {/* Center Column */}
                <div className="pb-5 pt-5 glass flex justify-center">
                  RATES LIST
                </div>

                {/* Right Column (Empty) */}
                <div></div>
              </div>
            </center>
          </span>

          <div className=" bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
            <div class="grid gap-x-8 gap-y-4 grid-cols-3">
              <div>01</div>
              <div>02</div>
              <div>03</div>
              <div>04</div>
              <div>05</div>
              <div>06</div>
            </div>
            {Array.isArray(ratesDataObjectCollection) && ratesDataObjectCollection.length != 0 ? (
              <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <table className="table bg-white py-10 px-10 my-10 mx-10 border-2 border-black">
                  <thead className=" text-red ">
                    <tr className="md:table-row" style={{ fontSize: "17px", backgroundColor: 'black', color: "white" }}>
                      <th className="md:table-cell text-white">Icon</th>
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
                          <td className="md:table-cell"></td>
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
