import { connect } from 'react-redux';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa6";
import { MdAutoDelete } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { HiStatusOnline } from "react-icons/hi";
import { MdOutlineNoAccounts } from "react-icons/md";
import { RiAccountPinCircleFill } from "react-icons/ri";

// DEPARTMENT ACTIONS/DISPATCH
import { fetchDepartments } from '../../../redux/actions/departmentAction';

const Department = (props) => {
  useEffect(() => {
    props.fetchDepartments();
  },[])

  const getAllDepartmentCollectionArrays = props?.departmentData?.departments?.data?.department;

  const getAllDepartments = (getAllDepartmentCollectionArrays) => {
    let items = [];
    if (Array.isArray(getAllDepartmentCollectionArrays)) {
      getAllDepartmentCollectionArrays.forEach(department => {
        items.push(department);
      });
    }
    return items;
  }
  
  const departmentArrays = getAllDepartments(getAllDepartmentCollectionArrays);

  if (props.loading) {
    return (
      <div>
        <span className="bg-lime-400 loading loading-ball loading-xs"></span>
        <span className="bg-lime-400 loading loading-ball loading-sm"></span>
        <span className="bg-lime-400 loading loading-ball loading-md"></span>
        <span className="bg-lime-400 loading loading-ball loading-lg"></span>
      </div>
    );
  }

  return (
    <div className='glass w-full'>
      <div className='bg-base-300  h-full'>
        <div className="overflow-auto max-h-96"> {/* Add this div */}
          {Array.isArray(departmentArrays) && departmentArrays.length > 0 ? (
            <table className="table bg-black w-full">
              <thead className='glass'>
                <tr>
                  <th className='text-1xl text-white'>DEPARTMENT NAME</th>
                  <th className='text-1xl text-white'>DEPARTMENT DESCRIPTION</th>
                  <th className='text-1xl text-white'>DEPARTMENT STATUS</th>
                  <th className='text-1xl text-white'>ACTION</th>
                  <th className='text-1xl text-white'>
                    <Link to="/department/add" className="text-black">
                      <IoIosPersonAdd style={{ height: "50px", width: "50px", color: "#A3E636" }} />
                    </Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {departmentArrays && departmentArrays.map((item, index) => (
                  <tr key={index}>
                    <td>{item.dept_name}</td>
                    <td>{item.dept_description}</td>
                <center>
                {item.dept_status_id === 1 ?
                  <RiAccountPinCircleFill
                      style={{ fontSize: "25px", color: "green", alignItems: "center" }}
                  /> : <MdOutlineNoAccounts
                      style={{ fontSize: "25px", color: "red", alignItems: "center" }}
                  />}
                </center>
                    <td>
                      <div className="flex">
                        <div className="flex-none mr-3">
                          <Link to={`/department/edit/${item.id}`} className="text-black">
                            <FaEye style={{ fontSize: "20px", color: "#A3E636", padding: "0%" }} />
                          </Link>
                        </div>
                        <div className="flex-none mr-3">
                          <MdAutoDelete
                            onClick={() => {
                              setDeactivateEmployeeId(item.id); 
                              document.getElementById('removeEmployee').showModal()
                            }}
                            style={{ fontSize: "20px", color: "#A3E636" }}
                          />
                        </div>
                      </div>
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
  )
}

const mapStateToProps = (state) => {
  return {
    departmentData: state.departmentState,
    loading: state.departmentState.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDepartments: () => dispatch(fetchDepartments()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Department);
