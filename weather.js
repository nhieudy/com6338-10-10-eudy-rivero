const lat = localStorage.getItem("lat");
const lon = localStorage.getItem("lon");
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=61ac71fca852832313e86693bf383076`;

const div = document.querySelector(".weather_card");
const tempHeader = document.querySelector(".current_header");
const locationHeader = document.querySelector(".location_header");
const feelsHeader = document.querySelector(".feels_header");

const getWeather = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    console.log("error");
  }
}

getWeather(url);

const displayWeather = (data) => {
    console.log(data)
    //Weather Data
    const {
    name,
    sys: { country },
    weather: [{ icon, description }],
    main: { temp, temp_min, temp_max, feels_like },
  } = data;

    const location = document.createElement('p');
    location.textContent = `${name}, ${country}`;
    locationHeader.after(location);

    const temperature = document.createElement('p');
    temperature.textContent = `${temp}\u00B0F`;
    tempHeader.after(temperature)

    const feels = document.createElement('p');
    feels.textContent = `${feels_like}\u00B0F`;
    feelsHeader.after(feels);


};
