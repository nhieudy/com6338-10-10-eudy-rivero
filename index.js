let form = document.querySelector('form');
let h2 = document.querySelector('h2');
let PET_KEY = 'petName';
let pet = localStorage.getItem(PET_KEY);

let previousName = localStorage.getItem("petName");
if (previousName) {
  h2.textContent = `Hello, ${previousName}!`
}

form.onsubmit = function(e) {
  e.preventDefault()
  let name = form.petName.value
  localStorage.setItem(PET_KEY, name)
  h2.textContent = `Hello, ${name}!`;
  console.log(name);
  form.reset();
}