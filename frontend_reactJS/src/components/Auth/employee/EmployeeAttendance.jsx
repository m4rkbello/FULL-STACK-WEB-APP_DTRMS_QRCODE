/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, memo } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// ICONS
import { FcFolder, FcLeft, FcOpenedFolder, FcPrint, FcDataSheet, FcSearch, FcPlus, FcFile, FcPrevious, FcCancel } from "react-icons/fc";
// REDUXISM
import { fetchAttendances } from '../../redux/actions/attendanceAction';
// TOASTER
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ANALYTICS
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, ArcElement, LinearScale, BarElement, Title, Tooltip, Legend, RadialLinearScale } from 'chart.js';

import DatePicker from 'react-datepicker'; // You may need to install this package
import "react-datepicker/dist/react-datepicker.css";

import { DownloadTableExcel } from 'react-export-table-to-excel';

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

  // Function to create gradient color matching the Tailwind bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500
const getGradient = (ctx) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height); 

  // Add color stops to match the Tailwind gradient
  gradient.addColorStop(0.3, 'rgba(99, 102, 241, 1)');  // indigo-500 (from-10%)
  gradient.addColorStop(0.6, 'rgba(14, 165, 233, 1)');  // sky-500 (via-30%)
  gradient.addColorStop(0.9, 'rgba(16, 185, 129, 1)');  // emerald-500 (to-90%)

  return gradient;
};

  // Bar chart data with gradient background
  const chartDataCollections = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Total Attendance',
        data: filteredAttendanceCounts,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx } = chart;  // Get chart context
          return getGradient(ctx); // Apply the gradient function
        },
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 3,
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

      //PRINT-MODULE EMPLOYEES-ATTENDANCE
      function printAllEmployeesAttendance() {
        // Clone the table
        var printTable = document.getElementById("employeesAttendancesDataList").cloneNode(true);
    
        // Remove the last column from the header row
        var headerRow = printTable.querySelector("thead tr");
        if (headerRow) {
            headerRow.removeChild(headerRow.lastElementChild);
        }
    
        // Remove the last column from each data row
        var dataRows = printTable.querySelectorAll("tbody tr");
        for (var i = 0; i < dataRows.length; i++) {
            dataRows[i].removeChild(dataRows[i].lastElementChild);
        }
    
        // Create a new window for printing
        var printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print Attendance</title>');
        printWindow.document.write('<style>table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid black; padding: 8px; text-align: left; } th { background-color: #f2f2f2; }</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(printTable.outerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close(); // Necessary for IE >= 10
    
        // Print and close the window after printing
        printWindow.print();
        printWindow.close();
    }
    


  return (
    <div className='h-full max-h-full w-full max-w-full glass mx-auto p-4 shadow-slate-900/100 rounded-lg'>
    <div className="flex flex-wrap">
    <div>
        <div className="text-sm breadcrumbs mb-10 bg-transparent">
            <ul>
                <li>
                    <FcLeft
                        style={{
                            backgroundColor: "transparent",
                            color: "black",
                            height: "35px",
                            width: "35px",
                        }}
                    />
                    <Link to="/" className='hover:text-white'>Home</Link>
                </li>
                <li>
                    <FcOpenedFolder
                        style={{
                            backgroundColor: "transparent",
                            color: "black",
                            height: "25px",
                            width: "25px",
                        }}
                    />
                    <Link to="/employee/dashboard" className='hover:text-white'>Employee Dashboard</Link>
                </li>
                <li>
                    <span className="inline-flex gap-2 items-center">
                        <FcFile
                            style={{
                                backgroundColor: "transparent",
                                color: "black",
                                height: "25px",
                                width: "25px",
                            }}
                        />
                        <Link to="" className='hover:text-white'>Employee Data</Link>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</div>

<div className='glass shadow-slate-900/100'>
<div className="grid bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% grid-cols-3 items-center mt-10 mb-10 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg">
    <div>
        <span className="inline-grid grid-cols-3 gap-4 py-5">
            <div className="p-3 flex justify-start">
                <input
                    type="text"
                    placeholder="Search"
                    className="border-b-4 bg-transparent text-md rounded text-black custom-placeholder-text-color"
                />
            </div>
            <div className="p-3 flex justify-end">
                <FcSearch style={{ height: "2rem", width: "2rem" }} />
            </div>
        </span>
    </div>
    <div className="flex justify-center">
        <h1 className="font-bold text-4xl text-black text-center">EMPLOYEE ATTENDANCES</h1>
    </div>
    <div className="p-3 flex justify-end">
        <DownloadTableExcel
            filename="ExportEmployee"
            sheet="users"
            // currentTableRef={tableRef.current}
        >
            <button>
                <FcDataSheet
                    style={{ height: "2rem", width: "2rem" }}
                /></button>
        </DownloadTableExcel>
        <button
         onClick={printAllEmployeesAttendance}
        >
            <FcPrint
                style={{ height: "2rem", width: "2rem" }}
            />
        </button>
    </div>
</div>
</div>
    
    <div className='flex justify-center bg-black'>
        <div className="grid grid-cols-2 gap-8 drop-shadow-md">
          <div>     
            <label className="block text-md font-medium text-gray-700">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              dateFormat="MM-dd-yyyy"
              maxDate={endDate}
              className='space-y-4 py-2 px-2'
            />
          </div>
          <div>
            <label className="block text-md font-medium text-gray-700">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              dateFormat="MM-dd-yyyy"
              minDate={startDate}
              className='space-y-4 px-2 py-2'
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
              {chartDataCollections.labels[index]}: 
              <spa className="text-violet-700 text-lg mx-2"> 
              {count} 
              </spa>
              attendance(s)
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
          <table  id="employeesAttendancesDataList" className="min-w-full glass rounded-b-lg">
            <thead className='bg-black text-white rounded-b-lg'>
              <tr className='rounded-b-lg'>
                <th className="px-1 py-1 text-left text-md font-medium text-white uppercase tracking-wider">No.</th>
                <th className="px-1 py-1 text-left text-md font-medium text-white uppercase tracking-wider">Name</th>
                <th className="px-1 py-1 text-left text-md font-medium text-white uppercase tracking-wider">Date</th>
                <th className="px-1 py-1 text-left text-md font-medium text-white uppercase tracking-wider">Time-in(AM)</th>
                <th className="px-1 py-1 text-left text-md font-medium text-white uppercase tracking-wider">Time-in Log</th>
                <th className="px-1 py-1 text-left text-md font-medium text-white uppercase tracking-wider">Time-out(PM)</th>
                <th className="px-1 py-1 text-left text-md font-medium text-white uppercase tracking-wider">Time-out Log</th>
                <th className="px-1 py-1 text-left text-md font-medium text-white uppercase tracking-wider">Note</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 rounded-b-lg">
              {attendanceDataObjectCollection
                ?.filter(attendance => {
                  const createdAt = new Date(attendance.created_at);
                  return createdAt >= startDate && createdAt <= endDate;
                })
                .map(attendance => (
                  <tr key={attendance.id} className='rounded-b-lg'>
                  <td className="px-1 py-1 whitespace-nowrap text-sm font-medium text-gray-900"></td>
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
                  <tr className='rounded-b-lg'>
                    <td colSpan="12" className="px-6 py-4 whitespace-nowrap text-md text-gray-500 text-center rounded-b-lg">
                      <div className="flex items-center justify-center space-x-2 rounded-b-lg">
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
