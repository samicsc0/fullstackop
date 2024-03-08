import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [countryName, setCountryName] = useState("");
  const [listOfCountries, setListOfCountries] = useState([]);
  const [temprature, setTemprature] = useState(0)
  const [windspeed, SetWindspeed] = useState(0)
  const url = "https://studies.cs.helsinki.fi/restcountries/api/all";
  const getWeather = (long, latit)=>{
    const url = `http://www.7timer.info/bin/api.pl?lon=${long}&lat=${latit}&product=astro&output=json`
    axios.get(url).then(result=>{
      setTemprature(result.data.dataseries[0].temp2m)
      SetWindspeed(result.data.dataseries[0].wind10m.speed)
    }
    ).catch(error => {
      console.log("")
    })
  }
  const OnClickButtonListener = (countryName)=>{
    setCountryName(countryName)
  }
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(url).then((result) => {
        if (result.status === 200) {
          return result.data.filter((country) => {
            return JSON.stringify(country.name.common)
              .toLowerCase()
              .includes(countryName);
          });
        }
      });
      setListOfCountries(data);
    };
    fetchData();
    getWeather(38.750080,9.033140)
  }, [countryName]);

  return (
    <>
      {"find countries "}
      <input
        value={countryName}
        onChange={(event) => {
          setCountryName(event.target.value);
        }}
      />
      {listOfCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : listOfCountries.length === 1 ? (
        <div>
          <p>{listOfCountries[0].name.common}</p>
          <div>
            <p>Capital: {listOfCountries[0].capital}</p>
            <p>Area: {listOfCountries[0].area}</p>
            <br />
            <h3>Lanugages</h3>
            <ul>
              {Object.values(listOfCountries[0].languages).map((lang) => (
                <li key={lang}>{lang}</li>
              ))}
            </ul>
            <img
              src={listOfCountries[0].flags.png}
              alt={listOfCountries[0].flags.alt}
            />
          </div>
          <div>
            <h2>Weather of {listOfCountries[0].capital}</h2>
            {getWeather(listOfCountries[0].capitalInfo.latlng[1],listOfCountries[0].capitalInfo.latlng[0])}
            <p>Temprature {temprature} Celcius</p>
            <p>Wind {windspeed} m/s</p>
          </div>
        </div>
      ) : (
        <>
{          listOfCountries.map((country) => (
          <li key={country.cca3}>
            {country.name.common}
            <button onClick={()=>OnClickButtonListener(country.name.common.toLowerCase())}>show detail</button>
          </li>
          ))}
        </>
      )}
    </>
  );
}

export default App;
