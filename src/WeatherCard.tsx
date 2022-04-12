import React from 'react';

import { WeatherData } from './App';
import { Search } from './Search';

interface WeatherProps {
  weatherData: WeatherData;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

export const WeatherCard: React.FC<WeatherProps> = ({
  weatherData: { cityName, temp, iconName, description, humidity, windSpeed },
  setLocation,
}) => (
  <div className="weather-container">
    <Search setLocation={setLocation} />
    <>
      <div className="city">
        <h1 className="city-name">{cityName}</h1>
      </div>
      <div className="city-temp">
        <p>{Math.round(temp)}°C</p>
      </div>
      <div className="flex">
        <div className="city-icon">
          <img src={`https://openweathermap.org/img/w/${iconName}.png`} alt={description} />
        </div>
        <div className="description">
          <p>{description}</p>
        </div>
      </div>
      <div className="humidity">Humidity: {humidity}%</div>
      <div className="wind">Wind speed: {windSpeed} km/h</div>
    </>
  </div>
);