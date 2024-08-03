/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { useEffect } from 'react';
//FETCH ALL DATAS GAMIT REDUX
import { connect } from 'react-redux';
import { fetchUsers } from '../../redux/actions/userAction';
import { fetchEmployees } from '../../redux/actions/employeeAction';
import { fetchAttendances } from '../../redux/actions/attendanceAction';
import { fetchDepartments } from '../../redux/actions/departmentAction';
import { fetchPayrolls } from '../../redux/actions/payrollAction';
import { fetchDeductions } from '../../redux/actions/deductionAction';
import { fetchRates } from '../../redux/actions/rateAction';
import { fetchOvertimes } from '../../redux/actions/overtimeAction';


const Dashboard = (props) => {
  
  console.log("DATA SA PROPS TANANS!", props);



const employeeDataObjectCollections = props?.employeesData?.employees?.data;

function countAllEmployeesPopulations(employeeDataObjectCollections) {
  let items = [];

  if (Array.isArray(employeeDataObjectCollections) && employeeDataObjectCollections.length > 0) {
    for (let ez = 0; ez < employeeDataObjectCollections.length; ez++) {
      items.push(employeeDataObjectCollections[ez]);
    }
  }
  //FOR COUNT PURPOSES
  return {
    items,
    count: items.length
  };
}

const resultcountAllEmployeesPopulations = countAllEmployeesPopulations(employeeDataObjectCollections);
console.log("DATA SA RESULT!", resultcountAllEmployeesPopulations);


// const departmentDataObjectCollection = props?.empployee?.employee?.data;

// function countAllDepartmentPopulations

  useEffect(() => {
    props.fetchUsers();
    props.fetchEmployees();
    props.fetchDepartments();
    props.fetchAttendances();
    props.fetchPayrolls();
    props.fetchRates();
    props.fetchOvertimes();
    props.fetchDeductions();
  }, []);
  

  console.log("DATA SA TANANG PROPERTIES!", props);
  return (
    <div className="h-full max-h-full w-full max-w-ful glass mx-auto p-4 shadow-xl rounded-lg">

      <div className="grid grid-rows-2 grid-flow-col gap-8 pt-0 mt-0 pb-0 mb-0 shadow-xl rounded-lg">

        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://i.ibb.co/xL6Mbx0/m4rk.png"
              alt="Movie" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">New movie is released!</h2>
            <p>Click the button to watch on Jetflix app.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Watch</button>
            </div>
          </div>
        </div>

        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://i.ibb.co/xL6Mbx0/m4rk.png"
              alt="Movie" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">New movie is released!</h2>
            <p>Click the button to watch on Jetflix app.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Watch</button>
            </div>
          </div>
        </div>

        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://i.ibb.co/xL6Mbx0/m4rk.png"
              alt="Movie" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">New movie is released!</h2>
            <p>Click the button to watch on Jetflix app.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Watch</button>
            </div>
          </div>
        </div>

        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://i.ibb.co/xL6Mbx0/m4rk.png"
              alt="Movie" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">New movie is released!</h2>
            <p>Click the button to watch on Jetflix app.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Watch</button>
            </div>
          </div>
        </div>

      </div>
      <br />
      
      <div className="grid grid-rows-2 grid-flow-col gap-8 pt-0 mt-0 pb-0 mb-0 shadow-xl rounded-lg">

        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://i.ibb.co/xL6Mbx0/m4rk.png"
              alt="Movie" />
          </figure>
          <div className="card-body">
            <h1 className="card-title text-2xl">Employees</h1>
            <span className='text-7xl'>{resultcountAllEmployeesPopulations.count}</span>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Watch</button>
            </div>
          </div>
        </div>

        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://i.ibb.co/xL6Mbx0/m4rk.png"
              alt="Movie" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">New movie is released!</h2>
            <p>Click the button to watch on Jetflix app.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Watch</button>
            </div>
          </div>
        </div>

        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://i.ibb.co/xL6Mbx0/m4rk.png"
              alt="Movie" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">New movie is released!</h2>
            <p>Click the button to watch on Jetflix app.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Watch</button>
            </div>
          </div>
        </div>

        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://i.ibb.co/xL6Mbx0/m4rk.png"
              alt="Movie" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">New movie is released!</h2>
            <p>Click the button to watch on Jetflix app.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Watch</button>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    usersData: state.userState.users.data,
    employeesData: state.employeeState,
    departmentsData: state.departmentState,
    deductionsData: state.deductionState,
    payrollsData: state.payrollState,
    ratesData: state.rateState,
    overtimesData: state.overtimeState,
    // loading: state.employeeState.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchEmployees: () => dispatch(fetchEmployees()),
    fetchAttendances: () => dispatch(fetchAttendances()),
    fetchDepartments: () => dispatch(fetchDepartments()),
    fetchDeductions: () => dispatch(fetchDeductions()),
    fetchPayrolls: () => dispatch(fetchPayrolls()),
    fetchRates: () => dispatch(fetchRates()),
    fetchOvertimes: () => dispatch(fetchOvertimes()),
  };
};


// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);



