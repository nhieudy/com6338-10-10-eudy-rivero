let form = document.querySelector("form");
let h2 = document.querySelector("h2");
const PET_KEY = "petName";
const ZIP_KEY = "zipCode"
let pet = localStorage.getItem(PET_KEY);

let previousName = localStorage.getItem("petName");
let previousZIP = localStorage.getItem("zipCode");

if (previousName) {
  h2.textContent = `Hello, ${previousName}!`;
}
else{
    h2.textContent = `Hello, Fido!`;
}

form.onsubmit = (e) => {
  e.preventDefault();
  let name = form.petName.value;
  let zipCode = form.zipCode.value;
  name = capitalizeString(name);
  localStorage.setItem(PET_KEY, name);
  localStorage.setItem(ZIP_KEY, zipCode);
  h2.textContent = `Hello, ${name}!`;
  console.log(name);
  form.reset();
};

const capitalizeString = (name) => {
  return String(name[0]).toUpperCase() + String(name).slice(1).toLowerCase();
};