const apiKey = `bd13bf9d049abe818932565b25112319`;

//Setting up Search button
const searchBtn = document.getElementById(`search-btn`);
const searchInput = document.getElementById(`search-input`).value.trim();
searchBtn.addEventListener("submit", searchSubmit);

function searchSubmit(e) {
  e.preventDefault();
  getCity(searchInput);
}

// Function to fetch city based on search input and runs the current weather function and 5 day forecast function
function getCity(city) {
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
  )
    .then((res) => res.json)
    .then((city) => {
      currentWeather(city);
      get5DayCast(city[0].lat, city[0].lon);
    })
    .catch((error) => console.log(error));
}

function currentWeather(city) {}

function get5DayCast(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&units=metric&appid=${apiKey}`
  );
}


