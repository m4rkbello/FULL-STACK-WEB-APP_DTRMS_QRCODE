/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { connect } from 'react-redux';
import { FaUpload } from "react-icons/fa6";
import { FaUserEdit, FaExpeditedssl, FaSave } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

// import img from '../../../../src/assets/images/pic-removebg-preview.png'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchEmployees } from '../../redux/actions/employeeAction';


const EmployeePersonalDetails = (props) => {
    const { id } = useParams();

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

            <dialog id="editEmployeeDetails" className="modal">
                <div className=" modal-box w-11/12 max-w-5xl bg-amber-100">
                    <h3 className="font-bold text-3xl text-black">EDIT EMPLOYEE DETAILS</h3>

                    <div className="modal-action">
                        <form method="dialog">
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
                                            className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                                            defaultValue={item.employee_fullname}
                                            style={{ backgroundColor: 'black' }}
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
                                            className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                                            defaultValue={item.employee_email}
                                            style={{ backgroundColor: 'black' }}
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
                                            className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                                            defaultValue={item.employee_contact_no}
                                            style={{ backgroundColor: 'black' }}
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
                                            className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                                            defaultValue={item.employee_role}
                                            style={{ backgroundColor: 'black' }}
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
                                            className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                                            defaultValue={item.employee_position}
                                            style={{ backgroundColor: 'black' }}
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
                                            className="input input-bordered shadow-2xl text-2xl text-amber-100"
                                            defaultValue={item.employee_department}
                                            style={{ backgroundColor: 'black' }}
                                        />
                                    ))}
                                </div>
                                <center>
                                </center>
                                <div className="form-control">
                                <label className="label">
                                <span className="label-text text-black text-2xl">Status</span>
                            </label>
                            {employee && employee.map((item, index) => (
                                <select key={index} className="select select-border shadow-2xl text-2xl w-full max-w-xs" style={{ backgroundColor: 'black', color:"#fef3c6" }}>
                                    <option value="Active" selected={item.employee_status === 1}>Active</option>
                                    <option value="Inactive" selected={item.employee_status === 0}>Inactive</option>
                                </select>
                            ))}
                                </div>
                            </div>
                            <br />


                         

<div className="flex ...">
  <div className="hidden ...">01</div>
  <div><FaSave style={{ fontSize: "40px", color: "black", marginRight: "5px" }} /></div>
  <div><button className="btn bg-transparent" style={{ fontSize: "40px", color: "black", border: "none"}} >
  <IoMdCloseCircle style={{ fontSize: "40px", color: "black", marginRight: "5px" }}  />
  </button></div>
</div>
                        
                            
                        </form>
                    </div>
                </div>
            </dialog>

          

<dialog id="uploadEmployeeProfile" className="modal">
  <div className="modal-box bg-black">
    <form method="dialog">
    <input type="file" className="file-input  w-full max-w-md"  style={{ backgroundColor: '#fef3c6' }}/>
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>

  </div>
</dialog>

            {Array.isArray(employeesCollectionArrays) && employeesCollectionArrays.length > 0 ? (
                <>
                    <div className="hero min-h-screen bg-amber-100 rounded-t-lg">



                        <div className="hero-content flex flex-col items-center">

                            <img
                                className="mask mask-circle shadow-inner"
                                src="https://images.pexels.com/photos/9123448/pexels-photo-9123448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                type="file"

                                width="17%"
                            />

                            <FaUpload onClick={() => document.getElementById('uploadEmployeeProfile').showModal()} style={{ fontSize: "40px", color: "black", marginRight: "5px" }} />
                       

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
                                                    style={{ backgroundColor: 'transparent', color:"black", border: "none" }}
                                                    disabled


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
                                                    style={{ backgroundColor: 'transparent', color:"black", border: "none" }}
                                                    disabled
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
                                                    style={{ backgroundColor: 'transparent', color:"black", border: "none" }}
                                                    disabled
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
                                                    style={{ backgroundColor: 'transparent', color:"black", border: "none" }}
                                                    disabled
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
                                                    style={{ backgroundColor: 'transparent', color:"black", border: "none" }}
                                                    disabled
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
                                                    style={{ backgroundColor: 'transparent', color:"black", border: "none" }}
                                                    disabled
                                                />
                                            ))}
                                        </div>
                                        <center>
                                        </center>
                                        <div className="form-control">
                                        <label className="label">
                                        <span className="label-text text-black text-2xl">Status</span>
                                    </label>
                                    {employee && employee.map((item, index) => (
                                        <select key={index} className="select select-border shadow-2xl text-2xl w-full max-w-xs" style={{ backgroundColor: 'transparent', color:"black" }} disabled>
                                            <option value="Active" selected={item.employee_status === 1}>{item.employee_status === 1 ? 'Active' : 'Inactive'}</option>
                                            <option value="Inactive" selected={item.employee_status === 0}>{item.employee_status === 0 ? 'Inactive' : 'Active'}</option>
                                        </select>
                                    ))}
                                    
                                    
                                        
                                        </div>

                                    </div>
                                    <br />
                                    <br />
                                    <div className=''>
                                        <FaUserEdit onClick={() => document.getElementById('editEmployeeDetails').showModal()} style={{ fontSize: "40px", color: "black", marginRight: "5px" }} />
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </>
            ) : (
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