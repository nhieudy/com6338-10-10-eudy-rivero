const previousZIP = localStorage.getItem("zipCode");
const main = document.querySelector("main");
const urlZip = `http://api.openweathermap.org/geo/1.0/zip?zip=${previousZIP}&appid=61ac71fca852832313e86693bf383076`;
// fetch(url) // make the request
// .then(function(res) {
//   return res.json() // when the response is received, convert to json
// })
// .then(function(res) {
//   console.log(res) // when the json is converted, log it
// })
// .catch(function(err) {
//   console.log(err)
// })

geoCode(urlZip);

const geoCode = async (url) => {
  try {
    const res = await fetch(url);
    const geoData = await res.json();
    latLon(geoData);
  } catch (err) {
    const wrong = document.createElement(`h2`);
    wrong.textContent = "Incorrect Zip Code";
    main.appendChild(wrong);
  }
};

const latLon = (geoData) => {
console.log(geoData)
}

