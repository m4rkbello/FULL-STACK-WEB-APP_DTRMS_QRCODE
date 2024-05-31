import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//REDUX ACTION/DISPATCH
import { addDepartment, fetchDepartments } from '../../../redux/actions/departmentAction';
//ICONS
import { FaUpload } from "react-icons/fa";
import { FaUserEdit, FaExpeditedssl, FaSave, FaLongArrowAltLeft } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
//TOASTER
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDepartment = (props) => {
    useEffect(() => {
        props.fetchDepartments();
    }, []);

    const [formDataAddDepartment, setFormDataAddDepartment] = useState({
        dept_name: '',
        dept_description: '',
        dept_status_id: '',
    });
    //FUNCTION PARA E-HOLD ANG DATA GIKAN SA ONCHANGGE
    const handleChangeAddDepartmentData = (ez) => {
        setFormDataAddDepartment({
            ...formDataAddDepartment,
            [ez.target.name]: ez.target.value,
        });
    };
    //FUNCTION PARA IPASA SA REDUX
    const handleAddDepartment = async (event) => {
        event.preventDefault();
        try {
            //ipasa ang data sa form na naa sa setter
            await props.addDepartment(formDataAddDepartment);
            
        } catch(error) {
            console.error(error);
        }
    }

    return (
      
        <div className="hero  bg-black rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg">
        <ToastContainer />
            <div className=" modal-box w-11/12 max-w-5xl glass">
                <h3 className="font-bold text-3xl text-black">ADD NEW DEPARTMENT</h3>
                    <form method="dialog" onSubmit={handleAddDepartment}>
                        <div className="grid grid-cols-3 gap-6">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black text-2xl">Department name</span>
                                </label>
                                <input
                                    name="dept_name" //key para sa form data
                                    onChange={handleChangeAddDepartmentData}
                                    type="text"
                                    placeholder="Software Dev. Dept"
                                    className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                                    style={{ backgroundColor: '#A3E636' }}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black text-2xl">Department Description</span>
                                </label>
                                <input
                                    type="text"
                                    name="dept_description"
                                    onChange={handleChangeAddDepartmentData}
                                    placeholder="For programmer department"
                                    className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                                    style={{ backgroundColor: '#A3E636' }}
                                />
                            </div>

                            <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black text-2xl">Department Status</span>
                            </label>
                            <select
                                name="dept_status_id"
                                onChange={handleChangeAddDepartmentData}
                                className="select input input-bordered shadow-2xl text-2xl text-amber-100"
                                style={{ backgroundColor: '#A3E636' }}
                            >
                                <option value="0">Inactive</option>
                                <option value="1">Active</option>
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
                                <Link to="/department" className="text-black">
                                    <button className="btn bg-transparent" style={{ fontSize: "40px", color: "black", border: "none" }} >
                                        <IoMdCloseCircle style={{ fontSize: "25px", color: "black", marginRight: "5px" }} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </form>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        departmentData: state.departmentState.department
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDepartments: () => dispatch(fetchDepartments()),
        addDepartment: (departmentData) => dispatch(addDepartment(departmentData)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDepartment)
