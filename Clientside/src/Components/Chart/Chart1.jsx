import React, { useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import Histogram from 'highcharts/modules/histogram-bellcurve';

// Initialize the Histogram module
Histogram(Highcharts);

const HistogramChart = () => {
  const data = [
    3.5, 3, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3, 3,
    4, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3, 3.4, 3.5, 3.4,
    3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3, 3.4, 3.5, 2.3, 3.2, 3.5,
    3.8, 3, 3.8, 3.2, 3.7, 3.3, 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9,
    2.7, 2, 3, 2.2, 2.9, 2.9, 3.1, 3, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9,
    3, 2.8, 3, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3, 3.4, 3.1, 2.3, 3, 2.5, 2.6,
    3, 2.6, 2.3, 2.7, 3, 2.9, 2.9, 2.5, 2.8, 3.3, 2.7, 3, 2.9, 3, 3, 2.5, 2.9,
    2.5, 3.6, 3.2, 2.7, 3, 2.5, 2.8, 3.2, 3, 3.8, 2.6, 2.2, 3.2, 2.8, 2.8, 2.7,
    3.3, 3.2, 2.8, 3, 2.8, 3, 2.8, 3.8, 2.8, 2.8, 2.6, 3, 3.4, 3.1, 3, 3.1,
    3.1, 3.1, 2.7, 3.2, 3.3, 3, 2.5, 3, 3.4, 3
  ];

  // Define the chart options in the state
  const [chartOptions] = useState({
    title: {
      text: 'Department Wise - Total Vs Closed'
    },
    xAxis: [{
      title: { text: '' },
      alignTicks: false
    }, {
      title: { text: '' },
      alignTicks: false,
      opposite: true
    }],
    yAxis: [{
      title: { text: '' },
      opposite: false,
    }, {
      title: { text: '' },
      opposite: false
    }],
    plotOptions: {
      histogram: {
        accessibility: {
          point: {
            valueDescriptionFormat: '{index}. {point.x:.3f} to {point.x2:.3f}, {point.y}.'
          }
        }
      }
    },
    series: [{
      name: 'Total',
      type: 'histogram',
      xAxis: 1,
      yAxis: 1,
      baseSeries: 's1',
      zIndex: -1
    }, {
      name: 'Data',
      type: 'scatter',
      data: data,
      id: 's1',
      marker: {
        radius: 0.5
      }
    }]
  });

  return (
    <div className='w-50 mx-3'>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        
      />
    </div>
  );
};

export default HistogramChart;
