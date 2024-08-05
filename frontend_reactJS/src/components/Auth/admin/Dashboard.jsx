/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { ScanEye } from "lucide-react";





const Dashboard = (props) => {
  const ImageEmployeeGroup = '../../../../public/images/EmployeesGroup.png';
  const ImageRate = '../../../../public/images/PersonRates.png';
  const ImageDepartment = '../../../../public/images/department.png';
  const ImageOvertime = '../../../../public/images/overtime.png';
  const ImagePayroll = '../../../../public/images/payroll.png';
  const ImageUser = '../../../../public/images/user.png';
  const ImageAttendance = '../../../../public/images/attendance.png';


  console.log("DATA SA PROPS TANANS!", props);

  const usersDataObjectCollections = props?.usersData?.data;

  function countAllUsersPopulations(usersDataObjectCollections){
    let items = [];

    if(Array.isArray(usersDataObjectCollections) && usersDataObjectCollections.length > 0)  {
      for(let ez = 0; ez < usersDataObjectCollections.length; ez++) {
        items.push(usersDataObjectCollections[ez]);
      }
    }

    return {
      items,
      count: items.length
    };
  }

  const resultCountAllUsersPopulation = countAllUsersPopulations(usersDataObjectCollections);
  console.log("resultCountAllUsersPopulation", resultCountAllUsersPopulation);



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

  const payrollsDataObjectCollection = props?.payrollsData?.payrolls?.data?.details;

  function countAllPayrollsPopulations(payrollsDataObjectCollection)  {
    let items = [];

    if(Array.isArray(payrollsDataObjectCollection) && payrollsDataObjectCollection.length != 0) {
      for(let ez=0; ez < payrollsDataObjectCollection.length; ez++) {
        items.push(payrollsDataObjectCollection[ez]);
      }
    }

    return  {
      items,
      count: items.length
    };
  }

  const resultCountAllPayrollsPopulation = countAllPayrollsPopulations(payrollsDataObjectCollection);
  console.log("DATA SA resultCountAllPayrollsPopulation", resultCountAllPayrollsPopulation);

  const attendanceDataObjectCollection = props?.attendancesData?.attendances?.data?.details;

  function countAllAttendancesPopulations(attendanceDataObjectCollection) {
    let items = [];

    if(Array.isArray(attendanceDataObjectCollection) && attendanceDataObjectCollection.length > 0)  {
      for(let ez = 0; ez < attendanceDataObjectCollection.length; ez++) {
        items.push(attendanceDataObjectCollection[ez]);
      }
    }

    return  {
      items,
      count: items.length
    };
  }

  const resultCountAllAttendancePopulation = countAllAttendancesPopulations(attendanceDataObjectCollection);
  console.log("DATA SA resultCountAllAttendancePopulation", resultCountAllAttendancePopulation);


  const deductionDataObjectCollection = props?.deductionsData?.deductions?.data?.details;

  function countAllDeductionPopulations(deductionDataObjectCollection) {
    let items = [];

    if(Array.isArray(deductionDataObjectCollection) && deductionDataObjectCollection.length > 0){
      for(let ez = 0; ez < deductionDataObjectCollection.length; ez++){
        items.push(deductionDataObjectCollection[ez]);
      }
    }

    return {
      items,
      count: items.length
    };
  }

  const resultCountAllAttendancePopulations = countAllDeductionPopulations(deductionDataObjectCollection);
  console.log("DATAS SA resultCountAllAttendancePopulations", resultCountAllAttendancePopulations);

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
    <div className="h-full mx-auto max-h-full w-full max-w-full glass mx-auto p-4 shadow-xl rounded-lg">
      <div className="grid mx-auto grid-rows-4 grid-flow-col gap-8 pt-0 mt-0 pb-0 mb-0 shadow-xl rounded-lg">
      <div className="mx-auto card card-side m-text-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% shadow-xl">
          <figure className='px-7 py-2 mx-0 shadow-xl bg-white'>
            <img
              className='h-3/5'
              src={ImageUser}
              alt="User Image" />
          </figure>
          <div className="card-body justify-center">
            <span className="card-title text-3xl justify-center">USERS</span>
            <span className='text-7xl text-center text-center'>{resultCountAllUsersPopulation.count}</span>
            <br />
            <div className="card-actions justify-center">
              <Link to="/admin/users">
              <button className="btn glass text-center">
                View<ScanEye />
              </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto card card-side m-text-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% shadow-xl">
          <figure className='px-7 py-2 mx-0 shadow-xl bg-white'>
            <img
              className='h-3/5'
              src={ImageEmployeeGroup}
              alt="Attendance" />
          </figure>
          <div className="card-body justify-center">
            <span className="card-title text-3xl justify-center">EMPLOYEES</span>
            <span className='text-7xl text-center text-center'>{resultcountAllEmployeesPopulations.count}</span>
            <br />
            <div className="card-actions justify-center">
                <Link to="/employee/dashboard">
              <button className="btn glass text-center">
                View<ScanEye />
              </button>
                </Link>
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
          <div className="card-body justify-center">
            <span className="card-title text-3xl justify-center">DEPARTMENTS</span>
            <span className='text-7xl text-center justify-center'>{resultCountAllDepartmentsPopulations.count}</span>
            <br />
            <div className="card-actions justify-center">
              <Link to="/department">
              <button className="btn glass text-center">
                View<ScanEye />
              </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto card card-side bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% shadow-xl">
          <figure className='px-7 py-2 mx-0 shadow-xl bg-white'>
            <img
              className='h-3/5'
              src={ImageRate}
              alt="Rate Imaage"
            />
          </figure>
          <div className="card-body justify-center">
            <span className="card-title text-3xl justify-center">RATES</span>
            <span className='text-7xl text-center justify-center'>{resultCountAllRatesPopulations.count}</span>
            <br />
            <div className="card-actions justify-center">
              <Link to="/admin/rates">
              <button className="btn glass text-center">
                View<ScanEye />
              </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto card card-side m-text-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% shadow-xl">
          <figure className='px-7 py-2 mx-0 shadow-xl bg-white'>
            <img
              className='h-3/5'
              src={ImageAttendance}
              alt="Attendance" />
          </figure>
          <div className="card-body justify-center">
            <span className="card-title text-3xl justify-center">ATTENDANCES</span>
            <span className='text-7xl text-center text-center'>{resultCountAllAttendancePopulation.count}</span>
            <br />
            <div className="card-actions justify-center">
              <Link to="/employee/attendance">
              <button className="btn glass text-center">
                View<ScanEye />
              </button>
              </Link>
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
          <div className="card-body justify-center">
            <center>
              <span className="card-title text-3xl justify-center">PAYROLLS</span>
            </center>
            <span className='text-7xl text-center justify-center'>{resultCountAllPayrollsPopulation.count}</span>
            <br />
            <div className="card-actions justify-center">
              <Link to="/admin/payrolls">
              <button className="btn glass text-center">
                View<ScanEye />
              </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="card card-side bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% shadow-xl">
          <figure className='px-7 py-2 mx-0 shadow-xl bg-white'>
            <img
              src={ImageOvertime}
              className='h-3/5'
              alt="Overtime Image" />
          </figure>
          <div className="card-body justify-center">
            <center>
              <span className="card-title text-3xl justify-center">OVERTIMES</span>
            </center>
            <span className='text-7xl text-center justify-center'>{resultCountAllDepartmentsPopulations.count}</span>
            <br />
            <div className="card-actions justify-center">
              <Link to="/admin/overtimes">
              <button className="btn glass text-center">
                View<ScanEye />
              </button>
              </Link>
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
          <div className="card-body justify-center">
            <center>
              <span className="card-title text-3xl justify-center">DEDUCTIONS</span>
            </center>
            <span className='text-7xl text-center justify-center'>{resultCountAllAttendancePopulations.count}</span>
            <br />
            <div className="card-actions justify-center">
              <button className="btn glass text-center">
                View<ScanEye />
              </button>
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
    attendancesData: state.attendanceState,

    //LOADING SKELETON

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



