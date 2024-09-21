import React, { useState } from "react";
import "boxicons";
import "./App.css";

const apiKey = "e74f15fbf52276b20ee03c52c124fd55";

function App() {
  const [city, setCity] = useState("");

  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [weather, setWeather] = useState("");

  const [showResult, setShowResult] = useState(false);
  const [uniqueKey, setUniqueKey] = useState(0);

  const handleKeyDown = (event) => {
      if(event.key === 'Enter')
        handleInput();
  }

  const handleInput = async () => {
    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    await fetch(urlApi)
      .then((response) => {
        if (!response.ok) {
          setShowResult(false);
          window.alert("Enter valid city or country");
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => {
        setTemp(data.main.temp);
        setHumidity(data.main.humidity);
        setWind(data.wind.speed * 3.6);
        setWeather(data.weather[0].description);

        setUniqueKey(Date.now());
        setShowResult(true);
      });
  };

  const renderResult = () => {
    if (!showResult) return null;
    return (
      <div>
        <div className="temp" key={`temp-${uniqueKey}`}>
          <div>{Math.round(temp)}°C</div>
        </div>

        <div className="humidity" key={`humidity-${uniqueKey}`}>
          <div className="humidityIcon">
            <box-icon name="water" color="#ffffff"></box-icon>
          </div>
          <div> {Math.round(humidity)}%</div>
          <div className="textHumidityWind">Humidity</div>
        </div>

        <div className="wind" key={`wind-${uniqueKey}`}>
          <div className="windIcon">
            <box-icon name="wind" color="#ffffff"></box-icon>
          </div>
          <div>{Math.round(wind)} Km/h</div>
          <div className="textHumidityWind">Wind Speed</div>
        </div>

        <div className="weather" key={`weather-${uniqueKey}`}>
          {weather}
        </div>
      </div>
    );
  };

  return (
    <div className={`container ${showResult ? "expanded" : ""}`}>
      <div className={`inputBox ${showResult ? "expanded" : ""}`}>
        <div className="mapBox">
          <box-icon name="map" type="solid" color="#ffffff"></box-icon>
        </div>
        <input
          className="searchInput"
          placeholder="Enter Your Location"
          value={city}
          onChange={(event) => {
            setCity(event.target.value);
          }}
          onKeyDown={handleKeyDown}
        ></input>
        <button className="searchBtn" onClick={handleInput}>
          <box-icon name="search" color="#ffffff"></box-icon>
        </button>
      </div>

      <div className="result">{renderResult()}</div>
    </div>
  );
}

export default App;
