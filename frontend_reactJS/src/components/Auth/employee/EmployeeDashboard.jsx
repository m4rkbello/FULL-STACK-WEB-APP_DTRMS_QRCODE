/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa6";
import { MdAutoDelete } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { HiStatusOnline } from "react-icons/hi";
import { MdOutlineNoAccounts } from "react-icons/md";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";
import { useEffect, useState } from 'react';
import { FaUserEdit, FaSave, FaLongArrowAltLeft } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { SiMicrosoftexcel } from "react-icons/si";
import { IoIosPrint } from "react-icons/io";
import { FcPrint, FcDataSheet, FcPlus, FcSearch, FcFolder, FcFile, FcCheckmark, FcViewDetails , FcEmptyTrash, FcCancel  } from "react-icons/fc";

//REDUX
import { fetchEmployees, addEmployee, deactivateEmployee } from '../../redux/actions/employeeAction';
import { fetchImages } from '../../redux/actions/imageAction';
import { fetchDepartments } from '../../redux/actions/departmentAction';
//TOASTER
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//GENERATE EXCEL FILE
import React, { useRef } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';


const EmployeeDashboard = (props) => {
    const defaultImage = '../../../../public/miming.jpg';
    const eyeView = '../../../../public/svg/view.png';

    const tableRef = useRef(null);

    const [formDataAddEmployee, setFormDataEmployeeAddEmployee] = useState({
        employee_fullname: '',
        employee_email: '',
        employee_contact_no: '',
        employee_role: '',
        employee_position: '',
        employee_department: '',
        employee_status: ''
    });

    useEffect(() => {
        props.fetchEmployees();
        props.fetchImages();
        props.fetchDepartments();
    }, []);

    const [deactivateEmployeeId, setDeactivateEmployeeId] = useState(null);

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
    // console.log("DATA SA employeesList", employeesList);

    const imageCollectionArrays = props.imagesData?.images?.data;
    // console.log("IMAGE COLLECTION ARRAYS", imageCollectionArrays);

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
        // console.log("DATA SA formDataAddEmployee", formDataAddEmployee);
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

    const departmentsCollectionArrays = props?.departmentsData?.departments?.data?.department;

    function fetchDepartments(departmentsCollectionArrays) {
        let item = [];

        if (departmentsCollectionArrays) {
            for (let ez = 0; ez < departmentsCollectionArrays.length; ez++) {
                item.push(departmentsCollectionArrays[ez]);
            }
        };
        return item;

    };

    const departments = fetchDepartments(departmentsCollectionArrays);


    function huhays() {
        const item = null;
        const dateFinal = Date.prototype.getDate();
        dateFinal.push(item);
        return item;
    }

    const dataDriven = huhays;

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

    if (props.loading) {
        return (
            <div className="flex flex-col gap-6 w-96">
                <div className="skeleton h-48 w-full"></div>
                <div className="skeleton h-6 w-36"></div>
                <div className="skeleton h-6 w-full"></div>
                <div className="skeleton h-6 w-full"></div>
            </div>
        );
    }

    return (
        <div className="hero max-w-full rounded-l-lg rounded-t-lg rounded-r-lg rounded-b-lg">
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
                                    // style={{ backgroundColor: '#A3E636' }}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white text-2xl">Department</span>
                                    </label>
                                    <select
                                        name="employee_department"
                                        onChange={(e) => setFormDataEmployeeAddEmployee(prevState => ({ ...prevState, employee_department: e.target.value }))}
                                        className="input input-bordered shadow-2xl text-2xl text-black border-1 glass border-glass rounded-se-3xl shadow-lime-400/40"
                                    // style={{ backgroundColor: '#A3E636' }}
                                    >
                                        {departments.map((item, index) => (
                                            <option key={index} value={item.id}>
                                                {item.dept_name}
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
                                    // style={{ backgroundColor: '#A3E636' }}
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
                                    // style={{ backgroundColor: '#A3E636' }}
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
                                    // style={{ backgroundColor: '#A3E636' }}
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
                                        name="employee_status"
                                        onChange={(e) => setFormDataEmployeeAddEmployee(prevState => ({ ...prevState, employee_status: e.target.value }))}
                                        className="select input input-bordered shadow-2xl text-2xl text-black glass drop-shadow-xl"
                                        value={formDataAddEmployee.employee_status}
                                    // style={{ backgroundColor: '#A3E636' }}
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

            <div className="hero bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-lg">
                <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-lg">
                    <div className="flex flex-wrap">
                        <div>
                            <div className="text-sm breadcrumbs mb-10 bg-transparent">
                                <ul>
                                    <li>
                                        <FcFolder 
                                        style={{ 
                                                height: "120%",
                                                width: "120%",
                                                boxShadow: "0 10px 15px rgba(4, 4, 4, 0.23)", 
                                               }} 
                                        />
                                        <Link to="/" className='hover:text-white'>Home</Link>
                                    </li>
                                    <li>
                                        <FcFolder 
                                        style={{ 
                                                height: "120%",
                                                width: "120%",
                                                boxShadow: "0 10px 15px rgba(4, 4, 4, 0.23)", 
                                            }} 
                                        />
                                        <Link to="/employee/dashboard" className='hover:text-white'>Employee Dashboard</Link>
                                    </li>
                                    <li>
                                        <span className="inline-flex gap-2 items-center">
                                            <FcFile  
                                            style={{ 
                                                    height: "120%",
                                                    width: "120%",
                                                    boxShadow: "0 10px 15px rgba(4, 4, 4, 0.23)", 
                                                }} 
                                            />
                                            <Link to="" className='hover:text-white'>Employee Personal Details</Link>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row">
                        <div class="basis-1/2 flex justify-start">         
                        <span className="inline-grid grid-cols-2 gap-1">
                            <span>
                                <input
                                    type="text"
                                    placeholder="Search Employee"
                                    className="border-b-4 border-black rounded text-white"
                                    style={{ backgroundColor: "transparent", color: "white" }}
                                />
                            </span>
                            <span>
                                <FcSearch
                                    style={{
                                            backgroundColor: "transparent",
                                            color: "black",
                                            height: "30px",
                                            width: "30px",
                                       
                                          }}
                                />
                            </span>
                        </span>
                        </div>
                        <div class="basis-1/4"></div>
                        <div class="basis-1/4 flex justify-end mr-5"> 
                        <div className='mx-4'>
                            <DownloadTableExcel
                                filename="ExportEmployee"
                                sheet="users"
                                currentTableRef={tableRef.current}
                            >
                                <button>
                                <FcDataSheet
                                style={{ 
                                        height: "200%",
                                        width: "200%",
                                      
                                       }} 
                                 /></button>
                            </DownloadTableExcel>
                        </div>
                            <div className='mx-2'>
                                <button onClick={printEmployeeDashboard}>
                                <FcPrint
                                style={{ 
                                        height: "200%",
                                        width: "200%", 
                                       }} 
                                /></button>
                            </div>

                        </div>
                    </div>
                    <span className="text-3xl font-black">
                        <center>
                            <div className='pb-5 pt-5 glass'>
                                EMPLOYEE DASHBOARD
                                <FcPlus

                                    onClick={() => document.getElementById('addEmployeeModal').showModal()}
                                    style={{ 
                                            fontSize: "50px",
                                            color: "black",
                                            marginLeft: "92%",
                                            marginRight: "0%",
                                            marginBottom: "0%",
                                            marginTop: "-4%",
                                            paddingTop: '0',
                                            paddingLeft: '0',
                                            paddingRight: '0',
                                            paddingBottom: '0',
                                           }}
                                />
                            </div>
                        </center>
                    </span>
                    <div className="">
                        <div className='p-0'>
                            {Array.isArray(employeesCollectionArrays) && employeesCollectionArrays.length > 0 ? (
                                <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                    <table id="employeesDataList" ref={tableRef} className="table glass border-2">
                                        <thead className=" text-white">
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
                                                item.employee_status != 0 && (
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
                                                        <td className="md:table-cell">5</td>
                                                        <td className="md:table-cell">{item.employee_position}</td>
                                                        <td className="md:table-cell">
                                                            {item.employee_status === 1 ?
                                                                <FcCheckmark  
                                                                style = {{ 
                                                                    height: "50%",
                                                                    width: "50%",
                                                                    marginTop: "20px",
                                                                  
                                                                    }} 
                                                  
                                                                /> 
                                                                : <FcCancel
                                                                style = {{ 
                                                                    height: "50%",
                                                                    width: "50%",
                                                                    margin: "0%",
                                                                    padding: "0%"  
                                                                    }} 
                                                                />
                                                            }
                                                        </td>
                                                        <td className="flex md:table-cell">
                                                            <div className="flex">
                                                                <div className="flex-none mr-3">
                                                                    <Link to={`/employee/details/${item.id}`} className="text-black">
                                                                        <FcViewDetails 
                                                                        style = {{ 
                                                                            height: "200%",
                                                                            width: "200%",
                                                              
                                                                            }} 
                                                                           />
                                                                    </Link>
                                                                </div>
                                                                <div className="flex-none mr-3">
                                                                    <FcEmptyTrash
                                                                        style = {{ 
                                                                            height: "200%",
                                                                            width: "200%", 
                                                               
                                                                            }} 

                                                                        onClick={() => {
                                                                            setDeactivateEmployeeId(item.id);
                                                                            document.getElementById('removeEmployee').showModal()
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
                                <div className="mockup-browser  border border-t-4 pb-10 pt-10">
                                <div className="mockup-browser-toolbar">
                                  <div className="input text-black-400">https://markbello.com</div>
                                </div>
                                <div className="flex justify-center px-4 py-16 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                                  <span
                                    style={{ fontSize: '50px', fontWeightL: 'Bolder' }}
                                  >
                                    <b>
                                      AYAW NA PANGITAA ANG WALA!
                                    </b>
                                  </span>
                                </div>
                              </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDashboard);


