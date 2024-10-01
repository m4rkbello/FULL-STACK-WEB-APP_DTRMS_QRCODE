/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, memo } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// ICONS
import { FcFolder, FcOpenedFolder, FcPrevious, FcCancel } from "react-icons/fc";
// REDUXISM
import { fetchAttendances } from '../../redux/actions/attendanceAction';
// TOASTER
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// MARCO GWAPO
// ANALYTICS
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, ArcElement, LinearScale, BarElement, Title, Tooltip, Legend, RadialLinearScale } from 'chart.js';

import DatePicker from 'react-datepicker'; // You may need to install this package
import "react-datepicker/dist/react-datepicker.css";

// Register all the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale);

const EmployeeAttendance = ({ fetchAttendances, attendancesData }) => {
  const [startDate, setStartDate] = useState(new Date()); // Default to current date
  const [endDate, setEndDate] = useState(new Date()); // Default to current date

  useEffect(() => {
    fetchAttendances();
  }, [fetchAttendances]);

  // Data collection
  const attendanceDataObjectCollection = attendancesData?.attendances?.data?.details;

  // Transform data by month within the date range
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

  // Filter and count attendance based on date range
  const filteredAttendanceCounts = getMonthlyAttendanceCounts(attendanceDataObjectCollection, startDate, endDate);

  // Calculate total attendance across all months
  const totalAttendanceCount = filteredAttendanceCounts.reduce((acc, count) => acc + count, 0);

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
          family: 'Arial',
        },
        color: 'black',
      },
    },
  };

  return (
    <div className='h-full max-h-full w-full max-w-full glass mx-auto p-4 shadow-slate-900/100 rounded-lg'>
      <div className='flex justify-center'>
        <div className="grid grid-cols-2 gap-8">
          <div>     
            <label className="block text-md font-medium text-gray-700">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              dateFormat="MM-dd-yyyy"
              maxDate={endDate}
              className='space-y-4'
            />
          </div>
          <div>
            <label className="block text-md font-medium text-gray-700">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              dateFormat="MM-dd-yyyy"
              minDate={startDate}
              className='space-y-4'
            />
          </div>
        </div>
      </div>

      {/* Display Monthly Totals */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Monthly Attendance Totals</h2>
        <ul className="list-disc pl-5">
          {filteredAttendanceCounts.map((count, index) => (
            <li key={index} className="text-md font-medium">
              {chartDataCollections.labels[index]}: {count} attendance(s)
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <h3 className="text-lg font-bold">Total Attendance: {totalAttendanceCount}</h3>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Filtered Attendance Data</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full glass">
            <thead className='bg-black text-white'>
              <tr className=' '>
                <th className="px-1 py-1 text-left text-md font-medium text-white uppercase tracking-wider">Name</th>
                <th className="px-1 py-1 text-left text-md font-medium text-white uppercase tracking-wider">Date</th>
                <th className="px-1 py-1 text-left text-md font-medium text-white uppercase tracking-wider">Time-in(AM)</th>
                <th className="px-1 py-1 text-left text-md font-medium text-white uppercase tracking-wider">Time-in Log</th>
                <th className="px-1 py-1 text-left text-md font-medium text-white uppercase tracking-wider">Time-out(PM)</th>
                <th className="px-1 py-1 text-left text-md font-medium text-white uppercase tracking-wider">Time-out Log</th>
                <th className="px-1 py-1 text-left text-md font-medium text-white uppercase tracking-wider">Note</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceDataObjectCollection
                ?.filter(attendance => {
                  const createdAt = new Date(attendance.created_at);
                  return createdAt >= startDate && createdAt <= endDate;
                })
                .map(attendance => (
                  <tr key={attendance.id}>
                    <td className="px-1 py-1 whitespace-nowrap text-sm font-medium text-gray-900">{attendance.employee_fullname}</td>
                    <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">{new Date(attendance.created_at).toLocaleDateString()}</td>
                    <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">{new Date(attendance.attendance_time_in).toLocaleTimeString()}</td>
                    <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">{attendance.attendance_time_in}</td>
                    <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">{new Date(attendance.attendance_time_out).toLocaleTimeString()}</td>
                    <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">{attendance.attendance_time_out}</td>
                    <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">{attendance.attendance_note}</td>
                  </tr>
                ))
              }
              {attendanceDataObjectCollection?.filter(attendance => {
                const createdAt = new Date(attendance.created_at);
                return createdAt >= startDate && createdAt <= endDate;
              }).length === 0 && (
                  <tr>
                    <td colSpan="12" className="px-6 py-4 whitespace-nowrap text-md text-gray-500 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <span className='text-2xl'>No data available</span>
                        <FcCancel style={{ height: '3rem', width: '3rem' }} />
                      </div>
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance Chart */}
      <div className="aspect-[16/9] shadow-xl">
        <Bar
          key={`${startDate}-${endDate}`}
          options={BarChartOptions}
          data={chartDataCollections}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  attendancesData: state.attendanceState,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAttendances: () => dispatch(fetchAttendances()),
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(EmployeeAttendance));
