const apiKey = `bd13bf9d049abe818932565b25112319`;

//Setting up Search button
const searchBtn = document.getElementById(`search-btn`);
searchBtn.addEventListener(`click`, searchSubmit);
function searchSubmit(e) {
  let cityName = document.getElementById(`search-input`).value.trim();
  e.preventDefault();
  getCity(cityName);
}

// Function to fetch city based on search input and runs the current weather function,5 day forecast function and update localstorage history function
function getCity(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((res) => res.json())
    .then((city) => {
      currentWeather(city);
      get5DayCast(city.coord.lat, city.coord.lon);
      cityHistoryFn(city)
    })
    .catch((error) => console.log(error));
}

//Current Weather function to insert returned API results onto the page
function getIcon(icon) {
    const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
    return `<img src="${iconUrl}" alt="Weather icon">`;
  }

function currentWeather(city) {
  const cityNameEl = document.getElementById(`selected-city-name`);
  const tempEl = document.getElementById(`temp-current`);
  const windEl = document.getElementById(`wind-current`);
  const humidityEl = document.getElementById(`humidity-current`);

  cityNameEl.textContent = `${city.name} (${new Date().toLocaleDateString()})`;
  cityNameEl.innerHTML += getIcon(city.weather[0].icon);
  tempEl.textContent = `${city.main.temp}°C`;
  windEl.textContent = `${city.wind.speed} km/h`;
  humidityEl.textContent = `${city.main.humidity}%`;
}

// Functions to fetch forecast weather and running function to insert returned API results onto page
function get5DayCast(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  )
    .then((res) => res.json())
    .then((forecast) => {
      forecastWeather(forecast);
    })
    .catch((error) => console.log(error));
}

function forecastWeather(forecast) {
  const forecastBox = document.getElementById("forecast-box");

  for (let i = 0; i < forecast.list.length; i += 8) {
    // API returns data for every 3 hours. so +8 is a new day

    const forecastEl = document.createElement("div");
    forecastEl.innerHTML = `
    <p>${new Date(forecast.list[i].dt_txt).toLocaleDateString()}</p>
    <p>${getIcon(forecast.list[i].weather[0].icon)}</p>
    <p>Temp: ${forecast.list[i].main.temp} °C</p>
    <p>Wind: ${forecast.list[i].wind.speed} km/h</p>
    <p>Humidity: ${forecast.list[i].main.humidity}%</p>
    `;
    forecastBox.appendChild(forecastEl);
  }
}

//Functions for city search history
function cityHistoryFn(city) {
  const cityHistoryArr = JSON.parse(localStorage.getItem("cityHistory")) || [];
  if (!cityHistoryArr.some(item => item.name === city.name)) {
    cityHistoryArr.push(city);
    localStorage.setItem("cityHistory", JSON.stringify(cityHistoryArr));
  }
  updateHistory();
}

function updateHistory() {
  const cityHistoryArr = JSON.parse(localStorage.getItem("cityHistory")) || [];
  const historyEl = document.getElementById(`city-history`);

  historyEl.innerHTML = ""

  cityHistoryArr.forEach(function (city) {
    const cityBtn = document.createElement("button");
    cityBtn.textContent = city.name;
    historyEl.appendChild(cityBtn);
  });

  //Clear button
  if (cityHistoryArr.length > 0) {
    const clearBtn = document.createElement("button");
    clearBtn.textContent = `Clear City History`;

    historyEl.appendChild(clearBtn);

    clearBtn.addEventListener("click", function () {
      localStorage.clear();
      updateHistory();
    });
  }
}

// document.getElementById(`city-history`).addEventListener(`click`);
