import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { setChartData } from '../../../services/chart/chartReducer';

// Register Chart.js plugins
Chart.register(...registerables);

const EmployeeChart = ({ chartData, setChartData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Get the chart canvas element
    const chartCanvas = chartRef.current;

    // Check if a chart instance exists and destroy it
    if (chartCanvas) {
      // Check if the canvas has a chart instance attached
      if (chartCanvas.chart) {
        chartCanvas.chart.destroy();
      }

      // Create a new chart instance
      chartCanvas.chart = new Chart(chartCanvas, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May'],
          datasets: [
            {
              label: 'Sales',
              data: chartData,
              fill: false,
              backgroundColor: 'rgb(75, 192, 192)',
              borderColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        },
        options: {
          scales: {
            y: {
              type: 'linear', // Set the type to 'linear'
              beginAtZero: true,
            },
          },
        },
      });
    }

    // Return a cleanup function to destroy the chart instance
    return () => {
      if (chartCanvas && chartCanvas.chart) {
        chartCanvas.chart.destroy();
        delete chartCanvas.chart;
      }
    };
  }, [setChartData]); // Removed chartData from the dependency array

  useEffect(() => {
    // Dispatch action to set chart data only once when the component mounts
    setChartData([65, 59, 80, 81, 56]);
  }, [setChartData]); // Dependency array with only setChartData

  return <canvas ref={chartRef} />;
};

const mapStateToProps = (state) => {
  return {
    chartData: state.chartState.data,
  };
};

const mapDispatchToProps = { setChartData };

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeChart);
