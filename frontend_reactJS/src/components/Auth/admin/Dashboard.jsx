/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
//FETCH ALL DATAS GAMIT REDUXISM
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
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, PolarArea, Doughnut } from 'react-chartjs-2';
import { MoveLeft, FolderOpen, Component } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = (props) => {
  const ImageEmployeeGroup = '../../../../public/images/EmployeesGroup.png';
  const ImageRate = '../../../../public/images/PersonRates.png';
  const ImageDepartment = '../../../../public/images/department.png';
  const ImageOvertime = '../../../../public/images/overtime.png';
  const ImagePayroll = '../../../../public/images/payroll.png';
  const ImageUser = '../../../../public/images/user.png';
  const ImageAttendance = '../../../../public/images/attendance.png';


  const usersDataObjectCollections = props?.usersData?.data;

  function countAllUsersPopulations(usersDataObjectCollections) {
    let items = [];

    if (Array.isArray(usersDataObjectCollections) && usersDataObjectCollections.length > 0) {
      for (let ez = 0; ez < usersDataObjectCollections.length; ez++) {
        items.push(usersDataObjectCollections[ez]);
      }
    }

    return {
      items,
      count: items.length
    };
  }

  const resultCountAllUsersPopulation = countAllUsersPopulations(usersDataObjectCollections);

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

  const payrollsDataObjectCollection = props?.payrollsData?.payrolls?.data?.details;
  function countAllPayrollsPopulations(payrollsDataObjectCollection) {
    let items = [];

    if (Array.isArray(payrollsDataObjectCollection) && payrollsDataObjectCollection.length != 0) {
      for (let ez = 0; ez < payrollsDataObjectCollection.length; ez++) {
        items.push(payrollsDataObjectCollection[ez]);
      }
    }

    return {
      items,
      count: items.length
    };
  }

  const resultCountAllPayrollsPopulation = countAllPayrollsPopulations(payrollsDataObjectCollection);

  const attendanceDataObjectCollection = props?.attendancesData?.attendances?.data?.details;
  function countAllAttendancesPopulations(attendanceDataObjectCollection) {
    let items = [];

    if (Array.isArray(attendanceDataObjectCollection) && attendanceDataObjectCollection.length > 0) {
      for (let ez = 0; ez < attendanceDataObjectCollection.length; ez++) {
        items.push(attendanceDataObjectCollection[ez]);
      }
    }

    return {
      items,
      count: items.length
    };
  }

  const resultCountAllAttendancePopulation = countAllAttendancesPopulations(attendanceDataObjectCollection);

  const deductionDataObjectCollection = props?.deductionsData?.deductions?.data?.details;
  function countAllDeductionPopulations(deductionDataObjectCollection) {
    let items = [];

    if (Array.isArray(deductionDataObjectCollection) && deductionDataObjectCollection.length > 0) {
      for (let ez = 0; ez < deductionDataObjectCollection.length; ez++) {
        items.push(deductionDataObjectCollection[ez]);
      }
    }

    return {
      items,
      count: items.length
    };
  }

  const resultCountAllAttendancePopulations = countAllDeductionPopulations(deductionDataObjectCollection);

  const chartDataCollections = {
    labels: ['Users', 'Employees', 'Departments', 'Rates', 'Attendances', 'Payrolls', 'Overtimes', 'Deductions'],
    datasets: [
      {
        label: 'TOTAL',
        data: [
          resultCountAllUsersPopulation.count,
          resultcountAllEmployeesPopulations.count,
          resultCountAllDepartmentsPopulations.count,
          resultCountAllRatesPopulations.count,
          resultCountAllAttendancePopulation.count,
          resultCountAllPayrollsPopulation.count,
          resultCountAllDepartmentsPopulations.count,
          resultCountAllAttendancePopulations.count
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',   // Red
          'rgba(54, 162, 235, 0.6)',   // Blue
          'rgba(255, 206, 86, 0.6)',   // Yellow
          'rgba(75, 192, 192, 0.6)',   // Green
          'rgba(153, 102, 255, 0.6)',  // Purple
          'rgba(255, 159, 64, 0.6)',   // Orange
          'rgba(199, 199, 199, 0.6)',  // Gray
          'rgba(83, 102, 255, 0.6)',   // Indigo
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
          'rgba(83, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const BarChartNiChoi = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'DAILY TIME RECORD MONITORING SYSTEM | BAR GRAPH',

        font: {
          size: 25,
          weight: 'bold',
          family: 'Arial'
        },
        color: 'black' // This sets the color of the title
      }
    },
  };

  const DoughnutChartNiChoi = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'DAILY TIME RECORD MONITORING SYSTEM | DOUGHNUT GRAPH',

        font: {
          size: 25,
          weight: 'bold',
          family: 'Arial'
        },
        color: 'black' // This sets the color of the title
      }
    },
  };

  const PolarChartNiChoi = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'DAILY TIME RECORD MONITORING SYSTEM | POLARIZE GRAPH',

        font: {
          size: 25,
          weight: 'bold',
          family: 'Arial'
        },
        color: 'black' // This sets the color of the title
      }
    },
  };

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
    <div className="h-full mx-auto max-h-full w-full max-w-full glass p-4 shadow-xl">
      <div className="flex flex-wrap">
        <div>
          <div className="text-sm breadcrumbs mb-10 bg-transparent">
            <ul>
              <li>
                <MoveLeft />
                <Link to="/" className='hover:text-white'>Home</Link>
              </li>
              <li>
                <FolderOpen />
                <Link to="/employee/dashboard" className='hover:text-white'>Dashboard</Link>
              </li>
              <li>
                <span className="inline-flex gap-2 items-center">
                  <Component />
                  <Link to="" className='hover:text-white'>Dashboard Data</Link>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="diff aspect-[16/9] shadow-xl">
        <div className="diff-item-1">
          <div className="glass text-primary-content grid place-content-center text-9xl font-black shadow-xl">
            <Bar options={BarChartNiChoi} data={chartDataCollections} />
          </div>
        </div>
        <div className="diff-item-2">
          <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% grid place-content-center text-7xl font-black shadow-xl">BAR GRAPH</div>
        </div>
        <div className="diff-resizer"></div>
      </div>
      <br />
      <div className="diff aspect-[16/9] shadow-xl rounded-lg">
        <div className="diff-item-1">
          <div className="glass text-primary-content grid place-content-center text-7xl font-black shadow-xl px-5 py-5 rounded-lg">
            <Doughnut options={DoughnutChartNiChoi} data={chartDataCollections} />
          </div>
        </div>
        <div className="diff-item-2">
          <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% grid place-content-center text-7xl font-black shadow-xl">DOUGHNUT GRAPH</div>
        </div>
        <div className="diff-resizer"></div>
      </div>
      <br />
      <div className="diff aspect-[16/9] shadow-xl">
        <div className="diff-item-1">
          <div className="glass text-primary-content grid place-content-center text-7xl font-black shadow-xl px-5 py-5">
            <PolarArea options={PolarChartNiChoi} data={chartDataCollections} />
          </div>
        </div>
        <div className="diff-item-2">
          <div className="bg-base-200 grid place-content-center text-7xl font-black shadow-xl">POLARIZE DATA</div>
        </div>
        <div className="diff-resizer"></div>
      </div>
      <br />

      <div className="grid mx-auto grid-rows-4 grid-flow-col gap-8 pt-0 mt-0 pb-0 mb-0 shadow-xl rounded-lg">
        <div className="mx-auto card card-side m-text-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% shadow-xl">
          <figure className='px-7 py-2 mx-0 shadow-xl bg-white'>
            <img
              className='h-3/5'
              src="https://i.ibb.co/StdstKn/user.png"
              alt="User Image"
              />
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
              src="https://i.ibb.co/dgCWf4m/Employees-Group.png"
              alt="Employees-Group"
               />
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
              src="https://i.ibb.co/GHXyKbD/department.png"
              alt="Department Image"
            />
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
              src="https://i.ibb.co/BKHHBpt/Person-Rates.png"
              alt="Rate Image"
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
              src="https://i.ibb.co/dt4Zz3L/attendance.png"
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
              src="https://i.ibb.co/LgbMBkk/payroll.png"
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
              src="https://i.ibb.co/4gLfqsd/overtime.png"
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



