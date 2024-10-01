import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { CDBContainer } from 'cdbreact';
import './Chart.css'; // Import the CSS file

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = () => {
  const [projectStats, setProjectStats] = useState([]);
  
  const [data] = useState({
    labels: ['STR', 'FIN', 'QLT', 'MAN', 'STO', 'HR'],
    Percentage : [10,20,30,40,50],
    datasets: [
      {
        label: 'Total',
        backgroundColor: '#025AAB',
        borderColor: 'rgb(194, 116, 161)',
        data: [19, 7, 9, 15, 5, 10],
        borderRadius: 10, 
        
      },
      {
        label: 'Closed',
        backgroundColor: '#5AA647',
        borderColor: 'rgb(71, 225, 167)',
        data: [14, 6, 8, 15, 5, 9],
        borderRadius: 10, 
      },
    ],
  });

  useEffect(() => {
    return () => {
      // Cleanup chart instance
      ChartJS.getChart('myChart')?.destroy();
    };
  }, []);

  useEffect(() => {
    // Fetch project stats data from the new API
    const fetchProjectStats = async () => {
      try {
        const response = await fetch('/api/project-stats'); // Adjust URL as necessary
        const data = await response.json();
        setProjectStats(data);
      } catch (error) {
        console.error('Error fetching project stats:', error);
      }
    };

    fetchProjectStats();
  }, []);

  // Prepare data for the chart
  const chartOptions = {
    chart: {
      type: 'column', // Choose the type of chart you want
    },
    title: {
      text: 'Department-wise Success Percentage of Projects',
    },
    xAxis: {
      categories: projectStats.map(stat => stat.department), // Departments
      title: {
        text: 'Department',
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Success Percentage (%)',
      },
      labels: {
        formatter: function () {
          return this.value + '%';
        },
      },
    },
    series: [
      {
        name: 'Success Percentage',
        data: projectStats.map(stat => stat.successPercentage), // Success percentages
      },
    ],
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
        },
      },
    },
  };

  return (
    <CDBContainer>
      <h3 className="mt-5 text-black float-left ">Department Wise - Total Vs Closed</h3>
      <div className="chart-container mb-5"> {/* Apply custom class for width control */}
        <Bar data={data} options={{ responsive: true }} id="myChart" />
      </div>
    </CDBContainer>

    
  );
};

export default Chart;
