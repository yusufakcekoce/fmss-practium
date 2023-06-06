import React from "react";
import { useCity } from "../context/CityContext";
import "./global.css";

function Filter() {
  const { cityName, setCityName, cities } = useCity();

  const handleChange = (e) => {
    setCityName(e.target.value);
  };

  return (
    <div>
      <select value={cityName} onChange={handleChange} className="city__select">
      {cities.map((city, index) => {
          return (
            <option key={index} value={city} className="city__option">
              {city}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Filter;
