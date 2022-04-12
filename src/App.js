import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Normalize.css';
import './css/App.css';

const App = () => {
	const [lat, setLat] = useState([]);
	const [lon, setLon] = useState([]);
	const [data, setData] = useState([]);
	const [location, setLocation] = useState('');

	const API_KEY = '4cb149be23b7e24992b533583702ae1e';
	const API_URL_COORD = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
	const API_URL_LOCATION = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

	useEffect(() => {
		const fetchData = async () => {
			navigator.geolocation.getCurrentPosition(function (position) {
				setLat(position.coords.latitude);
				setLon(position.coords.longitude);
			});

			await fetch(API_URL_COORD)
				.then((res) => res.json())
				.then((result) => {
					setData(result);
					console.log(result);
				});
		};
		fetchData();
	}, [API_URL_COORD, lat, lon]);

	const searchLocation = (event) => {
		if (event.key === 'Enter') {
			axios.get(API_URL_LOCATION).then((response) => {
				setData(response.data);
			});
			setLocation('');
		}
	};

	return (
		<div className="weather-container">
			<input
				className="search"
				value={location}
				type="text"
				onChange={(e) => setLocation(e.target.value)}
				placeholder="Search..."
				onKeyPress={searchLocation}
			/>
			<div className="weather-loading">
				<div className="city">
					{data.main ? <h1 className="city-name">{data.name}</h1> : null}
				</div>
				<div className="city-temp">
					{data.main ? <p> {Math.round(data.main.temp)}°C</p> : null}
				</div>
				<div className="flex">
					<div className="city-icon">
						{data.main ? (
							<img
								src={`https://openweathermap.org/img/w/${data.weather.icon}.png`}
								alt={data.weather.description}
							/>
						) : null}
					</div>
					<div className="description">
						{data.main ? <p>{data.weather.description}</p> : null}
					</div>
				</div>
				{data.main ? (
					<div className="humidity">Humidity: {data.main.humidity}%</div>
				) : null}
				{data.main ? (
					<div className="wind">Wind speed: {data.wind.speed} km/h</div>
				) : null}
			</div>
		</div>
	);
};
export default App;
