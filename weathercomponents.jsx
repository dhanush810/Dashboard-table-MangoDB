import React, { useEffect, useState } from 'react';
import "./weathercomponents.css";

function Comp() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/weathercomp');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('Received weather data:', data); // Log the received data
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (weatherData) {
      createProgressBar('temperatureChart', weatherData.temperature);
      createProgressBar('precipitationChart', weatherData.precipitation);
      createProgressBar('humidityChart', weatherData.humidity);
    }
  }, [weatherData]);

  const createProgressBar = (containerId, percentage) => {
    const container = document.getElementById(containerId);
    container.classList.add('progress-bar');

    const fill = document.createElement('div');
    fill.classList.add('progress-fill');
    fill.style.width = `${percentage}%`;

    const percentageText = document.createElement('div');
    percentageText.classList.add('percentage');
    percentageText.textContent = `${percentage}`;

    container.appendChild(fill);
    container.appendChild(percentageText);
  };

  return (
    <div className="admin-dashboard">
      <main>
        <h2>Weather Overview</h2>
        <div className="charts">
          <div className="chart-container">
            <div className="progress-bar" id="temperatureChart"></div>
            <p className="label">Temperature</p>
          </div>
          <div className="chart-container">
            <div className="progress-bar" id="precipitationChart"></div>
            <p className="label">Precipitation</p>
          </div>
          <div className="chart-container">
            <div className="progress-bar" id="humidityChart"></div>
            <p className="label">Humidity</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Comp;
