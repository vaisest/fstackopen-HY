import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  const [filterValue, setNewFilter] = useState("");

  if (countries.length === 0) return null;

  const filterChangeHandler = (event) => setNewFilter(event.target.value);
  // return <div></div>;
  return (
    <div>
      <div>find countries</div>
      <input value={filterValue} onChange={filterChangeHandler} />
      <Matches
        filterValue={filterValue}
        countries={countries}
        setNewFilter={setNewFilter}
        apiKey={API_KEY}
      />
    </div>
  );
};

const Matches = ({ filterValue, setNewFilter, countries, apiKey }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filterValue.toLowerCase())
  );

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map((country) => (
          <div key={country.name.common}>
            {" "}
            {country.name.common}{" "}
            <button
              key={country.name.common}
              onClick={() => setNewFilter(country.name.common)}
            >
              show
            </button>
          </div>
        ))}
      </div>
    );
  }
  if (filteredCountries.length === 1) {
    return <CountryDetails country={filteredCountries[0]} apiKey={apiKey} />;
  }

  return <div>No matches found. Please try another filter.</div>;
};

const CountryDetails = ({ country, apiKey }) => {
  console.log(country);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.keys(country.languages).map((key) => (
          <li key={country.languages[key]}>{country.languages[key]}</li>
        ))}
      </ul>
      <img
        key={country.name.common}
        src={country.flags.png}
        alt={`${country.name.common} flag}`}
      />
      <Weather country={country} apiKey={apiKey} />
    </div>
  );
};

const Weather = ({ country, apiKey }) => {
  const [weather, setNewWeather] = useState({});

  if (!(country.name.common in weather)) {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}`
      )
      .then((response) =>
        setNewWeather({ ...weather, [country.name.common]: response.data })
      );
    return null;
  }

  const capitalTemp = (weather[country.name.common].main.temp - 273.15).toFixed(
    2
  );
  const iconCode = weather[country.name.common].weather[0].icon;
  const wind = weather[country.name.common].wind.speed.toFixed(2);

  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      <div> temperature {capitalTemp} Celcius</div>
      <img
        src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`}
        alt="weather icon"
      />
      <div> wind {wind} m/s</div>
    </div>
  );
};

export default App;
