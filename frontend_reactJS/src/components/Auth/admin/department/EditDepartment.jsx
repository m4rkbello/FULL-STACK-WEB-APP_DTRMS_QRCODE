/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, useNavigate,Link } from 'react-router-dom';
//DISPATCH-ACTION REDUX-CORE
import { fetchDepartments, updateDepartment } from '../../../redux/actions/departmentAction';
//ICONS
import { FaUpload } from "react-icons/fa6";
import { FaUserEdit, FaSave, FaLongArrowAltLeft } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
//TOASTER
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditDepartment = (props) => {
    
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    console.log("DATA SA FETCH DEPARTMENT", props);
    console.log("SELECTED ID SA USE PARAMS", id);

    useEffect(() => {
        props.fetchDepartments();
    }, []);

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

    const [formDataUpdateDepartment, setFormDataUpdateDepartment] = useState({
        dept_name: '',
        dept_description: '',
        dept_status_id: '',
    });

    const handleChangeUpdateData = (ez) => {
        setFormDataUpdateDepartment({
            ...formDataUpdateDepartment,
            [ez.target.name]: ez.target.value,
        });
    };

    const handleSubmitDepartmentData = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            props.updateEmployee(id, formDataUpdateDepartment);
        } catch (error) {
            window.alert("ERROR");
        };
    }
    
    const departmentCollectionArrays = props.departmentData?.departments?.data?.department;
    
    function departmentsDetails(departmentCollectionArrays, id) {
        let item = [];

        if (departmentCollectionArrays) {
            for (let ez = 0; ez < departmentCollectionArrays.length; ez++) {
                if (departmentCollectionArrays[ez].id == id) {
                    item.push(departmentCollectionArrays[ez]);
                }
            }
        }
        return item;
    }
    
    const departments = departmentsDetails(departmentCollectionArrays, id);
    // console.log("AYAW KOL", departments);

    if (props.loading) {
        return <div>
        {/**
        <span className="loading loading-ball loading-xs"></span>
        <span className="loading loading-ball loading-sm"></span>
        <span className="loading loading-ball loading-md"></span>
        <span className="loading loading-ball loading-lg"></span>
        */}
        <progress className="progress w-56"></progress>
        </div>;
      }

    return (
        <div>
        <dialog id="addEmployeeModal" className="modal ">
        <div className="modal-box w-11/12 max-w-5xl bg-amber-100">
            <h3 className="font-bold text-3xl text-black">ADD EMPLOYEE</h3>
            <div className="modal-action">
                <form method="dialog">
                    <div className="grid grid-cols-3 gap-6">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black text-2xl">Fullname</span>
                            </label>
                            <input
                              
                                name="employee_fullname" //key para sa form data
                                type="text"
                                placeholder="Enter Fullname"
                                className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                                // onChange={(e) => setFormDataEmployeeAddEmployee(prevState => ({ ...prevState, employee_fullname: e.target.value }))}
                                // value={formDataAddEmployee.employee_fullname}
                                style={{ backgroundColor: 'black' }}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black text-2xl">Email</span>
                            </label>
                            <input
                                key=""
                                name="employee_fullname" //key para sa form data
                                type="text"
                                placeholder="Enter email"
                                className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                                // onChange={(e) => setFormDataEmployeeAddEmployee(prevState => ({...prevState, employee_email: e.target.value}))}
                                // value={formDataAddEmployee.employee_email}    
                                style={{ backgroundColor: 'black' }}
                            />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black text-2xl">Department</span>
                        </label>
                        <input
                            key=""
                            name="employee_department" //key para sa form data
                            type="text"
                            placeholder="Enter email"
                            className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                            // onChange={(e) => setFormDataEmployeeAddEmployee(prevState => ({...prevState, employee_department: e.target.value}))}
                            // value={formDataAddEmployee.employee_department}    
                            style={{ backgroundColor: 'black' }}
                        />
                    </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black text-2xl">Contact No.</span>
                            </label>
                            <input
        
                                name="employee_contact_no" //key para sa form data
                                type="text"
                                placeholder="Enter contact no."
                                className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                                // onChange={(e) => setFormDataEmployeeAddEmployee(prevState =>({...prevState, employee_contact_no: e.target.value}))}
                                // value={formDataAddEmployee.employee_contact_no}
                                style={{ backgroundColor: 'black' }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black text-2xl">Position</span>
                            </label>
                            <input
                            
                                name="employee_position" //key para sa form data
                                type="text"
                                placeholder="Enter Position"
                                className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                                // onChange={(e) => setFormDataEmployeeAddEmployee(prevState => ({...prevState, employee_position: e.target.value}))}
                                // value={formDataAddEmployee.employee_position}
                                style={{ backgroundColor: 'black' }}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black text-2xl">Role</span>
                            </label>
                            <input
                          
                                name="employee_role" //key para sa form data
                                type="text"
                                placeholder="Enter role"
                                className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                               
                                
                                // value={formDataAddEmployee.employee_role}
                                style={{ backgroundColor: 'black' }}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black text-2xl">Status</span>
                            </label>
                            <input
                              
                                name="employee_status" //key para sa form data
                                type="text"
                                placeholder="Enter status(Active/Inactive)"
                                className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                                // onChange={(e) => setFormDataEmployeeAddEmployee(prevState => ({...prevState, employee_status: e.target.value}))}
                                // value={formDataAddEmployee.employee_status}
                                style={{ backgroundColor: 'black' }}
                            />
                        </div>
                    </div>

                    <br />
                    <div className='flex '>
                        <div className='flex-initial pr-2'>
                            <button type="submit" className="btn bg-black text-amber-100">Add</button>
                        </div>
                        <div className='flex-initial'>
                            <button className="btn bg-black text-amber-100">Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </dialog>

    
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        departmentData: state.departmentState,
        loading: state.departmentState.loading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDepartments: () => dispatch(fetchDepartments()),
        updateDepartment: (deptartmentId, updateDepartmentData) => dispatch(updateDepartment(deptartmentId, updateDepartmentData)),
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(EditDepartment);