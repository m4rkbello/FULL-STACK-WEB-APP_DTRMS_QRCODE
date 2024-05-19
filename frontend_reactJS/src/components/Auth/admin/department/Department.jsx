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
        <span className="loading loading-ball loading-xs"></span>
        <span className="loading loading-ball loading-sm"></span>
        <span className="loading loading-ball loading-md"></span>
        <span className="loading loading-ball loading-lg"></span>
      </div>
    );
  }

  return (
    <div className='bg-base-200 w-full'>
      <div className='bg-base-300  h-full'>
        <div className="overflow-auto max-h-96"> {/* Add this div */}
          {Array.isArray(departmentArrays) && departmentArrays.length > 0 ? (
            <table className="table w-full">
              <thead className='bg-amber-100'>
                <tr>
                  <th className='text-1xl text-black'>DEPARTMENT NAME</th>
                  <th className='text-1xl text-black'>DEPARTMENT DESCRIPTION</th>
                  <th className='text-1xl text-black'>DEPARTMENT STATUS</th>
                  <th className='text-1xl text-black'>ACTION</th>
                  <th className='text-1xl text-black'>
                    <Link to="/department/add" className="text-black">
                      <IoIosPersonAdd style={{ height: "50px", width: "50px", color: "black" }} />
                    </Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {departmentArrays && departmentArrays.map((item, index) => (
                  <tr key={index}>
                    <td>{item.dept_name}</td>
                    <td>{item.dept_description}</td>
                    <td>{item.dept_status_id}</td>
                    <td>
                      <div className="flex">
                        <div className="flex-none mr-3">
                          <Link to={`/department/edit/${item.id}`} className="text-black">
                            <FaEye style={{ fontSize: "20px", color: "#fef3c6", padding: "0%" }} />
                          </Link>
                        </div>
                        <div className="flex-none mr-3">
                          <MdAutoDelete
                            onClick={() => {
                              setDeactivateEmployeeId(item.id); 
                              document.getElementById('removeEmployee').showModal()
                            }}
                            style={{ fontSize: "20px", color: "#fef3c6" }}
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
