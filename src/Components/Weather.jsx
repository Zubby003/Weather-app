import React, { useState } from "react";

const Weather = () => {
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [dateToday, setDateToday] = useState(date);

  const api = {
    url: "https://api.openweathermap.org/data/2.5/",
    key: "28fd15358cdecbc1a1dfef367e71acef",
  };

  const iconURL = "https://openweathermap.org/img/w/";

  const getInput = (e) => {
    setInput(e.target.value);
  };

  const getWeatherData = (e) => {
    if (e.key === "Enter" && input === "") {
      setErrorMsg("Input cannot be empty");
      setError(true);
    }
    if (e.key === "Enter" && input !== "") {
      setIsLoading(true);
      setError(true);
      fetch(`${api.url}weather?q=${input}&units=metrics&APPID=${api.key}`)
        .then((res) => {
          if (!res.ok) {
            throw Error("failed to fetch Data");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setWeather(data);
          setInput("");
          setError(false);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setError(true);
          setErrorMsg(err.message);
          setIsLoading(false);
        });
    }
  };

  return (
    <section className="section">
      <div className="container weather">
        <div className="weather-app">
          <h1>Weather App</h1>
          <p>{dateToday}</p>
          <div className="form-control">
            <input
              type="text"
              placeholder="Search city name"
              onChange={getInput}
              value={input}
              onKeyPress={getWeatherData}
            />
          </div>
          {error ? (
            <p className={errorMsg != "" ? "error" : ""}>{errorMsg}</p>
          ) : (
            <div className="result">
              <h2>
                {weather.name}, {weather.sys.country}
              </h2>
              <div className="icon">
                <img
                  src={iconURL + weather.weather[0].icon + ".png"}
                  alt={weather.weather[0].main}
                />
              </div>
              <p>Temp:{weather.main.temp}℃</p>
              <p>Weather:{weather.weather[0].main}</p>
              <p>
                Temp Range: {weather.main.temp_min}℃ /{weather.main.temp_max}℃
              </p>
            </div>
          )}
          {isLoading && <h3>Loading...</h3>}
        </div>
      </div>
    </section>
  );
};

export default Weather;
