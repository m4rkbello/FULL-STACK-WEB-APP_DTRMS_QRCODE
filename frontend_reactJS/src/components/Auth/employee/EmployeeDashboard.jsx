/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchEmployees } from '../../redux/actions/employeeAction';
import { FaEye } from "react-icons/fa6";
import { MdAutoDelete } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { useEffect } from 'react';

const EmployeeDashboard = (props) => {

    useEffect(() => {
        props.fetchEmployees();
    }, []);


    const employeesCollectionArrays = props.employeesData?.employees?.data;

    function getAllEmployees(employeesCollectionArrays) {
        let item = [];

        if (employeesCollectionArrays) {
            for (let ez = 0; ez < employeesCollectionArrays.length; ez++) {

                item.push(employeesCollectionArrays[ez]);
            }
        }
        return item;

    }

    const employeesList = getAllEmployees(employeesCollectionArrays);

    return (

        <div className="hero max-w-full">
            <dialog id="addEmployeeModal" className="modal ">
                <div className="modal-box w-11/12 max-w-5xl bg-amber-100">
                  
                <div className="modal-action">
                <form method="dialog" >
                    <div className="grid grid-cols-3 gap-6">
                   
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black text-2xl">Fullname</span>
                        </label>
                       
                            <input
                                key={index}
                                name="employee_fullname" //key para sa form data
                               
                                type="text"
                                placeholder="text"
                                className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                         
                                style={{ backgroundColor: 'black' }}
                            />
                    

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black text-2xl">Email</span>
                        </label>
                      
                            <input
                                key={index}
                                name="employee_email" //key para sa formData
                        
                                type="text"
                                placeholder="email"
                                className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                              
                                style={{ backgroundColor: 'black' }}
                            />
                    
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black text-2xl">Contact No.</span>
                        </label>
                  
                            <input
                                key={index}
                                type="text"
                                name="employee_contact_no"
                         
                                placeholder="contact number"
                                className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                          
                                style={{ backgroundColor: 'black' }}
                            />
                    
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black text-2xl">Role</span>
                        </label>
                       
                            <input
                                key={index}
                                type="text"
                                name="employee_role"
                           
                                placeholder="Role"
                                className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                            
                                style={{ backgroundColor: 'black' }}
                            />
                     
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black text-2xl">Position</span>
                        </label>
                    
                            <input
                                key={index}
                                type="text"
                                name="employee_position"
                          
                                placeholder="Position"
                                className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                       
                                style={{ backgroundColor: 'black' }}
                            />

                  
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black text-2xl">Department</span>
                        </label>

                            <input
                                key={index}
                                type="text"
                                name="employee_department"
                       
                                placeholder="Enter a department"
                                className="input input-bordered shadow-2xl text-2xl text-amber-100"
                           
                                style={{ backgroundColor: 'black' }}
                            />
                    
                    </div>
                    <center>
                    </center>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black text-2xl">Status</span>
                    </label>
                
                        <select
                            key={index}
                            name="employee_status"
                            className="select shadow-2xl text-2xl w-full max-w-xs"
                            style={{ backgroundColor: 'black', color: "#fef3c6" }}
                         
                          
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    
                </div>
                
                    
                    </div>
                    <br />
                    <div className="flex ...">
                    <div>
                    <button type="submit" className="btn bg-transparent" style={{ fontSize: "40px", color: "black", border: "none" }} >
                    <FaSave style={{ fontSize: "25px", color: "black", marginRight: "5px" }} />
                    </button>
                    </div>

                    <div>
                    <button onClick={handleCloseModal} className="btn bg-transparent" style={{ fontSize: "40px", color: "black", border: "none" }} >
                    <IoMdCloseCircle style={{ fontSize: "25px", color: "black", marginRight: "5px" }} />
                    </button>
                    </div>

                    </div>
                    </form>
                    
            </div>

                    <div className="modal-action">
                        <form method="dialog">

                        
                         
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <div className="hero bg-amber-100 rounded-lg">
                <div className="bg-slate-300 ">
                    <span className="text-4xl font-black  text-black">
                        <center>
                            <IoIosPersonAdd
                                onClick={() => document.getElementById('addEmployeeModal').showModal()}
                                style={{ fontSize: "50px", color: "black", marginLeft: "95%", marginBottom: "0%", marginTop: "0%" }}
                            />
                            EMPLOPYEE DASHBOARD
                        </center>
                    </span>

                    <div className="overflow-x-auto border-2 hover:border-t-4  bg-slate-400 text-black">
                        {Array.isArray(employeesCollectionArrays) && employeesCollectionArrays.length > 0 ? (
                            <table className="table py-10 px-10 my-10 mx-10 overflow-x-auto">
                                {/* head */}
                                <thead className=" text-black ">
                                    <tr className="md:table-row" style={{ fontSize: "15px", color: "black" }}>
                                        <th className="md:table-cell" >Avatar</th>
                                        <th className="md:table-cell">Fullname</th>
                                        <th className="md:table-cell">Email</th>
                                        <th className="md:table-cell">Contact No.</th>
                                        <th className="md:table-cell">Position</th>
                                        <th className="md:table-cell">Department</th>
                                        <th className="md:table-cell">Status</th>
                                        <th className="md:table-cell">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {employeesList && employeesList.map((item, index) => (
                                        <tr key={index} className="md:table-row">
                                            <td className="md:table-cell">
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12 shadow-2xl">
                                                            <img src="http://127.0.0.1:8000/images/1713457582.jpg" alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="md:table-cell">
                                                {item.employee_fullname}
                                            </td>

                                            <td className="md:table-cell">
                                                {item.employee_email}
                                            </td>

                                            <td className="md:table-cell">
                                                {item.employee_contact_no}
                                            </td>
                                            <td className="md:table-cell">5
                                            </td>
                                            <td className="md:table-cell">
                                                {item.employee_position}
                                            </td>
                                            <td className="md:table-cell">
                                                {item.employee_status === 1 ? 'Active' : 'Inactive'}

                                            </td>
                                            <td className="flex items-center pr-2 md:table-cell" >
                                                <Link to={`/employee/details/${item.id}`} className="text-black mx-2">
                                                    <FaEye style={{ fontSize: "20px", color: "black", padding: "0%" }} />
                                                </Link>
                                                <MdAutoDelete style={{ fontSize: "20px", color: "black" }} />
                                            </td>


                                        </tr>
                                    ))}
                                </tbody>


                            </table>

                        ) : (
                            <h1>NO DATA</h1>
                        )}

                    </div>
                </div>

            </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDashboard);


