'use client'
import React, { useState } from 'react'
import supabase from '../config/supabase';


const ReportPothole = () => {
    const [severity, setSeverity] = useState('');
    const [description, setDescription] = useState('')
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('')
    const [constituency, setConstituency] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault()
    

    const formData = {
        severity,
        description,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        constituency,
    };

    try {
        const {data, error} = await supabase.from('potholes').insert([formData])

        if(error) {
            console.error('Error reporting pothole:', error.message)
        }else{
            console.log('Pothole successfully reported', data)
        }
        setIsSubmitted(true);
        setSeverity('')
        setDescription('')
        setLatitude('')
        setLongitude('')
        setConstituency('')
    } catch(error) {
        console.error('Error reporting pothole', error.message)
    }
  }
  return (
  <>

            
            <div className='flex flex-1 mx-auto flex-col items-center justify-center text-center px-4 min-h-screen max-w-screen-md sm:mt-20 mt-10 bg-slate-500 rounded-lg FixWidth'>
            {isSubmitted ? (
        <p className='text-green-400 text-xl mb-4 font-semibold'>
          Success! Thanks for your report!
        </p>
      ) : (
        <form onSubmit={handleFormSubmit} className='bg-white flex flex-col rounded-lg w-1/2 p-4'>
            <h2 className='text-3xl pb-4'>Report a Pothole</h2>
            <div className='pb-4'>
            <label htmlFor='severity' className='block text-lg pb-2 font-bold'>
                Severity:
                <input
                type='text'
                id='severity'
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                placeholder='Enter Severity'
                required
                className='block w-full mt-1 p-2 border border-gray-300 rounded-lg'
                />
            </label>
            </div>
            <div className='pb-4'>
            <label htmlFor='description' className='block text-lg pb-2 font-bold'>
                Description:
                <textarea
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className='block w-full mt-1 p-2 border border-gray-300 rounded-lg'
                />
            </label>
            </div>
            <div className='pb-4'>
            <label htmlFor='latitude' className='block text-lg pb-2 font-bold'>
                Latitude:
                <input
                type='text'
                id='latitude'
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                required
                className='block w-full mt-1 p-2 border border-gray-300 rounded-lg'
                />
            </label>
            </div>
            <div className='pb-4'>
            <label htmlFor='longitude' className='block text-lg pb-2 font-bold'>
                Longitude:
                <input
                type='text'
                id='longitude'
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                required
                className='block w-full mt-1 p-2 border border-gray-300 rounded-lg'
                />
            </label>
            </div>
            <div className='pb-4'>
      <label htmlFor='constituency' className='block text-lg pb-2 font-bold'>
        Constituency:
        <select
          id='constituency'
          value={constituency}
          onChange={(e) => setConstituency(e.target.value)}
          required
          className='block w-full mt-1 p-2 border border-gray-300 rounded-lg'
        >
          <option value='' disabled>
            Select a Constituency
          </option>
          <option value='Constituency 1'>East Grand Bahama</option>
          <option value='Constituency 2'>Marco City</option>
          {/* Add more options as needed */}
        </select>
      </label>
    </div>
        
            <button
            type='submit'
            className='bg-blue-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-700 transition'
            >
            Submit
            </button>
        </form>
      )}
        </div>
</>
  )
}

export default ReportPothole