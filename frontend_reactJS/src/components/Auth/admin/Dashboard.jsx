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
  const ImageEmployeeGroup = '../../../../public/images/EmployeesGroup.png';
  const ImageRate = '../../../../public/images/PersonRates.png';
  const ImageDepartment = '../../../../public/images/department.png';
  const ImageOvertime = '../../../../public/images/overtime.png';
  const ImagePayroll = '../../../../public/images/payroll.png';

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


  const ratesDataObjectCollection = props?.ratesData?.rates;

  function countAllRatesPopulations(ratesDataObjectCollection) {
    let items = [];

    if (Array.isArray(ratesDataObjectCollection) && ratesDataObjectCollection.length != 0) {
      for (let ez = 0; ez < ratesDataObjectCollection.length; ez++) {
        items.push(ratesDataObjectCollection[ez]);
      }
    }

    return {
      items,
      count: items.length
    };
  }

  const resultCountAllRatesPopulations = countAllRatesPopulations(ratesDataObjectCollection);
  console.log(resultCountAllRatesPopulations);

  
  const departmentsDataObjectCollection = props?.departmentsData?.departments?.data?.details;

  function countAllDepartmentsPopulations(departmentsDataObjectCollection) {
    let items = [];
  
    if (Array.isArray(departmentsDataObjectCollection) && departmentsDataObjectCollection.length !== 0) {
      for (let i = 0; i < departmentsDataObjectCollection.length; i++) {
        items.push(departmentsDataObjectCollection[i]);
      }
    }
  
    return {
      items,
      count: items.length
    };
  }
  
  const resultCountAllDepartmentsPopulations = countAllDepartmentsPopulations(departmentsDataObjectCollection);
  console.log("MAO NI resultCountAllDepartmentsPopulations", resultCountAllDepartmentsPopulations);



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

      <div className="card card-side bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% shadow-xl">
        <figure className='px-7 py-2 mx-0 shadow-xl bg-white'>
            <img
              className='h-3/5'
              src={ImageEmployeeGroup}
              alt="Employee Group" />
          </figure>
          <div className="card-body">
            <span className="card-title text-3xl">Employees</span>
            <span className='text-7xl text-center'>{resultcountAllEmployeesPopulations.count}</span>
            <div className="card-actions justify-center">
              <button className="btn btn-primary">View</button>
            </div>
          </div>
        </div>

        <div className="card card-side bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% shadow-xl">
        <figure className='px-7 py-2 mx-0 shadow-xl bg-white'>
            <img
              className='h-3/5'
              src={ImageRate}
              alt="Rate Imaage"
             />
          </figure>
          <div className="card-body">
            <span className="card-title text-3xl">Rates</span>
            <span className='text-7xl text-center'>{resultCountAllRatesPopulations.count}</span>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">View</button>
            </div>
          </div>
        </div>

        <div className="card card-side bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% shadow-xl">
        <figure className='px-7 py-2 mx-0 shadow-xl bg-white'>
            <img
              className='h-3/5'
              src={ImageDepartment}
              alt="Department Image" />
          </figure>
          <div className="card-body">
            <span className="card-title text-3xl">Departments</span>
            <span className='text-7xl text-center'>{resultCountAllDepartmentsPopulations.count}</span>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">View</button>
            </div>
          </div>
        </div>

        <div className="card card-side bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% shadow-xl">
          <figure className='px-7 py-2 mx-0 shadow-xl bg-white'>
            <img
              src={ImagePayroll}
              className='h-3/5'
              alt="Overtime Image" />
          </figure>
          <div className="card-body">
            <span className="card-title text-3xl">Departments</span>
            <span className='text-7xl text-center'>{resultCountAllDepartmentsPopulations.count}</span>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">View</button>
            </div>
          </div>
        </div>

      </div>
      <br />



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
    loading: state.employeeState.loading,
    
    
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



