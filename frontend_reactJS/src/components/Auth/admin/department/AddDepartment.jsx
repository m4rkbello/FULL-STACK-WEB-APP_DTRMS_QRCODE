import React, { useEffect } from 'react'
import { connect } from 'react-redux';

//REDUX ACTION/DISPATCH
import { addDepartment, fetchDepartments } from '../../../redux/actions/departmentAction';

//ICONS
import { FaUpload } from "react-icons/fa";
import { FaUserEdit, FaExpeditedssl, FaSave, FaLongArrowAltLeft } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";


const AddDepartment = (props) => {

    useEffect(() => {
        props.fetchDepartments();
    }, []);


    return (
        <div>
            <div className=" modal-box w-11/12 max-w-5xl bg-amber-100">
                <h3 className="font-bold text-3xl text-black">ADD NEW DEPARTMENT</h3>
                    <form method="dialog">
                        <div className="grid grid-cols-3 gap-6">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black text-2xl">Department name</span>
                                </label>
                                <input
                                    name="dept_name" //key para sa form data
                                    // onChange={handleChangeUpdateData}
                                    type="text"
                                    placeholder="text"
                                    className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                                    style={{ backgroundColor: 'black' }}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black text-2xl">Department Description</span>
                                </label>
                                <input
                                    type="text"
                                    name="dept_description"
                                    // onChange={handleChangeUpdateData}
                                    placeholder="contact number"
                                    className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                                    style={{ backgroundColor: 'black' }}
                                />

                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black text-2xl">Department Status</span>
                                </label>
                                <input
                                    // key={index}
                                    type="text"
                                    name="dept_status_id"
                                    // onChange={handleChangeUpdateData}
                                    placeholder="Role"
                                    className="input input-bordered shadow-2xl text-2xl  text-amber-100"
                                    style={{ backgroundColor: 'black' }}
                                />
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
                            <button className="btn bg-transparent" style={{ fontSize: "40px", color: "black", border: "none" }} >
                                <IoMdCloseCircle style={{ fontSize: "25px", color: "black", marginRight: "5px" }} />
                            </button>
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
