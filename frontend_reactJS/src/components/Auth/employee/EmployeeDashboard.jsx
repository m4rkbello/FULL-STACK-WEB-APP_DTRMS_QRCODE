/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState, memo, useCallback } from 'react';
import { FcPrint, FcDataSheet, FcCheckmark, FcPlus, FcSearch, FcOpenedFolder, FcFile, FcViewDetails, FcEmptyTrash, FcCancel, FcLeft } from "react-icons/fc";
//REDUXISM
import { fetchEmployees, addEmployee, deactivateEmployee } from '../../redux/actions/employeeAction';
import { fetchImages } from '../../redux/actions/imageAction';
import { fetchDepartments } from '../../redux/actions/departmentAction';
//TOASTER
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//USE-REF - GENERATE EXCEL FILE
import React, { useRef } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';


const EmployeeDashboard = (props) => {
    const defaultImage = '../../../../public/miming.jpg';

    const tableRef = useRef(null);

    const [formDataAddEmployee, setFormDataEmployeeAddEmployee] = useState({
        employee_fullname: '',
        employee_email: '',
        employee_contact_no: '',
        employee_role: '',
        employee_position: '',
        employee_department: '',
        employee_status_id: ''
    });

    useEffect(() => {
        props.fetchEmployees();
        props.fetchImages();
        props.fetchDepartments();
    }, []);

    const [deactivateEmployeeId, setDeactivateEmployeeId] = useState(null);

    const employeesCollectionArrays = props.employeesData?.employees?.data;

    const getAllEmployees = (employeesCollectionArrays = []) => {
        return [...employeesCollectionArrays];
    }

    const employeesList = getAllEmployees(employeesCollectionArrays);

    const imageCollectionArrays = props.imagesData?.images?.data;

    const getEmployeeImage = (imageCollectionArrays, employeesList) => {
        // Check if imageCollectionArrays is an array and not empty
        if (Array.isArray(imageCollectionArrays) && imageCollectionArrays.length > 0) {
            let item = [];
            // Filter the array based on the condition
            const employeeId = employeesList.length != 0 ? employeesList[0].id : null;

            for (let x = 0; x < employeeId.length; x++) {
                item.push(employeeId[x]);
            }
            return imageCollectionArrays.filter(image => image.img_emp_id == 1);
        } else {
            return [];
        }
    };

    const filterImage = getEmployeeImage(imageCollectionArrays, employeesList);

    const handleAddEmployee = async (event) => {
        event.preventDefault();
        try {
            const addEmployeeRequestResponse = await props.addEmployee(formDataAddEmployee);

            toast.success('Employee added successfully!🤭🤗😎', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    background: 'black',
                    color: '#A3E636',
                    fontSize: '17px'
                }
            });

        } catch (error) {
            toast.error('Employee faield to add! 🥺⚠️👽', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                style: {
                    background: 'black',
                    color: 'red',
                    fontSize: '15px',
                    fontWeight: 'Bold'
                }
            });
        }
    };

    const handleDeactivateEmployee = async (employeeId) => {
        try {
            // Dispatch action to remove employee with the specified ID
            await props.deactivateEmployee(deactivateEmployeeId);
        } catch (error) {
            console.error(error);
        }
    };

    const departmentsCollectionArrays = props?.departmentsData?.departments?.data?.details;

    const fetchDepartments = (departmentsCollectionArrays = []) => {
        return [...departmentsCollectionArrays];
    };
    

    const departments = fetchDepartments(departmentsCollectionArrays);

    //PRINT-MODULE EMPLOYEES-DATA
    function printEmployeeDashboard() {
        var printTable = document.getElementById("employeesDataList").cloneNode(true);

        var headerRow = printTable.querySelector("thead tr");
        if (headerRow) {
            headerRow.removeChild(headerRow.lastElementChild);
        }

        var dataRows = printTable.querySelectorAll("tbody tr");
        for (var i = 0; i < dataRows.length; i++) {
            dataRows[i].removeChild(dataRows[i].lastElementChild);
        }

        var printContents = printTable.outerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();
        document.body.innerHTML = originalContents;
    }

    return (
        <div className="h-full max-h-full w-full max-w-full hero rounded-l-lg rounded-t-lg rounded-r-lg rounded-b-lg">
            <ToastContainer />
            <dialog id="removeEmployee" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">REMOVE EMPLOYEE?</h3>
                    <p className="py-4">Are you sure you want to remove this Employee?</p>
                    <button onClick={() => handleDeactivateEmployee(deactivateEmployeeId)} className='btn bg-amber-100'>Yes</button>
                </div>
            </dialog>

            <dialog id="addEmployeeModal" className="modal border border-black">
                <div className="modal-box w-11/12 max-w-5xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% border border-black">
                    <h3 className="font-bold text-3xl text-black">ADD EMPLOYEE</h3>

                    <div className="modal-action">
                        <form method="dialog" onSubmit={handleAddEmployee}>
                            <div className="grid grid-cols-3 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white text-2xl">Fullname</span>
                                    </label>
                                    <input
                                        name="employee_fullname" //key para sa form data
                                        type="text"
                                        placeholder="Enter Fullname"
                                        className="input input-bordered shadow-2xl text-2xl text-black glass drop-shadow-xl"
                                        onChange={(e) => setFormDataEmployeeAddEmployee(prevState => ({ ...prevState, employee_fullname: e.target.value }))}
                                        value={formDataAddEmployee.employee_fullname}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white text-2xl">Email</span>
                                    </label>
                                    <input
                                        key=""
                                        name="employee_email" //key para sa form data
                                        type="text"
                                        placeholder="Enter email"
                                        className="input input-bordered shadow-2xl text-2xl  text-black glass drop-shadow-xl"
                                        onChange={(e) => setFormDataEmployeeAddEmployee(prevState => ({ ...prevState, employee_email: e.target.value }))}
                                        value={formDataAddEmployee.employee_email}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white text-2xl">Department</span>
                                    </label>
                                    <select
                                        name="employee_department_id"
                                        onChange={(e) => setFormDataEmployeeAddEmployee(prevState => ({ ...prevState, employee_department_id: e.target.value }))}
                                        className="input input-bordered shadow-2xl text-2xl text-black border-1 glass border-glass rounded-se-3xl shadow-lime-400/40"
                                    >
                                        {departments.map((item, index) => (
                                            <option key={index} value={item.id}>
                                                {item.department_name}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-2xl text-white">Contact No.</span>
                                    </label>
                                    <input
                                        name="employee_contact_no" //key para sa form data
                                        type="text"
                                        placeholder="Enter contact no."
                                        className="input input-bordered shadow-2xl text-2xl  text-black glass drop-shadow-xl"
                                        onChange={(e) => setFormDataEmployeeAddEmployee(prevState => ({ ...prevState, employee_contact_no: e.target.value }))}
                                        value={formDataAddEmployee.employee_contact_no}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white text-2xl">Position</span>
                                    </label>
                                    <input
                                        name="employee_position" //key para sa form data
                                        type="text"
                                        placeholder="Enter Position"
                                        className="input input-bordered shadow-2xl text-2xl  text-black glass drop-shadow-xl"
                                        onChange={(e) => setFormDataEmployeeAddEmployee(prevState => ({ ...prevState, employee_position: e.target.value }))}
                                        value={formDataAddEmployee.employee_position}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white text-2xl">Role</span>
                                    </label>
                                    <input
                                        name="employee_role" //key para sa form data
                                        type="text"
                                        placeholder="Enter role"
                                        className="input input-bordered shadow-2xl text-2xl  text-black glass drop-shadow-xl"
                                        onChange={(e) => setFormDataEmployeeAddEmployee(prevState => ({ ...prevState, employee_role: e.target.value }))}
                                        value={formDataAddEmployee.employee_role}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                <div className="form-control">
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white text-2xl">Status</span>
                                    </label>
                                    <select
                                        name="employee_status_id"
                                        onChange={(e) => setFormDataEmployeeAddEmployee(prevState => ({ ...prevState, employee_status_id: e.target.value }))}
                                        className="select input input-bordered shadow-2xl text-2xl text-black glass drop-shadow-xl"
                                        value={formDataAddEmployee.employee_status_id}
                                    >
                                        <option value="0">Inactive</option>
                                        <option value="1">Active</option>
                                    </select>
                                </div>
                                <div className="form-control">
                                </div>
                            </div>

                            <br />
                            <div className="flex">
                                <div>
                                    <button type="submit" className="btn glass" >
                                        <FcCheckmark
                                            style={{ fontSize: "25px", color: "", marginRight: "5px" }} />
                                    </button>
                                </div>

                                <div>
                                    <button className="btn glass">
                                        <FcCancel style={{
                                            fontSize: "25px",
                                            color: "",
                                            marginRight: "5px"
                                        }} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>

            <div className='h-full max-h-full w-full max-w-full glass mx-auto p-4 shadow-slate-900/100 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg'>
                <div className=" rounded-lg">
                    <div className="flex flex-wrap">
                        <div>
                            <div className="text-sm breadcrumbs mb-10 bg-transparent">
                                <ul>
                                    <li>
                                        <FcLeft
                                            style={{
                                                backgroundColor: "transparent",
                                                color: "black",
                                                height: "35px",
                                                width: "35px",
                                            }}
                                        />
                                        <Link to="/" className='hover:text-white'>Home</Link>
                                    </li>
                                    <li>
                                        <FcOpenedFolder
                                            style={{
                                                backgroundColor: "transparent",
                                                color: "black",
                                                height: "25px",
                                                width: "25px",
                                            }}
                                        />
                                        <Link to="/employee/dashboard" className='hover:text-white'>Employee Dashboard</Link>
                                    </li>
                                    <li>
                                        <span className="inline-flex gap-2 items-center">
                                            <FcFile
                                                style={{
                                                    backgroundColor: "transparent",
                                                    color: "black",
                                                    height: "25px",
                                                    width: "25px",
                                                }}
                                            />
                                            <Link to="" className='hover:text-white'>Employee Data</Link>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="h-auto max-h-full w-full max-w-full glass mx-auto p-4 from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% shadow-slate-900/100 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg">
                        <div className='glass shadow-slate-900/100'>
                            <div className="grid bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% grid-cols-3 items-center mt-10 mb-10 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg">
                                <div>
                                    <span className="inline-grid grid-cols-3 gap-4 py-5">
                                        <div className="p-3 flex justify-start">
                                            <input
                                                type="text"
                                                placeholder="Search"
                                                className="border-b-4 bg-transparent text-md rounded text-black custom-placeholder-text-color"
                                            />
                                        </div>
                                        <div className="p-3 flex justify-end">
                                            <FcSearch style={{ height: "2rem", width: "2rem" }} />
                                        </div>
                                    </span>
                                </div>
                                <div className="flex justify-center">
                                    <h1 className="font-bold text-4xl text-black text-center">EMPLOYEE DASHBOARD</h1>
                                </div>
                                <div className="p-3 flex justify-end">
                                    <FcPlus
                                        onClick={() => document.getElementById('addEmployeeModal').showModal()}
                                        style={{ height: "2rem", width: "2rem" }}
                                    />
                                    <DownloadTableExcel
                                        filename="ExportEmployee"
                                        sheet="users"
                                        currentTableRef={tableRef.current}
                                    >
                                        <button>
                                            <FcDataSheet
                                                style={{ height: "2rem", width: "2rem" }}
                                            /></button>
                                    </DownloadTableExcel>
                                    <button onClick={printEmployeeDashboard}>
                                        <FcPrint
                                            style={{ height: "2rem", width: "2rem" }}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='p-0 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%'>
                            {props.loading ? (
                                <div className="flex flex-col gap-4 w-full max-w-5xl ps-2 pe-2">
                                    <div className="skeleton h-48 w-full"></div>
                                    <div className="skeleton h-6 w-36"></div>
                                    <div className="skeleton h-6 w-full"></div>
                                    <div className="skeleton h-6 w-full"></div>
                                </div>
                            ) : (
                                Array.isArray(employeesCollectionArrays) && employeesCollectionArrays.length > 0 ? (
                                    <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                        <table id="employeesDataList" ref={tableRef} className="table glass border-2 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                                            <thead className="text-white">
                                                <tr className="md:table-row pb-5 pt-5" style={{ fontSize: "17px", backgroundColor: 'black', color: 'white' }}>
                                                    <th className="md:table-cell">Avatar</th>
                                                    <th className="md:table-cell">Id</th>
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
                                                    item.employee_status !== 0 && (
                                                        <tr key={index} className="md:table-row overflow-x-auto glass">
                                                            <td className="sm:table-cell box-border h-24 w-24 p-4 drop-shadow-lg">
                                                                <div className="flex items-center">
                                                                    <div className="avatar hover:box-content">
                                                                        <img src={item.employee_image || defaultImage} alt={`Employee ${item.employee_name}`} />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="md:table-cell">{item.id}</td>
                                                            <td className="md:table-cell">{item.employee_fullname}</td>
                                                            <td className="md:table-cell">{item.employee_email}</td>
                                                            <td className="md:table-cell">{item.employee_contact_no}</td>
                                                            <td className="md:table-cell">{item.employee_position}</td>
                                                            <td className="md:table-cell">{item.department_name}</td>

                                                            <td className="md:table-cell">
                                                                {item.employee_status_id !== 0 ? (
                                                                    <FcCheckmark style={{ height: "2rem", width: "2rem" }} />
                                                                ) : (
                                                                    <FcCancel style={{ height: "2rem", width: "2rem" }} />
                                                                )}
                                                            </td>
                                                            <td className="flex md:table-cell">
                                                                <div className="flex">
                                                                    <div className="flex-none mr-3">
                                                                        <Link to={`/employee/details/${item.id}`} className="text-black">
                                                                            <FcViewDetails style={{ height: "2rem", width: "2rem" }} />
                                                                        </Link>
                                                                    </div>
                                                                    <div className="flex-none mr-3">
                                                                        <FcEmptyTrash
                                                                            style={{ height: "2rem", width: "2rem" }}
                                                                            onClick={() => {
                                                                                setDeactivateEmployeeId(item.id);
                                                                                document.getElementById('removeEmployee').showModal();
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="mockup-browser border border-t-4 pb-10 pt-10">
                                        <div className="mockup-browser-toolbar">
                                            <div className="input text-black-400">https://markbello.com</div>
                                        </div>
                                        <div className="flex justify-center px-4 py-16 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                                            <span style={{ fontSize: '50px', fontWeightL: 'Bolder' }}>
                                                <b>AYAW NA PANGITAA ANG WALA!</b>
                                            </span>
                                        </div>
                                    </div>
                                )
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        employeesData: state.employeeState,
        imagesData: state.imageState,
        departmentsData: state.departmentState,
        loading: state.employeeState.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEmployees: () => dispatch(fetchEmployees()),
        fetchImages: () => dispatch(fetchImages()),
        addEmployee: (AddEmployeeData) => dispatch(addEmployee(AddEmployeeData)),
        deactivateEmployee: (employeeId) => dispatch(deactivateEmployee(employeeId)),
        fetchDepartments: () => dispatch(fetchDepartments()),
    };
};


const MemoizedEmployeeDashboard = memo(EmployeeDashboard);

export default connect(mapStateToProps, mapDispatchToProps)(MemoizedEmployeeDashboard);


