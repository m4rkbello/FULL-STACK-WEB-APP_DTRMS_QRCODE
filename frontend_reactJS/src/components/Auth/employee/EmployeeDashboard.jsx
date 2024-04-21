/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa6";
import { MdAutoDelete } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { useEffect } from 'react';

//REDUX
import {  fetchEmployees, addEmployee } from '../../redux/actions/employeeAction';
import { fetchImages } from '../../redux/actions/imageAction';


const EmployeeDashboard = (props) => {
    console.log("DATA SA PROPS", props)

    useEffect(() => {
        props.fetchEmployees();
        props.fetchImages();
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

    const handleAddNewEmploye = (newEmployee) => {
        props.addEmployee(newEmployee);
    }

    return (

        <div className="hero max-w-full">
            <dialog id="addEmployeeModal" className="modal ">
                <div className="modal-box w-11/12 max-w-5xl bg-amber-100">
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
        imagesData: state.images
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        fetchEmployees: () => dispatch(fetchEmployees()),
        fetchImages: () => dispatch(fetchImages()),

        addEmployee: (newEmployee) => dispatch(addEmployee(newEmployee))

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDashboard);


