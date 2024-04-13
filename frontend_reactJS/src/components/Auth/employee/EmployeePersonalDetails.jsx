/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { connect } from 'react-redux';
import { FaUpload } from "react-icons/fa6";
// import img from '../../../../src/assets/images/pic-removebg-preview.png'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchEmployees } from '../../redux/actions/employeeAction';


const EmployeePersonalDetails = (props) => {
  const {id} = useParams();

  useEffect(() => {
    props.fetchEmployees();
  }, []);

  
  const employeesCollectionArrays = props.employeesData?.employees?.data;
  console.log("DATA SA EMPLOYEES", employeesCollectionArrays);

  function employeeDetails(employeesCollectionArrays, id) {
      let item = [];
  
      if (employeesCollectionArrays) {
          for (let ez = 0; ez < employeesCollectionArrays.length; ez++) {
              if (employeesCollectionArrays[ez].id == id) {
                  item.push(employeesCollectionArrays[ez]);
              }
          }
      }
      return item;
  }

  const employee = employeeDetails(employeesCollectionArrays, id);

  console.log("SPECIFIC EMPLOYEE", employee);
  
  console.log("EMPLOYEE ID SELECTED", id);
  return (
    <div className="hero max-w-full">
    
    
      {Array.isArray(employeesCollectionArrays) && employeesCollectionArrays.length > 0 ? (
        <>
        <div className="hero min-h-screen bg-amber-100 rounded-t-lg">
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog justify-center">
                        <input type="file" className="file-input bg-amber-100 w-full max-w-xs" />
                        <button className="btn btn-primary ml-5">Upload</button>
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                </div>
            </dialog>
            <div className="hero-content flex flex-col items-center">
  
                <img
                    className="mask mask-circle shadow-inner"
                    src="https://images.pexels.com/photos/9123448/pexels-photo-9123448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    type="file"
  
                    width="17%"
                />
  
                <button className="btn  bg-transparent" onClick={() => document.getElementById('my_modal_3').showModal()}><FaUpload height={30} width={30} /></button>
  
                <div className="hero-content flex-col lg:flex-row">
                    <div className="flex">
                        <div className="">
                            {/**
                            <img
                                src={img}
                                className="max-w-sm rounded-lg shadow-2xl"
                            />
                            */}
  
                        </div>
                    </div>
  
                    <div className="flex-1">
                        <div className="grid grid-cols-3 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black text-2xl">Fullname</span>
                                </label>
                                {employee && employee.map((item, index) => (
                                <input
                                key={index}
                                type="text"
                                placeholder="text"
                                className="input input-bordered shadow-2xl text-2xl bg-amber-100 text-black"
                                defaultValue={item.employee_fullname}
                                style={{ backgroundColor: 'transparent' }}
                                
                     
                                />
                                ))}
  
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black text-2xl">Email</span>
                                </label>
                                {employee && employee.map((item, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    placeholder="email"
                                    className="input input-bordered shadow-2xl text-2xl bg-amber-100 text-black"
                                    defaultValue={item.employee_email}
                                    style={{ backgroundColor: 'transparent' }}
                                />
                              ))}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black text-2xl">Contact No.</span>
                                </label>
                              {employee && employee.map((item, index) => (
                                  <input
                                  key={index}
                                  type="text"
                                  placeholder="email"
                                  className="input input-bordered shadow-2xl text-2xl bg-amber-100 text-black"
                                  defaultValue={item.employee_contact_no}
                                  style={{ backgroundColor: 'transparent' }}
                                  />
                                ))}
                                </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black text-2xl">Role</span>
                                </label>
                                {employee && employee.map((item, index) => (
                                <input
                                key={index}
                                    type="text"
                                    placeholder="contact no"
                                    className="input input-bordered shadow-2xl text-2xl bg-amber-100 text-black"
                                    defaultValue={item.employee_role}
                                    style={{ backgroundColor: 'transparent' }}
                                />
                            ))}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black text-2xl">Position</span>
                                </label>
                                {employee && employee.map((item, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        placeholder="contact no"
                                        className="input input-bordered shadow-2xl text-2xl bg-amber-100 text-black"
                                        defaultValue={item.employee_position}
                                        style={{ backgroundColor: 'transparent' }}
                                    />

                                ))}
                            </div>
                            <div className="form-control">
                            <label className="label">
                            <span className="label-text text-black text-2xl">Department</span>
                            </label>
                            {employee && employee.map((item, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    placeholder="contact no"
                                    className="input input-bordered shadow-2xl text-2xl bg-amber-100 text-black"
                                    defaultValue={item.employee_department}
                                    style={{ backgroundColor: 'transparent' }}
                                />
                            ))}
                            </div>
                        </div>
                        <br />
                        <div className="form-control bg-amber-100">
                            <label className="label">
                                <span className="label-text text-black text-2xl">Status</span>
                            </label>
                            {employee && employee.map((item, index) => (
                                <select key={index} className="select a, select-warning w-full max-w-xs" style={{ color: '#FFBF00' }} defaultValue={item.employee_status}>
                                    <option disabled>Select Status</option>
                                    <option value="Active" selected={item.employee_status === 'Active'}>Active</option>
                                    <option value="Inactive" selected={item.employee_status === 'Inactive'}>Inactive</option>
                                </select>
                            ))}
                            
                        </div>
                        <button className="btn btn-primary p-5 m-2">Save</button>
                    </div>
                </div>
            </div>
        </div>
        </>
      ):(
        <>
        <div className="text-4xl">
        NO DATA
        </div>
        </>
      )}
    



        </div>
    )
}


const mapStateToProps = (state) => {

  return {
    employeesData: state.employeeState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEmployees: () => dispatch(fetchEmployees()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(EmployeePersonalDetails);