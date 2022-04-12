import React from 'react';

import { WeatherCard } from './WeatherCard';

import './css/Normalize.css';
import './css/App.css';

export const App = () => {
  const [status, setStatus] = React.useState('LOADING');
  const [position, setPosition] = React.useState(undefined);
  const [weatherData, setWeatherData] = React.useState(undefined);
  const [location, setLocation] = React.useState(undefined);

  const getApiUrlWithCoords = position =>
    `https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.long}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
  const getApiUrlWithLocation = location =>
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

  React.useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Your browser doesnt support geolocation.');
      setStatus('ERROR');
    } else {
      navigator.geolocation.getCurrentPosition(
        position => {
          setPosition({ lat: position.coords.latitude, long: position.coords.longitude });
        },
        error => {
          console.error('Getting geolocation failed ', error);
          setStatus('ERROR');
        }
      );
    }
  }, []);

  React.useEffect(() => {
    const fetchData = async position => {
      const rawWeatherData = await (await fetch(getApiUrlWithCoords(position))).json();
      setWeatherData({
        cityName: rawWeatherData.name,
        temp: rawWeatherData.main.temp,
        humidity: rawWeatherData.main.humidity,
        windSpeed: rawWeatherData.wind.speed,
        iconName: rawWeatherData.weather[0].icon,
        description: rawWeatherData.weather[0].description,
      });
    };

    if (position) {
      fetchData(position);
    }
  }, [position]);

  React.useEffect(() => {
    const fetchData = async location => {
      const rawWeatherData = await (await fetch(getApiUrlWithLocation(location))).json();
      setWeatherData({
        cityName: rawWeatherData.name,
        temp: rawWeatherData.main.temp,
        humidity: rawWeatherData.main.humidity,
        windSpeed: rawWeatherData.wind.speed,
        iconName: rawWeatherData.weather[0].icon,
        description: rawWeatherData.weather[0].description,
      });
    };

    if (location) {
      fetchData(location);
    }
  }, [location]);

  React.useEffect(() => {
    if (weatherData) {
      setStatus('SUCCESS');
    }
  }, [weatherData]);

  const renderApp = status => {
    switch (status) {
      case 'SUCCESS':
        return <WeatherCard weatherData={weatherData} setLocation={setLocation} />;
      case 'ERROR':
        return <h1>Sorry, error has occured.</h1>;
      case 'LOADING':
      default:
        return <h1>LOADING...</h1>;
    }
  };

  return renderApp(status);
};
