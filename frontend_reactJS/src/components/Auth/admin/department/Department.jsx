import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//ICONS
import { FaEye } from 'react-icons/fa6';
import { MdAutoDelete } from 'react-icons/md';
import { IoIosPersonAdd } from 'react-icons/io';
import { HiStatusOnline } from 'react-icons/hi';
import { MdOutlineNoAccounts } from 'react-icons/md';
import { RiAccountPinCircleFill } from 'react-icons/ri';
import { IoSearch } from "react-icons/io5";
import { TiArrowRightThick } from "react-icons/ti";
import { TiArrowLeftThick } from "react-icons/ti";
//REDUX
import { fetchDepartments } from '../../../redux/actions/departmentAction';

const Department = (props) => {
  const [searchDepartment, setSearchDepartment] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [departmentsPerPage] = useState(5);

  useEffect(() => {
    props.fetchDepartments();
  }, []);

  useEffect(() => {
    const allDepartments = getAllDepartments(props?.departmentData?.departments?.data?.department);
    setFilteredDepartments(allDepartments);
  }, [props.departmentData]);

  useEffect(() => {
    const allDepartments = getAllDepartments(props?.departmentData?.departments?.data?.department);
    const filtered = allDepartments.filter(department =>
      department.dept_name.toLowerCase().includes(searchDepartment.toLowerCase())
    );
    setFilteredDepartments(filtered);
    setCurrentPage(1); // Reset to the first page on new search
  }, [searchDepartment]);

  const getAllDepartments = (departmentsArray) => {
    return Array.isArray(departmentsArray) ? departmentsArray : [];
  };

  // Get current departments
  const indexOfLastDepartment = currentPage * departmentsPerPage;
  const indexOfFirstDepartment = indexOfLastDepartment - departmentsPerPage;
  const currentDepartments = filteredDepartments.slice(indexOfFirstDepartment, indexOfLastDepartment);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Create an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredDepartments.length / departmentsPerPage); i++) {
    pageNumbers.push(i);
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
    <div className="hero bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg">
      <div className="overflow-auto max-h-screen">
        <div className="flex flex-wrap">
          <div>
            <div className="text-sm breadcrumbs mb-2 bg-transparent">
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
                    <Link to="/department" className='hover:text-lime-400'>
                      Department
                    </Link>
                  </a>
                </li>
                <li>
                  <span className="inline-flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    <Link to="" className='hover:text-lime-400'>
                      Department Details
                    </Link>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <span className="inline-grid grid-cols-2 gap-4 py-5">
          <span>
            <input
              type="text"
              placeholder="Search Departments"
              value={searchDepartment}
              onChange={(e) => setSearchDepartment(e.target.value)}
              className="p-2 m-2 border-b-4 bg-black rounded text-white"
              style={{ backgroundColor: "transparent", color: "white" }}
            />
          </span>
          <span>
            <IoSearch
              style={{
                backgroundColor: "transparent",
                color: "black",
                height: "30px",
                width: "30px",
                marginTop: "15px",
                marginLeft: "-20px"
              }}
            />
          </span>
        </span>
        {filteredDepartments.length > 0 ? (
          <>
            <span className="text-4xl font-black">
              <center>
                <div className=''>
                
                  <div> 
             
                </div>
                </div>

          <div class="flex flex-row pb-5 pt-5 glass">
            <div class="basis-1/4"></div>
            <div class="basis-1/2">DEPARTMENTS LIST</div>
            <div class="basis-1/4">
              <Link to="/department/add" className="text-black">
                <IoIosPersonAdd style={{ height: "50px",  width: "50px", color: "indigo" }} />
              </Link>
            </div>
          </div>
                
              </center>
            </span>
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <table className="table table-lg bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
              <thead className="bg-black pt-5 pb-5 border-2 border-black">
                <tr className='table-lg'>
                  <th className="text-1xl text-white ">NO</th>
                  <th className="text-1xl text-white ">DEPARTMENT NAME</th>
                  <th className="text-1xl text-white">DEPARTMENT DESCRIPTION</th>
                  <th className="text-1xl text-white">DEPARTMENT STATUS</th>
                  <th className="text-1xl text-white">ACTION</th>
              
                </tr>
              </thead>
              <tbody>
                {currentDepartments.map((item, index) => (
                  <tr key={index}>
                    <td>{indexOfFirstDepartment + index + 1}</td>
                    <td>{item.dept_name}</td>
                    <td>{item.dept_description}</td>
                    <td>
                      <center>
                        {item.dept_status_id === 1 ? (
                          <RiAccountPinCircleFill
                            style={{ fontSize: "25px", color: "green", alignItems: "center" }}
                          />
                        ) : (
                          <MdOutlineNoAccounts
                            style={{ fontSize: "25px", color: "red", alignItems: "center" }}
                          />
                        )}
                      </center>
                    </td>
                    <td>
                      <div className="flex">
                        <div className="flex-none mr-3">
                          <Link to={`/department/edit/${item.id}`} className="text-black">
                            <FaEye style={{ fontSize: "20px", color: "black", padding: "0%" }} />
                          </Link>
                        </div>
                        <div className="flex-none mr-3">
                          <MdAutoDelete
                            onClick={() => {
                              setDeactivateEmployeeId(item.id);
                              document.getElementById('removeEmployee').showModal();
                            }}
                            style={{ fontSize: "20px", color: "black" }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>

  

            <div class="flex flex-row">
  <div class="basis-1/4">  <TiArrowLeftThick
  onClick={() => paginate(currentPage - 1)}
  disabled={currentPage === 1}
  style={{ fontSize: "", color: "black", width: '',  height: ''  }}
/></div>
  <div class="basis-1/4"><TiArrowRightThick
  onClick={() => paginate(currentPage + 1)}
  disabled={currentPage === pageNumbers.length}
  style={{ fontSize: "", color: "black", width: '',  height: '' }}
  /></div>
</div>
          </>
        ) : (
      <div className="mockup-browser mt-10 mb-10 border border-t-4 ">
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
  );
};

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
