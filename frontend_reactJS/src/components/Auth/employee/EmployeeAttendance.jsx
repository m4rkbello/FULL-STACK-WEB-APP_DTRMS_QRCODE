/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
//ICONS
import { FcFolder, FcOpenedFolder, FcPlus, FcSalesPerformance, FcSearch, FcPrevious, FcViewDetails, FcEmptyTrash, FcNext } from "react-icons/fc";
//REDUXISM
import { fetchAttendances } from '../../redux/actions/attendanceAction';
//TOASTER
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//ANALYTICS

import { Bar, PolarArea, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, RadialLinearScale } from 'chart.js';

// Register all the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, RadialLinearScale);

const EmployeeAttendance = ({ fetchAttendances, attendancesData, loading, }) => {
  console.log("DATA SA attendancesData", attendancesData);

  useEffect(() => {
    fetchAttendances();
  }, [fetchAttendances])

  const attendanceDataObjectCollection = attendancesData?.attendances?.data?.details;
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
  console.log("DATA SA FN NA resultCountAllAttendancePopulation", resultCountAllAttendancePopulation);


  const chartDataCollections = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'TOTAL',
        data: [
          resultCountAllAttendancePopulation.count,
        ],
        backgroundColor: [
          'rgba(153, 102, 255, 0.6)',  // Purple
          'rgba(255, 99, 132, 0.6)',   // Red
          'rgba(54, 162, 235, 0.6)',   // Blue
          'rgba(255, 206, 86, 0.6)',   // Yellow
          'rgba(75, 192, 192, 0.6)',   // Green
          'rgba(255, 159, 64, 0.6)',   // Orange
          'rgba(199, 199, 199, 0.6)',  // Gray
          'rgba(83, 102, 255, 0.6)',   // Indigo
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
          'rgba(83, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 3,
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
        color: 'black'
      }
    },
  };

  return (
    <div className='h-full max-h-full w-full max-w-full glass mx-auto p-4 shadow-slate-900/100 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg'>
      <div className="flex flex-col bg-transparent mb-10 shadow-slate-900/100" >
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
                <FcFolder
                  style={{ height: "2rem", width: "2rem" }} />
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    attendancesData: state.attendanceState,
    loading: state.attendanceState.loading,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAttendances: () => dispatch(fetchAttendances()),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAttendance);