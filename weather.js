const lat = localStorage.getItem("lat");
const lon = localStorage.getItem("lon");
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=61ac71fca852832313e86693bf383076`;
const form = document.querySelector("form");
const div = document.querySelector(".weather_card");
const tempHeader = document.querySelector(".current_header");
const locationHeader = document.querySelector(".location_header");
const feelsHeader = document.querySelector(".feels_header");
const walkHeader = document.querySelector(".walk_header");
const walkStatus = document.querySelector(".walk_status");
const LAT_KEY = "lat";
const LON_KEY = "lon";
const ZIP_KEY = "zipCode";

//Header if name is inputted or not
let previousName = localStorage.getItem("petName");
if (previousName) {
  walkHeader.textContent = `Is it time to walk ${previousName}?`;
} else {
  walkHeader.textContent = `Is it time to walk Fido?`;
}

//Get the weather data
const getWeather = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    alert("Data error!")
  }
};
//Display the weather data
const displayWeather = (data) => {
  console.log(data);

  //Weather Data
  const {
    name,
    sys: { country },
    weather: [{ icon, description }],
    main: { temp, temp_min, temp_max, feels_like },
  } = data;

  //Create p element, textcontent, and putting it after headers
  let location = document.createElement("p");
  location.textContent = `${name}, ${country}`;
  locationHeader.after(location);

  let temperature = document.createElement("p");
  temperature.textContent = `${temp}\u00B0F`;
  tempHeader.after(temperature);

  let feels = document.createElement("p");
  feels.textContent = `${feels_like}\u00B0F`;
  feelsHeader.after(feels);

  //Determine if it's safe to walk by checking the temp
  if (temp > 85) {
    walkStatus.textContent = "It's too hot to walk!";
  } else if (temp < 85 && temp > 32) {
    walkStatus.textContent = "It's a good time to walk!";
  } else {
    walkStatus.textContent = "It's too cold to walk!";
  }
};

//When new zip code is inputted, get lat and lon, and send url to getWeather function
form.onsubmit = async (e) => {
  e.preventDefault();
  const zipCode = form.zipCode.value;
  try {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=61ac71fca852832313e86693bf383076`
    );
    const data = await res.json();
    getWeather(
      `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&units=imperial&appid=61ac71fca852832313e86693bf383076`
    );
    if (res.ok) {
      alert("Info saved!");
    } else {
      alert("Invalid Zip Code!");
      return;
    }
    //Save the data again, so that it displays in the case that they did not initially use home page form
    localStorage.setItem(LAT_KEY, data.lat);
    localStorage.setItem(LON_KEY, data.lon);
    localStorage.setItem(ZIP_KEY, zipCode);
  } catch (err) {
    alert("Error!");
  }

  //Remove old weather information
  const paras = div.querySelectorAll("p");
  paras.forEach((paragraph) => {
    paragraph.remove();
  });
};

getWeather(url);
