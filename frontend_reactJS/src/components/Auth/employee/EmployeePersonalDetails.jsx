/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
//DISPATCH-ACTION REDUX-CORE
import { fetchEmployees, updateEmployee, uploadAndUpdateImageEmployee } from '../../redux/actions/employeeAction';
import { fetchImages } from '../../redux/actions/imageAction';
import { fetchDepartments } from '../../redux/actions/departmentAction';
//ICONS
import { FaUpload } from "react-icons/fa6";

import { FcFolder, FcOpenedFolder, FcPlus, FcSalesPerformance, FcSearch, FcPrevious, FcViewDetails, FcEmptyTrash, FcNext } from "react-icons/fc";
import { IoMdCloseCircle } from "react-icons/io";
import { FaUserEdit, FaSave, FaLongArrowAltLeft } from "react-icons/fa";
//TOASTER
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EmployeePersonalDetails = (props) => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageEmployee, setImageEmployee] = useState(null);

     const defaultImage = '../../../../public/miming.jpg';

    const empId = id;

    //e-open ang modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
        const editEmployeeDetailsDialog = document.getElementById('editEmployeeDetails');
        if (editEmployeeDetailsDialog) {
            editEmployeeDetailsDialog.showModal();
        }
    };

    //close ang modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        const editEmployeeDetailsDialog = document.getElementById('editEmployeeDetails');
        if (editEmployeeDetailsDialog) {
            editEmployeeDetailsDialog.close();
        }
    };

    const [formDataEmployeeUpdate, setFormDataEmployeeUpdate] = useState({
        employee_fullname: '',
        employee_email: '',
        employee_contact_no: '',
        employee_role: '',
        employee_position: '',
        employee_department_id: '',
        employee_status_id: ''
    });

    const handleChangeUpdateData = (ez) => {
        setFormDataEmployeeUpdate({
            ...formDataEmployeeUpdate,
            [ez.target.name]: ez.target.value,
        });
    };

    const handleSumbitEmployeeData = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            props.updateEmployee(id, formDataEmployeeUpdate);
        } catch (error) {
            window.alert("ERROR");
        }
    };

    const employeesCollectionArrays = props.employeesData?.employees?.data;

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

    const employeeSpecific = employee;

    const handleImageEmployeeChange = (e) => {
        setImageEmployee(e.target.files[0]);
    };

    const handleUploadImageEmployee = () => {
        event.preventDefault();
        if (imageEmployee) {
            const formData = new FormData();
            formData.append('employee_image', imageEmployee);
            props.uploadAndUpdateImageEmployee(formData, id);
        }
    };

    const departmentsCollectionArrays = props?.departmentsData?.departments?.data?.details;

    function fetchDepartments(departmentsCollectionArrays) {
        let item = [];

        if (departmentsCollectionArrays) {
            for (let ez = 0; ez < departmentsCollectionArrays.length; ez++) {
                item.push(departmentsCollectionArrays[ez]);
            }
        }
        return item;
    }

    const departments = fetchDepartments(departmentsCollectionArrays);
 
    //Display filter sa Department
    function getEmployeeDepartment(departmentsCollectionArrays, employee) {
        if (Array.isArray(departmentsCollectionArrays) && departmentsCollectionArrays.length > 0 && Array.isArray(employee) && employee.length > 0) {
            //Assuming na naay 
            const employeeDepartmentId = employee[0].employee_department_id; // Assuming departmentId is the key in employee object
            return departmentsCollectionArrays.filter(department => department.id === employeeDepartmentId);
        }
        return [];
    }
    
    const employeeDepartmentFilteredData = getEmployeeDepartment(departmentsCollectionArrays, employee);

    useEffect(() => {
        props.fetchEmployees();
        props.fetchImages();
        props.fetchDepartments();
    }, []);

    
    return (
        <div className="hero glass h-full max-h-full w-full max-w-full">
            <ToastContainer />
            <div className="flex flex-col bg-transparent mb-10 shadow-slate-900/100" >
            <div className="flex items-center text-sm breadcrumbs">
              <ul className="flex space-x-4">
                <li>
                  <Link to="/" className='flex items-center hover:text-white'>
                    <FcPrevious style={{ height: "2rem", width: "2rem" }} />
                    <span className="ml-2">Home</span>
                  </Link>
                </li>
                <li>
                  <Link to="/employee/dashboard" className='flex items-center hover:text-white'>
                    <FcFolder style={{ height: "2rem", width: "2rem" }} />
                    <span className="ml-2">Rates</span>
                  </Link>
                </li>
                <li>
                  <Link to="" className='flex items-center hover:text-white'>
                    <FcOpenedFolder style={{ height: "2rem", width: "2rem" }} />
                    <span className="ml-2">Data</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
            {isModalOpen && (
                <dialog id="editEmployeeDetails" className="modal border border-black">
                    <div className=" modal-box w-11/12 max-w-5xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%  border border-black">
                        <h3 className="font-bold text-3xl text-black">EDIT EMPLOYEE DETAILS</h3>
                        <div className="modal-action ">
                            <form method="dialog" onSubmit={handleSumbitEmployeeData}>
                                <div className="grid grid-cols-3 gap-6 ">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white text-2xl">Fullname</span>
                                        </label>
                                        {employee && employee.map((item, index) => (
                                            <input
                                                key={index}
                                                name="employee_fullname" //key para sa form data
                                                onChange={handleChangeUpdateData}
                                                type="text"
                                                placeholder="Enter a Fullname"
                                                className="input input-bordered glass shadow-2xl text-2xl text-black border-1 border-glass shadow-lime-400/100"
                                                defaultValue={item.employee_fullname}
                                            />
                                        ))}

                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white text-2xl">Email</span>
                                        </label>
                                        {employee && employee.map((item, index) => (
                                            <input
                                                key={index}
                                                name="employee_email" //key para sa formData
                                                onChange={handleChangeUpdateData}
                                                type="text"
                                                placeholder="email"
                                                className="input input-bordered shadow-2xl glass text-2xl text-black border-1 border-glass shadow-lime-400/40"
                                                defaultValue={item.employee_email}
                                            />
                                        ))}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white text-2xl">Contact No.</span>
                                        </label>
                                        {employee && employee.map((item, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                name="employee_contact_no"
                                                onChange={handleChangeUpdateData}
                                                placeholder="contact number"
                                                className="input input-bordered shadow-2xl glass text-2xl text-black border-1 border-glass shadow-lime-400/40"
                                                defaultValue={item.employee_contact_no}
                                            />
                                        ))}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white text-2xl">Role</span>
                                        </label>
                                        {employee && employee.map((item, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                name="employee_role"
                                                onChange={handleChangeUpdateData}
                                                placeholder="Role"
                                                className="input input-bordered shadow-2xl glass text-2xl text-black border-1 border-glass shadow-lime-400/40"
                                                defaultValue={item.employee_role}
                                            />
                                        ))}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white text-2xl">Position</span>
                                        </label>
                                        {employee && employee.map((item, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                name="employee_position"
                                                onChange={handleChangeUpdateData}
                                                placeholder="Position"
                                                className="input input-bordered shadow-2xl glass text-2xl text-black border-1 border-glass shadow-lime-400/40"
                                                defaultValue={item.employee_position}
                                            />
                                        ))}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white text-2xl">Department</span>
                                        </label>

                                        <select
                                            name="employee_department_id"
                                            onChange={handleChangeUpdateData}
                                            className="input input-bordered shadow-2xl glass text-2xl text-black border-1 border-glass rounded-se-3xl shadow-lime-400/40"
                                            >
                                            {departments.map((item, index) => (
                                                <option key={index} value={item.id}>
                                                    {item.department_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <center>
                                    </center>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-glass text-2xl">Status</span>
                                        </label>
                                        {employee && employee.map((item, index) => (
                                            <select
                                                key={index}
                                                name="employee_status_id"
                                                className="select shadow-2xl text-2xl w-full glass max-w-xs shadow-lime-400/40"
                                                style={{ backgroundColor: '', color: "black" }}
                                                onChange={handleChangeUpdateData}
                                                >
                                                <option value="1">Active</option>
                                                <option value="0">Inactive</option>
                                            </select>
                                        ))}
                                    </div>
                                </div>
                                <br />
                                <div className="flex">
                                    <div>
                                        <button type="submit" className="btn bg-black hover:text-white hover:bg-indigo-400" style={{ fontSize: "40px", color: "black", border: "none" }} >
                                            <FaSave style={{ fontSize: "25px", color: "", marginRight: "5px" }} className='text-lime-400 hover:text-black' />
                                        </button>
                                    </div>

                                    <div>
                                        <button onClick={handleCloseModal} className="btn bg-black hover:text-white hover:bg-indigo-400" style={{ fontSize: "40px", color: "black", border: "none" }} >
                                            <IoMdCloseCircle style={{ fontSize: "25px", color: "", marginRight: "5px" }} className='text-lime-400 hover:text-black' />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
               
                    </div>
                </dialog>
            )}

            <dialog id="uploadEmployeeProfile" className="modal">
                <div className="modal-box">
                    <form method="dialog justify-center">
                        <input type="file" onChange={handleImageEmployeeChange} className="file-input bg-black w-full max-w-xs" />
                        <button onClick={handleUploadImageEmployee}
                            className="btn btn-primary ml-5"
                            style={{ background: "black", color: "white" }}
                        >Upload</button>
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                </div>
            </dialog>

            {Array.isArray(employeesCollectionArrays) && employeesCollectionArrays.length > 0 ? (
                <>
                    <div className="hero glass h-full max-h-full w-full max-w-full rounded-t-lg rounded-b-lg shadow-lg">
                        <button style={{ marginRight: "93%", marginBottom: "65%" }} >
                            <Link to="/employee/dashboard">
                                <FaLongArrowAltLeft style={{ fontSize: "50px", color: "black", marginRight: "90%", marginBottom: "65%" }} />
                            </Link>
                        </button>
                        <div className="hero-content flex flex-col items-center">
                            {employee && employee.map((image, imageIndex) => (
                                <img
                                    key={imageIndex}
                                    className="mask mask-square shadow-inner"
                                    src={image.employee_qrcode}
                                    type="file"
                                    style={{ backgroundColor: 'transparent', width: '20%', height: '20%' }}
                                />
                            ))}

                            {/*** PROFILE SA EMPLOYEE */}
                            {employee && employee.length > 0 ? (
                                employee.map((image, imageIndex) => (
                                    <img
                                        key={imageIndex}
                                        className="mask mask-circle shadow-inner"
                                        src={image.employee_image || defaultImage}
                                        type="file"
                                        style={{ backgroundColor: 'transparent', width: '20%', height: '20%' }}
                                    />
                                ))
                            ) : (
                                <div>
                                {defaultImage}
                                </div>
                            )}

                            <FaUpload onClick={() => document.getElementById('uploadEmployeeProfile').showModal()} alt="Upload image" style={{ fontSize: "25px", color: "black" }} />
                            <div className="hero-content flex-col lg:flex-row py-0 px-0">
                                <div className="flex">
                                    <div className="">
                                        {employee && employee.map((image, index) => {
                                            <img
                                                key={index}
                                                src={image.employee_image}
                                                className="max-w-sm rounded-lg shadow-2xl"
                                            />
                                        })}
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
                                                    className="input input-bordered shadow-2xl text-2xl bg-black text-glass"
                                                    defaultValue={item.employee_fullname}
                                                    style={{ backgroundColor: 'transparent', color: "black", border: "none" }}
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
                                                    className="input input-bordered shadow-2xl text-2xl text-black"
                                                    defaultValue={item.employee_email}
                                                    style={{ backgroundColor: 'transparent', color: "black", border: "none" }}
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
                                                    style={{ backgroundColor: 'transparent', color: "black", border: "none" }}
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
                                                    className="input input-bordered shadow-2xl text-2xl bg-black text-black"
                                                    defaultValue={item.employee_role}
                                                    style={{ backgroundColor: 'transparent', color: "black", border: "none" }}
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
                                                    style={{ backgroundColor: 'transparent', color: "black", border: "none" }}
                                                    disabled
                                                />
                                            ))}
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-black text-2xl">Department BUG</span>
                                            </label>
                                            {employeeDepartmentFilteredData && employee.map((item, index) => (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    placeholder="Department"
                                                    className="input input-bordered shadow-2xl text-2xl bg-amber-100 text-black"
                                                    defaultValue={item.department_name}
                                                    style={{ backgroundColor: 'transparent', color: "black", border: "none" }}
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
                                                <select key={index} className="select shadow-2xl text-2xl w-full max-w-xs" style={{ backgroundColor: 'transparent', color: "black", border: "" }} disabled>
                                                    <option value="Active" selected={item.employee_status === 1}>{item.employee_status === 1 ? 'Active' : 'Inactive'}</option>
                                                    <option value="Inactive" selected={item.employee_status === 0}>{item.employee_status === 0 ? 'Inactive' : 'Active'}</option>
                                                </select>
                                            ))}
                                        </div>
                                        <br/>
                                        <hr />
                                        <br />
                                        
                                    </div>
                                    <button onClick={handleOpenModal}>
                                        <FaUserEdit onClick={() => document.getElementById('editEmployeeDetails').showModal()} style={{ fontSize: "40px", color: "black", marginLeft: "-65%", marginBottom: "-100" }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <center>
                        <span id="loading-infinity" className={`loading loading-infinity loading-lg ${isLoading ? 'block' : 'hidden'} spinner-blue`}></span>
                    </center>
                </>
            )}

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
        updateEmployee: (employeeId, updateEmployeeData) => dispatch(updateEmployee(employeeId, updateEmployeeData)),
        fetchImages: () => dispatch(fetchImages()),
        uploadAndUpdateImageEmployee: (formData, employeeId) => dispatch(uploadAndUpdateImageEmployee(formData, employeeId)),
        fetchDepartments: () => dispatch(fetchDepartments()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(EmployeePersonalDetails);