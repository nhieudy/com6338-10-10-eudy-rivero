let form = document.querySelector('form');
let factsContainer = document.getElementById('factsContainer');
let numFactsInput = document.getElementById('numFacts');
let descriptionHeader = document.querySelector('.description_header');
let placeholderText = document.getElementById('placeholderText');

const NUM_FACTS_KEY = 'numFacts';
const DOG_FACTS_KEY = 'dogFacts';
const FACTS_TIMESTAMP_KEY = 'factsTimestamp';

// Load saved number of facts and display saved facts on page load
let savedNumFacts = localStorage.getItem(NUM_FACTS_KEY);
let savedFacts = localStorage.getItem(DOG_FACTS_KEY);

console.log('Saved numFacts:', savedNumFacts);
console.log('Saved facts:', savedFacts);

if (savedNumFacts) {
  numFactsInput.value = savedNumFacts;
}

// Only display saved facts if we have BOTH the number AND the facts saved
if (savedFacts && savedNumFacts) {
  let factsArray = JSON.parse(savedFacts);
  displayFacts(factsArray);
}

// Handle form submission
form.onsubmit = function(e) {
  e.preventDefault();
  
  let numFacts = numFactsInput.value;
  
  // Validate input
  if (!numFacts || numFacts < 1 || numFacts > 5) {
    alert('Please enter a number between 1 and 5');
    return;
  }
  
  // Only fetch if the number is different from what's saved
  let currentSavedNum = localStorage.getItem(NUM_FACTS_KEY);
  
  // Save number of facts to localStorage
  localStorage.setItem(NUM_FACTS_KEY, numFacts);
  
  // Fetch facts from API
  fetchDogFacts(numFacts);
};

function fetchDogFacts(limit) {
  const apiUrl = `https://dogapi.dog/api/v2/facts?limit=${limit}`;
  console.log('Fetching from:', apiUrl);
  
  fetch(apiUrl)
    .then(response => {
      console.log('Response received:', response);
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      // Extract facts array
      let factsArray = data.data.map(factObj => factObj.attributes.body);
      console.log('Facts array:', factsArray);
      
      // Save facts to localStorage
      localStorage.setItem(DOG_FACTS_KEY, JSON.stringify(factsArray));
      localStorage.setItem(FACTS_TIMESTAMP_KEY, Date.now());
      
      // Display the facts
      displayFacts(factsArray);
    })
    .catch(error => {
      console.error('Error fetching dog facts:', error);
      factsContainer.innerHTML = '<p>Error loading facts. Please try again.</p>';
    });
}

function displayFacts(factsArray) {
  // Clear previous facts
  factsContainer.innerHTML = '';
  
  // Show header and hide placeholder
  descriptionHeader.style.display = 'block';
  
  // Create a container for all facts
  let factsList = document.createElement('div');
  factsList.className = 'facts-list';
  
  // Loop through facts and create elements for each
  factsArray.forEach((factBody, index) => {
    let factItem = document.createElement('div');
    factItem.className = 'fact-item';
    factItem.innerHTML = `<p><strong>Fact ${index + 1}:</strong> ${factBody}</p>`;
    factsList.appendChild(factItem);
  });
  
  factsContainer.appendChild(factsList);
}
