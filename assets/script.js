const apiKey = `bd13bf9d049abe818932565b25112319`;

//Setting up Search button
const searchBtn = document.getElementById(`search-btn`);
searchBtn.addEventListener(`click`, searchSubmit);
function searchSubmit(e) {
  let cityName = document.getElementById(`search-input`).value.trim();
  e.preventDefault();
  getCity(cityName);
}

// Function to fetch city based on search input and runs the current weather function and 5 day forecast function
function getCity(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then((city) => {
      currentWeather(city);
      //   get5DayCast(city.coord.lat, city.coord.lon);
    })
    .catch((error) => console.log(error));
}

function currentWeather(city) {
  const cityNameEl = document.getElementById(`selected-city-name`);
  cityNameEl.textContent = `${city.name} (${new Date().toLocaleDateString()})`;
}

function get5DayCast(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&units=metric&appid=${apiKey}`
  );
}
