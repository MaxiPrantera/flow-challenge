import { useEffect, useState } from "react";
import api, {type Weather } from "./api";
import type {City} from './types'



const CITIES: Record<string, City> = {
  quilmes:{
  id: 'quilmes',
  name: 'Quilmes',
  lat: -34.7539386,
  lon: -58.3864614,
}, palermo:{
  id: 'palermo',
  name: 'Palermo',
  lat: -34.5732721,
  lon: -58.4908839,
}, colon:{
  id: 'colon',
  name: 'Colon',
  lat: -34.5732721,
  lon: -58.4908839,
},bariloche:{
  id: 'bariloche',
  name: 'Bariloche',
  lat: -41.1259668,
  lon: -71.8989739,
},varela:{
  id: 'varela',
  name: 'Varela',
  lat: -41.1259668,
  lon: -71.8989739,
},
};

function App() {
  const [status, setStatus] = useState<'pending' | 'resolved'>('pending')
  const [weather, setWeather] = useState<Weather | null>(null)
  const [city, setCity] = useState<City>(CITIES['quilmes'])

  function handleChangeCity(event: React.ChangeEvent<HTMLSelectElement>) {
    setCity(CITIES[event.target.value as keyof typeof CITIES])
  }

  useEffect(() => {
    api.weather.fetch(city).then((weather) => {
      setWeather(weather)
      setStatus('resolved')
    });
  },[city])

  if (status == 'pending') {
    return <div>Loading...</div>
  }
  if(!weather) {
    return <div>La ciudad no existe o no hay datos del clima</div>
  }

  return(
    <main>
      <select onChange={handleChangeCity} value={city.id}>
        {Object.values(CITIES).map((city) => (
          <option key={city.id} value = {city.id}>
            {city.name}
          </option>
        ))}
      </select>
      <h1>{weather.city.name}</h1>
      <ul>
        {weather.forecast.map((forecast, index) => (
          <li key={index}>
            {forecast.date}: Min: {forecast.min} C°,  Max: {forecast.max} C°
          </li>
        ))}
      </ul>
    </main>
  ) 
}

export default App;
