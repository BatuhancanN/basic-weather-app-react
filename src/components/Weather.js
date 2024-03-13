import { useState, useEffect } from 'react';
import axios from 'axios';
import './weather.css';
import { usePosition } from 'use-position';
import { eventWrapper } from '@testing-library/user-event/dist/utils';

function Weather() {
  const apiKey = process.env.REACT_APP_API_KEY;

  const [weather, setWeather] = useState();
  const { latitude, longitude } = usePosition();
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');

  useEffect(() => {
    if (city === '' && latitude && longitude) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=tr`
        )
        .then((response) => setWeather(response.data))
        .catch((e) => alert(e))
        .finally(() => setLoading(false));
    } else if (city !== '') {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`
        )
        .then((response) => setWeather(response.data))
        .catch((e) => alert(e))
        .finally(() => setLoading(false));
    }
  }, [latitude, longitude, apiKey]);

  const handleSearch = () => {
    if (city.trim() !== '') {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`
        )
        .then((response) => setWeather(response.data))
        .catch((e) => alert(e))
        .finally(() => setLoading(false));
    } else if (latitude && longitude) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=tr`
        )
        .then((response) => setWeather(response.data))
        .catch((e) => alert(e))
        .finally(() => setLoading(false));
    }
  };

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') handleSearch();
  }

  console.log(weather);

  return (
    <div className='container'>
      <div className='top-bar'>
        <input
          type='text'
          className='cityInput'
          placeholder='Ara'
          value={city}
          onKeyDown={handleKeyDown}
          onChange={(e) => setCity(e.target.value)}
        />
        <div className='search-icon' onClick={handleSearch}>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAZNJREFUSEvtlu1NQzEMRd1JgEmASYBJgEmASYBJgEmAI8Xoyi+xE1VP/UOkqh9JfWxf23kHO9E6nIhrK+BzM/PXp5m9HeN0BQZ0a2b3AwgOvPzuPaw6kYGvzOx10uCyAyMwEWiUz2b21dILhIVjly0j7t/jbPQ9sEYK5K7Q06VAFtb1jP498EcrIozoflZc7CEL7zh7UUkUwU+SOvWcqNjTFXXVM0hDpoYrgj1aWgWwr6i5GgQAiEXUSFVGHcHfzYAaUzifgWCc4oupVQdJtxfiJnIFa6rSPzUret5l0cJMi0zB6m01WGD7cOEz0vDiN+Ripa2lgGlvk5pRGz25/v4a22XK2wQ8LddsVVdt6fte1XxP5cr6OE1VxxNN83IfxwlEZQ5bQuBaVGW0owNxVlfXXrzFymgzz3q303uL3tuGQjoLtxM2p67I6j5mPvutkxWYP5HgzBS8GhQ+JG4SB3RQaDulkVdgjVKvRY+q99w1BV8Bz/Yy50r4XuAI38ztPcEO57ls81CwN3gozz94pXKPOvsDp3hrHxxphrAAAAAASUVORK5CYII="
            alt="Search"
          />
        </div>
      </div>
      <div className='weather-location'>
      <h1>{loading ? 
      <img src="data:image/png;base64,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"/>
      : weather.name}</h1>
    </div>

    <div className='weather-description'>
      <h2>{loading ? '' : weather.weather.map(data => data.description.charAt(0).toUpperCase() + data.description.slice(1))}</h2>
    </div>

    <div className='temparature'>
      <h2>{loading ? '' : weather.main.feels_like + ' °C'}</h2>
    </div>

    <div className='weather-details'>
      <div className='min-temparature'>
        <p>{loading ? '' : 'En düşük: ' + weather.main.temp_min + ' °C'}</p>
      </div>

      <div className='max-temparature'>
        <p>{loading ? '' : 'En yüksek: ' + weather.main.temp_max + ' °C'}</p>
      </div>

      <div className='humidity'>
        <p>{loading ? '' : 'Nem oranı: %' + weather.main.humidity}</p>
      </div>
    </div>

    <div className='dateTime'>
        <h3>{loading ? '' : new Date(weather.dt * 1000).toLocaleDateString()}</h3>
    </div>
  </div>
  );
}

export default Weather;
