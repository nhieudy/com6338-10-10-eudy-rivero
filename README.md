# com6338-10-10-eudy-rivero
Use Agile principles with a team to create a mobile-responsive front-end web application with JavaScript that incorporates the use of two different Web APIs. (10.1)

We decided to choose dogs as the theme for our website. The pages will consist of a home, “Walks”, and “Facts” page. The home page will describe the website and its purpose, as well as give users the option to input personal information (zip code, pet’s name) that will then be saved in localstorage and be used throughout the website to customize their experience. 

The “Walks” page will display the current weather and will let the user know if it is safe to walk their dog based on the local temperature. The user can also update the weather card by inputting a valid zip code. If the user did not input their zip code on the home page, they can still do so on the “Walks” page in the same manner. The page will use the Geocoding API and the Current Weather API from OpenWeatherMap.com to get temperature data. 

The “Facts” page will use the Dog API from dogapi.dog to generate random facts. The user will be able to input a number from 1-5, depending on how many facts they will like to read. The number and the list of facts are stored in localstorage.
