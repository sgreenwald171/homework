import { useState, useEffect } from 'react';
const key = 'c98eb298b4a0b00f67c2e20027cc8fda';

export default function DisplayWeather() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=08701&appid=${key}&units=imperial&lang=he`);

        const weatherData = await r.json();

        if (!r.ok) {
          throw new Error(`${r.status} - ${r.statusText} - ${weatherData.message}`);
        }

        console.log(weatherData);
        setWeather(weatherData);
      } catch (e) {
        console.error('oops', e);
      }
    })();
  }, []);

  return (
    <>
      <div>The weather in <span id="location">{weather?.name}</span></div>
      <img id="icon" src={`https://openweathermap.org/img/w/${weather?.weather[0].icon}.png`}/>
      <div><span id="temperature">{weather?.main.temp}</span> and <span id="description">{weather?.weather[0].description}</span></div>
    </>
  )
}
