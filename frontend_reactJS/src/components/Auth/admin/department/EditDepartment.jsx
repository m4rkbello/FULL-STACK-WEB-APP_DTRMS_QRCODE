/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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

    const { departmentId } = useParams();
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
//USE-STATE SETTER SA DATA!
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
        }
    }

    const departmentCollectionArrays = props.departmentData?.departments?.data?.department;
    console.log("DATA", departmentCollectionArrays);

    function departmentsDetails(departmentCollectionArrays, departmentId) {
        let item = [];

        if (departmentCollectionArrays) {
            for (let ez = 0; ez < departmentCollectionArrays.length; ez++) {
                if (departmentCollectionArrays[ez].id == departmentId) {
                    item.push(departmentCollectionArrays[ez]);
                }
            }
        }
        return item;
    }

    const departments = departmentsDetails(departmentCollectionArrays, id);
    console.log("AYAW KOL", departments);


    if (props.loading) {
        return (
          <div>
          {/**
          <span className="bg-lime-400 loading loading-ball loading-xs"></span>
          <span className="bg-lime-400 loading loading-ball loading-sm"></span>
          <span className="bg-lime-400 loading loading-ball loading-md"></span>
          <span className="bg-lime-400 loading loading-ball loading-lg"></span>
          */}
          <div className="flex flex-col gap-6 w-96">
          <div className="skeleton h-48 w-full"></div>
          <div className="skeleton h-6 w-36"></div>
          <div className="skeleton h-6 w-full"></div>
          <div className="skeleton h-6 w-full"></div>
      </div>
          </div>
        );
      }

    return (
        <div>

            <dialog id="editEmployeeDetails" className="modal">
                <div className=" modal-box w-11/12 max-w-5xl bg-black">
                    <h3 className="font-bold text-3xl text-white">EDIT DEPARTMENT DETAILS</h3>

                    <div className="modal-action">
                        <form method="dialog" >
                            <div className="grid grid-cols-3 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lime-400 text-2xl">Department Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="dept_name"
                                        placeholder="Department name"
                                        className="input input-bordered shadow-2xl text-2xl text-lime-800"
                                        style={{ backgroundColor: 'black' }}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lime-400 text-2xl">Department Description</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="dept_description"

                                        placeholder="Department description"
                                        className="input input-bordered shadow-2xl text-2xl  text-lime-800"
                                        style={{ backgroundColor: 'black' }}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white text-2xl">Department Status</span>
                                    </label>
                                    <select
                                        name="employee_status"
                                        className="select shadow-2xl text-2xl w-full max-w-xs"
                                        style={{ backgroundColor: 'black', color: "#A3E636" }}
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
                                        <FaSave style={{ fontSize: "25px", color: "#A3E636", marginRight: "5px" }} />
                                    </button>
                                </div>

                                <div>
                                    <button onClick={handleCloseModal} className="btn bg-transparent" style={{ fontSize: "40px", color: "black", border: "none" }} >
                                        <IoMdCloseCircle style={{ fontSize: "25px", color: "#A3E636", marginRight: "5px" }} />
                                    </button>
                                </div>
                            </div>
                        </form>


                    </div>
                    <center>
                        <span id="loading-infinity" className={`loading loading-infinity loading-lg ${isLoading ? 'block' : 'hidden'} spinner-blue`}></span>
                    </center>
                </div>
            </dialog>

            <div className="hero bg-white rounded-t-lg">

                {Array.isArray(departmentCollectionArrays) && departmentCollectionArrays.length != 0 ? (
                    <>
                        <div className="hero-content max-w-full bg-white rounded-t-lg" style={{ maxHeight: "100px" }}>

                            <button style={{ marginRight: "80%", marginTop: "-190%" }} >
                                <Link to="/department">
                                    <FaLongArrowAltLeft style={{ fontSize: "50px", color: "black", marginRight: "90%", marginBottom: "65%" }} />
                                </Link>
                            </button>

                            <div className="hero-content max-w-full flex flex-col items-center" style={{ height: "200px" }}>

                                <div className="flex-1">

                                    <div className="grid grid-cols-1 gap-6">

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-white text-2xl">Department Name</span>
                                            </label>
                                            {departments && departments.map((item, index) => (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    placeholder="email"
                                                    className="input input-bordered shadow-2xl text-2xl bg-amber-100 text-black"
                                                    defaultValue={item.dept_name}
                                                    style={{ backgroundColor: 'transparent', color: "#A3E636", border: "none" }}
                                                    disabled
                                                />
                                            ))}
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-black text-2xl">Department Details</span>
                                            </label>
                                            {departments && departments.map((item, index) => (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    placeholder="email"
                                                    className="input input-bordered shadow-2xl text-2xl bg-amber-100 text-black"
                                                    defaultValue={item.dept_description}
                                                    style={{ backgroundColor: 'transparent', color: "black", border: "none" }}
                                                    disabled
                                                />
                                            ))}
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-black text-2xl">Department Status</span>
                                            </label>
                                            {departments && departments.map((item, index) => (
                                                <select key={index} className="select shadow-2xl text-2xl w-full max-w-xs" style={{ backgroundColor: 'transparent', color: "black", border: "" }} disabled>
                                                    <option value="Active" selected={item.dept_status_id === 1}>{item.dept_status_id === 1 ? 'Active' : 'Inactive'}</option>
                                                    <option value="Inactive" selected={item.dept_status_id === 0}>{item.dept_status_id === 0 ? 'Inactive' : 'Active'}</option>
                                                </select>
                                            ))}
                                        </div>
                                    </div>
                                    <button onClick={handleOpenModal}>
                                        <FaUserEdit onClick={() => document.getElementById('editEmployeeDetails').showModal()} style={{ fontSize: "40px", color: "#A3E636", marginRight: "80%", marginTop: "0%", marginBottom: "0%", marginLeft: "0%" }} />
                                    </button>
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
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        departmentData: state.departmentState,
        loading: state.departmentState.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDepartments: () => dispatch(fetchDepartments()),
        updateDepartment: (departmentId, updateDepartmentData) => dispatch(updateDepartment(departmentId, updateDepartmentData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDepartment);