import React, { useEffect, useState } from "react";
import { useCity } from "../context/CityContext";
import axios from "axios";
import "./global.css";

const API_KEY = "0d4f03391bd14282ab1142533232405";

function List() {
  const [weather, setWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { cityName} = useCity();

  useEffect(() => {
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=8&aqi=no&alerts=no&lang=tr`
      )
      .then((res) => {
        setWeather(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [cityName]);

  const getFormattedDate = (dateString) => {
    const dateObj = new Date(dateString);
    const options = {
      weekday: "long"
    };
    return dateObj.toLocaleDateString("tr-TR", options);
  };

  return (
    <div>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <ul className="list__container">
            {weather.forecast.forecastday.map((day, index) => {
              const isFirstDay = index === 0;
              const listItemClass = `list__item ${
                isFirstDay ? "current__day" : ""
              }`;

              return (
                <li key={index} className={listItemClass}>
                  <h5>{getFormattedDate(day.date)}</h5>
                  <p>{day.day.maxtemp_c} C°</p>
                  <img
                    src={day.day.condition.icon}
                    alt={day.day.condition.text}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default List;
