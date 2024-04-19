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
        <div className="hero bg-amber-100 rounded-lg">
        <IoIosPersonAdd
        style={{ fontSize: "50px", color: "black", marginLeft: "95%", marginBottom: "70%" }}
        />
        <div className="bg-slate-300 ">
        <span className="text-4xl font-black  text-black b">
        <center>
                            EMPLOPYEE DASHBOARD
                        </center>
                    </span>

                    <div className="overflow-x-auto border-2 hover:border-t-4  bg-slate-400 text-black">
                    {Array.isArray(employeesCollectionArrays) && employeesCollectionArrays.length > 0 ? (
                            <table className="table py-10 px-10 my-10 mx-10 overflow-x-auto">
                                {/* head */}
                                <thead className=" text-black ">
                                    <tr style={{ fontSize: "15px", color: "black"}}>
                                        <th>Avatar</th>
                                        <th>Fullname</th>
                                        <th>Email</th>
                                        <th>Contact No.</th>
                                        <th>Position</th>
                                        <th>Department</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {employeesList && employeesList.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12 shadow-2xl">
                                                            <img src="http://127.0.0.1:8000/images/1713457582.jpg" alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {item.employee_fullname}
                                            </td>

                                            <td>
                                                {item.employee_email}
                                            </td>

                                            <td>
                                                {item.employee_contact_no}
                                            </td>
                                            <td>5
                                            </td>
                                            <td>
                                                {item.employee_position}
                                            </td>
                                            <td>
                                                {item.employee_status === 1 ? 'Active' : 'Inactive'}
                                              
                                            </td>
                                            <td className="flex items-center pr-2 ">
                                            <Link to={`/employee/details/${item.id}`} className="text-black mx-2">
                                                <FaEye style={{ fontSize: "20px", color: "black", padding: "0%"}} />
                                            </Link>
                                            <MdAutoDelete style={{ fontSize: "20px", color: "black"}} />
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


