import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaCloud } from 'react-icons/fa';

const WeatherApp = () => {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');

    const cond = Object.keys(data).length !== 0;

    const API_KEY = '8ebf83b28f13fb202b7b650996e6dcd1';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

    const searchLocation = async (e) => {
        e.preventDefault();
        if (location.trim() === '') return;
        
        try {
            const response = await fetch(url);
            const result = await response.json();
            setData(result);
            console.log(result);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <div className='overlay'></div>
            <div className='text-white w-full flex flex-col p-12'>
                <form className='flex flex-row items-center justify-center gap-4 w-full relative ' onSubmit={searchLocation}>
                    <div className='bg-white flex flex-row-reverse border-0 box-shadow w-[250px] lg:w-[450px] rounded-2xl '>
                        <input 
                            value={location} 
                            onChange={(e) => setLocation(e.target.value)}
                            type="text" 
                            placeholder='Enter Location' 
                            className='outline-none text-black py-2 w-full bg-white rounded-2xl placeholder:text-gray-500'
                        />
                        <article className='text-xl text-gray-700 flex items-center p-2'>
                            <FaSearch />
                        </article>
                    </div>
                </form>
                <div className='mt-2 lg:mt-8 w-full lg:w-[800px] flex gap-4 flex-col-reverse lg:flex-col j'>
                    <div className='flex flex-col lg:flex-row items-center lg:justify-evenly'>
                        <div className='cursor-pointer backdrop-filter flex flex-col gap-4 bg-white bg-opacity-10 hover:bg-opacity-5 hover:scale-105 transition-all duration-200 border border-white border-opacity-20 shadow-lg w-fit p-5 rounded-[30px]'>
                            <p className='text-2xl'>{cond ? data.name : 'City'}, <span className='text-lg text-gray-400'>{cond ? data.sys.country : 'Country'}</span></p>
                            <h1 className='text-6xl lg:text-9xl font-bold'>{cond && data.main ? data.main.temp.toFixed() : '0'} &deg;C</h1>
                        </div>
                        <div className='flex flex-col justify-evenly w-[200px]'>
                            {cond && data.weather ? (
                                <>
                                    <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="Weather Icon" />
                                    {/* <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@1x.png`} alt="Weather Icon" /> */}
                                </>
                            ):(
                                <>
                                    <article className='text-4xl flex items-center justify-center'>
                                        <FaCloud />
                                    </article>
                                </>
                            )}
                            <div>
                                <p className='flex justify-between w-full'><span className='text-md lg:text-lg'>Feels Like:</span> <span className='text-gray-400 text-lg font-bold'>{cond ? data.main.feels_like.toFixed() : '-'} &deg;C</span></p>
                                <p className='flex justify-between w-full'><span className='text-md lg:text-lg'>Humidity:</span> <span className='text-gray-400 text-lg font-bold'>{cond ? data.main.humidity : '-'} %</span></p>
                                <p className='flex justify-between w-full'><span className='text-md lg:text-lg'>Wind Speed:</span> <span className='text-gray-400 text-lg font-bold'>{cond ? data.wind.speed.toFixed() : '-'} m/s</span></p>
                                <p className='flex justify-between w-full'><span className='text-md lg:text-lg'>Pressure:</span> <span className='text-gray-400 text-lg font-bold'>{cond ? data.main.pressure : '-'} Pa</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='text-center'>
                        <h1 className='text-4xl'>{cond ? data.weather[0].main : 'Atmosphere'}</h1>
                        <p className='text-gray-600'>{cond ? data.weather[0].description : 'description'}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WeatherApp;
