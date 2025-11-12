let form = document.querySelector("form");
let h2 = document.querySelector("h2");
let main = document.querySelector("main");
const PET_KEY = "petName";
const ZIP_KEY = "zipCode";
const LAT_KEY = "lat";
const LON_KEY = "lon";
let pet = localStorage.getItem(PET_KEY);
let previousName = localStorage.getItem("petName");
let previousZIP = localStorage.getItem("zipCode");
const url = `http://api.openweathermap.org/geo/1.0/zip?zip=`;
const apikey = `&appid=61ac71fca852832313e86693bf383076`;

if (previousName) {
  h2.textContent = `Hello, ${previousName}!`;
} else {
  h2.textContent = `Hello, Fido!`;
}

form.onsubmit = async (e) => {
  e.preventDefault();
  const zipCode = form.zipCode.value;
  try {
    const res = await fetch(url + zipCode + apikey);
    const geoData = await res.json();
    if (res.ok) {
      alert("Info saved!");
      latLon(geoData);
    } else {
      alert("Invalid Zip Code!");
    }
  } catch (err) {
    alert("Incorrect Inputs!");
  }
};

const latLon = (geoData) => {
  let name = capitalizeString(form.petName.value);
  let zipCode = form.zipCode.value;
  const lat = geoData.lat;
  const lon = geoData.lon;
  localStorage.setItem(PET_KEY, name);
  localStorage.setItem(ZIP_KEY, zipCode);
  localStorage.setItem(LAT_KEY, lat);
  localStorage.setItem(LON_KEY, lon);
  h2.textContent = `Hello, ${name}!`;
  form.reset();
};

const capitalizeString = (name) => {
  return String(name[0]).toUpperCase() + String(name).slice(1).toLowerCase();
};
