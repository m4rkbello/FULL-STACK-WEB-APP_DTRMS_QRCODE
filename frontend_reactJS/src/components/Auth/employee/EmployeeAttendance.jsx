/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//ICONS
import { FcFolder, FcOpenedFolder, FcPrevious } from "react-icons/fc";
//REDUXISM
import { fetchAttendances } from '../../redux/actions/attendanceAction';
//TOASTER
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//ANALYTICS
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { DatePicker } from 'react-datepicker'; // You may need to install this package
import "react-datepicker/dist/react-datepicker.css";

// Register all the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmployeeAttendance = ({ fetchAttendances, attendancesData }) => {
  const [startDate, setStartDate] = useState(new Date()); // Default to current date
  const [endDate, setEndDate] = useState(new Date()); // Default to current date

  useEffect(() => {
    fetchAttendances();
  }, [fetchAttendances]);

  const attendanceDataObjectCollection = attendancesData?.attendances?.data?.details;

  // Function to transform data by month within a specific date range
  function getMonthlyAttendanceCounts(attendanceData, start, end) {
    const monthlyCounts = Array(12).fill(0); // Initialize an array for 12 months

    if (Array.isArray(attendanceData) && attendanceData.length > 0) {
      attendanceData.forEach(attendance => {
        const createdAt = new Date(attendance.created_at); // Use the created_at field

        if (createdAt >= start && createdAt <= end) {
          const month = createdAt.getMonth(); // Get the month (0-11)
          monthlyCounts[month] += 1; // Increment the count for the month
        }
      });
    }

    return monthlyCounts;
  }

  const filteredAttendanceCounts = getMonthlyAttendanceCounts(attendanceDataObjectCollection, startDate, endDate);

  const chartDataCollections = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Total Attendance',
        data: filteredAttendanceCounts,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  };

  const BarChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Attendance',
        font: {
          size: 20,
          weight: 'bold',
          family: 'Arial'
        },
        color: 'black'
      }
    },
  };

  return (
    <div className='h-full max-h-full w-full max-w-full glass mx-auto p-4 shadow-slate-900/100 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg'>
      <div className="flex flex-col bg-transparent mb-10 shadow-slate-900/100">
        <div className="flex items-center text-sm breadcrumbs">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className='flex items-center hover:text-white'>
                <FcPrevious style={{ height: "2rem", width: "2rem" }} />
                <span className="ml-2">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/employee/dashboard" className='flex items-center hover:text-white'>
                <FcFolder style={{ height: "2rem", width: "2rem" }} />
                <span className="ml-2">Rates</span>
              </Link>
            </li>
            <li>
              <Link to="" className='flex items-center hover:text-white'>
                <FcOpenedFolder style={{ height: "2rem", width: "2rem" }} />
                <span className="ml-2">Data</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex mb-4">
        <div className="mr-4">
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>
      <div className="diff aspect-[16/9] shadow-xl">
        <div className="diff-item-1">
          <div className="glass text-primary-content grid place-content-center text-9xl font-black shadow-xl">
            <Bar options={BarChartOptions} data={chartDataCollections} />
          </div>
        </div>
        <div className="diff-item-2">
          <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% grid place-content-center text-7xl font-black shadow-xl">BAR GRAPH</div>
        </div>
        <div className="diff-resizer"></div>
      </div>
      <ToastContainer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    attendancesData: state.attendanceState,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAttendances: () => dispatch(fetchAttendances()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAttendance);
