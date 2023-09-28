'use client'
import React, { useState, useEffect } from 'react';
import PotholeChart from '../components/PotholeChart';
import supabase from '../config/supabase';


const Dashboard = () => {
  const [potholesData, setPotholesData] = useState({
    severityData: [0, 0, 0, 0], // Initialize with zeros for each severity level
  });

  useEffect(() => {
    async function fetchPotholesData() {
      try {
        // Fetch and aggregate pothole data from Supabase
        const { data, error } = await supabase.from('potholes').select('severity');

        if (error) {
          console.error('Error fetching potholes data:', error.message);
        } else {
          console.log('Potholes data fetched successfully:', data);

          // Aggregate the data to count potholes by severity
          const severityData = [0, 0, 0, 0];
          data.forEach((pothole) => {
            severityData[pothole.severity - 1] += 1;
          });

          setPotholesData({ severityData });
        }
      } catch (error) {
        console.error('Error fetching potholes data:', error.message);
      }
    }

    fetchPotholesData();
  }, []);

  return (
    <div className='ml-20'>
      <h2 className="text-2xl font-bold text-center text-white mt-5 mb-5">Pothole Statistics</h2>
      <PotholeChart data={potholesData} />

    </div>
  );
};

export default Dashboard;