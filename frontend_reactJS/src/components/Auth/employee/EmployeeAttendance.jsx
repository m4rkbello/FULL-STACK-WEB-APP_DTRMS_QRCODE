/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState, memo } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { ToastContainer } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { fetchAttendances } from '../../redux/actions/attendanceAction';
import { FcCancel } from "react-icons/fc";
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmployeeAttendance = ({ fetchAttendances, attendancesData }) => {
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30))); // 30 days ago
  const [endDate, setEndDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchAttendances();
  }, [fetchAttendances]);

  useEffect(() => {
    const attendanceDataCollection = attendancesData?.attendances?.data?.details;
    
    if (Array.isArray(attendanceDataCollection)) {
      const filtered = attendanceDataCollection.filter(attendance => {
        const createdAt = new Date(attendance.created_at);
        return createdAt >= startDate && createdAt <= endDate;
      });
      setFilteredData(filtered);
    } else {
      console.error("Attendance data is not an array:", attendanceDataCollection);
    }
  }, [attendancesData, startDate, endDate]);

  const getMonthlyAttendanceCounts = (attendanceData) => {
    const monthlyCounts = Array(12).fill(0);
    attendanceData.forEach(attendance => {
      const month = new Date(attendance.created_at).getMonth();
      monthlyCounts[month] += 1;
    });
    return monthlyCounts;
  };

  const filteredAttendanceCounts = getMonthlyAttendanceCounts(filteredData);

  const chartData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ],
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

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Monthly Attendance',
        font: { size: 20, weight: 'bold', family: 'Arial' },
        color: 'black',
      },
    },
  };

  return (
    <div className='h-full w-full p-4 mx-auto glass shadow-slate-900/100 rounded-lg'>
      <div className="flex flex-col items-center mb-4 space-y-4 w-full">
        <label className='text-2xl font-bold'>Filter by</label>

        <div className="w-full flex flex-col items-center space-y-2">
          <label className="block text-md font-medium text-gray-700">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            dateFormat="MM-dd-yyyy"
            maxDate={endDate}
            className="border rounded p-2 w-64"
          />
        </div>

        <div className="w-full flex flex-col items-center space-y-2">
          <label className="block text-md font-medium text-gray-700">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            dateFormat="MM-dd-yyyy"
            minDate={startDate}
            className="border rounded p-2 w-64"
          />
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Filtered Attendance Data</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full glass">
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map(attendance => (
                  <tr key={attendance.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{attendance.employee_fullname}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(attendance.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(attendance.attendance_time_in).toLocaleTimeString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{attendance.attendance_time_in}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(attendance.attendance_time_out).toLocaleTimeString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{attendance.attendance_time_out}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{attendance.attendance_note}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-md text-gray-500 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-2xl">No data available</span>
                      <FcCancel style={{ height: '3rem', width: '3rem' }} />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="aspect-[16/9] shadow-xl">
        <div className="glass grid place-content-center text-9xl font-black shadow-xl">
          <Bar options={chartOptions} data={chartData} />
        </div>
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
