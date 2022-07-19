import React, { useState } from "react";
import axios from "axios";
import WeatherIcon from "./WeatherIconComponent";

export const WeatherComponent = (props) => {
  const [data, setData] = useState({
    coord: { lon: 2.3488, lat: 48.8534 },
    weather: [
      { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
    ],
    base: "stations",
    main: {
      temp: 75,
      feels_like: 74.61,
      temp_min: 70.3,
      temp_max: 77.11,
      pressure: 1021,
      humidity: 51,
    },
    visibility: 10000,
    wind: { speed: 3.44, deg: 0 },
    clouds: { all: 0 },
    dt: 1657694440,
    sys: {
      type: 2,
      id: 2041230,
      country: "FR",
      sunrise: 1657684847,
      sunset: 1657741888,
    },
    timezone: 7200,
    id: 2988507,
    name: "Paris",
    cod: 200,
  });
  const [location, setLocation] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("d");
  //   const [icon, setIcon] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=e7de3308c430dcc9c1f3a96ff1f9ca9a`;

  const searchLocation = () => {
    axios.get(url).then((response) => {
      setData(response.data);
      setTimeOfDay(response.data.weather[0].icon.charAt(2));
      console.log(response.data);
    });
    onTrigger();
    setLocation("");
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      searchLocation(event);
    }
  };

  const onTrigger = () => {
    // setTimeOfDay(data.weather[0].icon.charAt(2));
    console.log(data.weather[0].icon.charAt(2));
    props.parentCallback(timeOfDay);
  };

  return (
    <div>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={handleEnter}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="hero">
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()} °F</h1> : null}
            </div>
            <div className="icon">
              <WeatherIcon code={data.weather[0].icon} size={100} />
            </div>
          </div>
        </div>
        {data.main !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()}MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
