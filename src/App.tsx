import React from 'react';

import { WeatherCard } from './WeatherCard';

import './css/Normalize.css';
import './css/App.css';

enum Status {
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Error = 'ERROR',
}

interface Position {
  lat: number;
  long: number;
}

export interface WeatherData {
  cityName: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  iconName: string;
  description: string;
}

interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: { speed: number };
  weather: { icon: string; description: string }[];
}

export const App = () => {
  const [status, setStatus] = React.useState<Status>(Status.Loading);
  const [position, setPosition] = React.useState<Position | undefined>(undefined);
  const [weatherData, setWeatherData] = React.useState<WeatherData | undefined>(undefined);
  const [location, setLocation] = React.useState<string>('Prague');

  const getApiUrlWithCoords = (position: Position): string =>
    `https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.long}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
  const getApiUrlWithLocation = (location: string): string =>
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

  React.useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Your browser doesnt support geolocation.');
      setStatus(Status.Error);
    } else {
      navigator.geolocation.getCurrentPosition(
        position => {
          setPosition({ lat: position.coords.latitude, long: position.coords.longitude });
        },
        error => {
          console.error('Getting geolocation failed ', error);
          setStatus(Status.Error);
        }
      );
    }
  }, []);

  React.useEffect(() => {
    const fetchData = async (position: Position) => {
      const rawWeatherData = (await (
        await fetch(getApiUrlWithCoords(position))
      ).json()) as WeatherResponse;
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
    const fetchData = async (location: string): Promise<void> => {
      const rawWeatherData = (await (
        await fetch(getApiUrlWithLocation(location))
      ).json()) as WeatherResponse;
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
      setStatus(Status.Success);
    }
  }, [weatherData]);

  const renderApp = (status: Status): JSX.Element => {
    switch (status) {
      case Status.Success:
        return <WeatherCard weatherData={weatherData!} setLocation={setLocation} />;
      case Status.Error:
        return <h1>Sorry, error has occured.</h1>;
      case Status.Loading:
      default:
        return <h1>LOADING...</h1>;
    }
  };

  return renderApp(status);
};
