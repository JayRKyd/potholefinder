'use client'
import React, { useEffect, useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import supabase from '../config/supabase';

const MapComponent = () => {
  const [potholes, setPotholes] = useState([]);
  const initialLatitude = 26.530389;
  const initialLongitude = -78.693342;
  const initialZoomLevel = 13;
  const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const [isLoading, setIsLoading] = useState(true);
  const mapContainerRef = useRef(null); // Ref to the map container
  const mapRef = useRef(null); // Ref to the map instance

  useEffect(() => {
    async function fetchPotholes() {
      try {
        // Fetch pothole data from the 'potholes' table in Supabase
        const { data, error } = await supabase.from('potholes').select('*');

        if (error) {
          console.error('Error fetching potholes:', error.message);
        } else {
          console.log('Potholes fetched successfully:', data);

          // Update potholes state with fetched data
          setPotholes(data);
        }
      } catch (error) {
        console.error('Error fetching potholes:', error.message);
      } finally {
        // Set loading state to false when the data is fetched
        setIsLoading(false);
      }
    }

    fetchPotholes();
  }, []);

  useEffect(() => {
    if (!isLoading && mapContainerRef.current && !mapRef.current) {
      // Initialize the map when the component is mounted
      const mapInstance = L.map(mapContainerRef.current).setView(
        [initialLatitude, initialLongitude],
        initialZoomLevel
      );

      // Add a tile layer from Mapbox using your access token
      L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`, {
        attribution: '© <a href="https://www.mapbox.com/">Mapbox</a> contributors',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: mapboxAccessToken,
      }).addTo(mapInstance);

      // Set the map instance in refs
      mapRef.current = mapInstance;
    }
  }, [initialLatitude, initialLongitude, initialZoomLevel, mapboxAccessToken, isLoading]);

  useEffect(() => {
    // Ensure the map is initialized and loading is complete before adding markers
    if (mapRef.current && !isLoading) {
      // Function to add a new marker for a pothole
      const addPotholeMarker = (latitude, longitude, severity) => {
        // Define colors for different severity levels
        const severityColors = {
          Low: 'green',
          Medium: 'yellow',
          High: 'red',
        };

        // Create a custom icon with the specified color
        const customIcon = L.divIcon({
          className: 'custom-marker',
          iconSize: [20, 20], // Adjust the marker size as needed
          html: `<div class="marker" style="background-color: ${severityColors[severity]};"></div>`,
        });

        L.marker([latitude, longitude], { icon: customIcon })
          .addTo(mapRef.current)
          .bindPopup(`Severity: ${severity}`)
          .openPopup(); // Automatically open the popup
      };

      // Render pothole markers (fetched and reported)
      potholes.forEach((pothole) => {
        addPotholeMarker(pothole.latitude, pothole.longitude, pothole.severity);
      });
    }
  }, [potholes, isLoading]);

  return (
    <div className='map-size'>
      <div ref={mapContainerRef} style={{ height: '100%' }}></div>
    </div>
  );
};

export default MapComponent;