'use client'
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import supabase from '../config/supabase';

const MapComponent = () => {
  const [potholes, setPotholes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const mapContainerRef = useRef(null);
  const initialLatitude = 26.530389;
  const initialLongitude = -78.693342;
  const initialZoomLevel = 12;
  const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.from('potholes').select('*');
        if (error) {
          console.error('Error fetching potholes:', error.message);
        } else {
          console.log('Potholes fetched successfully:', data);
          setPotholes(data);
        }
      } catch (error) {
        console.error('Error fetching potholes:', error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures this runs only on mount (client-side).

  useEffect(() => {
    // Check if window object exists (i.e., we are on the client-side)
    if (typeof window !== 'undefined' && !isLoading && mapContainerRef.current) {
      mapboxgl.accessToken = mapboxAccessToken;
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [initialLongitude, initialLatitude],
        zoom: initialZoomLevel,
        attributionControl: false,
        zoomControl: true,
      });

      // Add markers for potholes
      potholes.forEach((pothole) => {
        const { latitude, longitude, severity } = pothole;
        const severityColors = {
          Low: 'green',
          Medium: 'yellow',
          High: 'red',
        };

        new mapboxgl.Marker({
          color: severityColors[severity],
        })
          .setLngLat([longitude, latitude])
          .setPopup(new mapboxgl.Popup().setText(`Severity: ${severity}`))
          .addTo(map);
      });

      // Clean up the map instance on component unmount
      return () => {
        map.remove();
      };
    }
  }, [isLoading, initialLatitude, initialLongitude, initialZoomLevel, mapboxAccessToken, potholes]);

  return <div className='map-size' ref={mapContainerRef}  />;
};

export default MapComponent;