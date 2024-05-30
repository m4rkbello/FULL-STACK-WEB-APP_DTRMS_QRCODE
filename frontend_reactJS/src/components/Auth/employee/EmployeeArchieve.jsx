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
import { useEffect, useState } from 'react';

//REDUX
import { fetchEmployees, addEmployee } from '../../redux/actions/employeeAction';
import { fetchImages } from '../../redux/actions/imageAction';

//TOASTER
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ArchieveEmployee = (props) => {

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

    const imageCollectionArrays = props.imagesData?.images?.data;

    const getEmployeeImage = (imageCollectionArrays, employeesList) => {
        // Check if imageCollectionArrays is an array and not empty
        if (Array.isArray(imageCollectionArrays) && imageCollectionArrays.length > 0) {
            let item = [];
            // Filter the array based on the condition
            const employeeId = employeesList.length != 0 ? employeesList[0].id : null;
            console.log("DATA SA employeesList", employeeId);

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
            //ipasa ang data sa form na naa sa setter
            await props.addEmployee(formDataAddEmployee);

        } catch (error) {
            console.error(error);
        }
    }

    if (props.loading) {
        return <div>
            <span className="bg-lime-400 loading loading-ball loading-xs"></span>
            <span className="bg-lime-400 loading loading-ball loading-sm"></span>
            <span className="bg-lime-400 loading loading-ball loading-md"></span>
            <span className="bg-lime-400 loading loading-ball loading-lg"></span>
        </div>;
    }


    return (
        <div className="hero max-w-full">
            <ToastContainer />

            <dialog id="removeEmployee" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">REMOVE EMPLOYEE?</h3>
                    <p className="py-4">Are you sure you want to remove this Employee?</p>
                    <button className='btn bg-amber-100'>Yes</button>
                </div>
            </dialog>

            <div className="hero bg-black rounded-lg">
                <div className="bg-black">
                    <div className="flex flex-wrap">
                        <div>
                            <div className="text-sm breadcrumbs mb-10 bg-transparent">
                                <ul>
                                    <li>
                                        <a>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                                            <Link to="/" className='hover:text-lime-400'>
                                                Home
                                            </Link>
                                        </a>
                                    </li>

                                    <li>
                                        <a>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                                            <Link to="/archieve" className='hover:text-lime-400'>
                                                Employee Archive List
                                            </Link>
                                        </a>
                                    </li>

                                    <li>
                                        <span className="inline-flex gap-2 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                            <Link to="" className='hover:text-lime-400'>
                                                Employee Archieve Details
                                            </Link>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <span className="text-4xl font-black">
                        <center>
                            <div className='pb-5 glass'>
                                EMPLOPYEE ARCHIEVE LIST
                            </div>

                        </center>
                    </span>

                    <div className="overflow-x-auto  bg-black">
                        {Array.isArray(employeesCollectionArrays) && employeesCollectionArrays.length > 0 ? (
                            <table className="table py-10 px-10 my-10 mx-10 overflow-x-auto">
                                {/* head */}
                                <thead className=" text-red ">
                                    <tr className="md:table-row" style={{ fontSize: "15px", color: "white" }}>
                                        <th className="md:table-cell text-lime-400" >Avatar</th>
                                        <th className="md:table-cell text-lime-400">Id</th>
                                        <th className="md:table-cell text-lime-400">Fullname</th>
                                        <th className="md:table-cell text-lime-400">Email</th>
                                        <th className="md:table-cell text-lime-400">Contact No.</th>
                                        <th className="md:table-cell text-lime-400">Position</th>
                                        <th className="md:table-cell text-lime-400">Department</th>
                                        <th className="md:table-cell text-lime-400">Status</th>
                                        <th className="md:table-cell text-lime-400">Action</th>
                                    </tr>
                                </thead>
                                <tbody className='text-white'>

                                    {employeesList && employeesList.map((item, index) => (
                                        item.employee_status != 1 && (

                                            <tr key={index} className="md:table-row">
                                                <td className="md:table-cell">
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar">

                                                            <div className="mask mask-squircle w-12 h-12 shadow-2xl">
                                                                <img src={item.employee_image} />
                                                            </div>

                                                            {filterImage && filterImage.map((image, imageIndex) => (
                                                                <div key={imageIndex} className="mask mask-squircle w-12 h-12 shadow-2xl">
                                                                    <img src={image.img_url} alt={`Avatar ${image.img_name}`} />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="md:table-cell">
                                                    {item.id}
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
                                                    {item.employee_status === 1 ?
                                                        <RiAccountPinCircleFill
                                                            style={{ fontSize: "25px", color: "green" }}
                                                        /> : <MdOutlineNoAccounts
                                                            style={{ fontSize: "25px", color: "red" }}
                                                        />}
                                                </td>
                                                <td className="flex md:table-cell" >
                                                    <div className="flex">
                                                        <div className="flex-none mr-3">
                                                            <Link to={`/employee/details/${item.id}`} className="text-black">
                                                                <FaEye style={{ fontSize: "20px", color: "#A3E636", padding: "0%" }} />
                                                            </Link>

                                                        </div>
                                                        <div className="flex-none mr-3">
                                                            <MdAutoDelete
                                                                onClick={() => document.getElementById('removeEmployee').showModal()}
                                                                style={{ fontSize: "20px", color: "#A3E636" }} />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                        )
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
        imagesData: state.imageState,
        loading: state.employeeState.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEmployees: () => dispatch(fetchEmployees()),
        fetchImages: () => dispatch(fetchImages()),
        addEmployee: (AddEmployee) => dispatch(addEmployee(AddEmployee))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ArchieveEmployee);


