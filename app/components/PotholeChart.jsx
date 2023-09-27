'use client'
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title } from 'chart.js';
import supabase from '../config/supabase';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title);

const PotholeChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        // Calculate the date 6 months ago from the current date
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        // Fetch data from your Supabase database for the last 6 months
        const { data, error } = await supabase
          .from('potholes')
          .select('month')
          .gte('month', sixMonthsAgo.toISOString());

        if (error) {
          console.error('Error fetching data:', error.message);
        } else {
          // Count the number of rows for each month
          const counts = data.reduce((countMap, entry) => {
            const month = entry.month;
            countMap[month] = (countMap[month] || 0) + 1;
            return countMap;
          }, {});

          // Generate an array of months in descending order
          const currentDate = new Date();
          const months = [];
          for (let i = 5; i >= 0; i--) {
            const newDate = new Date(currentDate);
            newDate.setMonth(currentDate.getMonth() - i);
            months.push(newDate.toLocaleString('default', { month: 'long' }));
          }

          // Create an array of counts corresponding to the months
          const countsArray = months.map((month) => counts[month] || 0);

          // Transform the counts into the chart format
          const labels = months;
          const dataset = {
            label: 'Potholes Reported',
            data: countsArray,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          };

          setChartData({ labels: labels, datasets: [dataset] });
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }

    fetchData();
  }, []);

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PotholeChart;