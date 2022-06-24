

const init = () => {
    fetchWeatherData()
}

const fetchWeatherData = (location = "Nairobi") => {
    const apiKey ="7dc19c68d1fc7adedac70203f767688e";
       
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
        .then(res => res.json())
        .then(weatherData => uploadWeather(weatherData))
        .catch(err => console.error(err));
}

const uploadWeather = (weatherData) => {
    const defaultDetail = document.querySelector(".wrapper");
    const weatherDetails = document.querySelector(".weatherDetails");
    const descriptionWrapper =  document.querySelector(".weatherDescription");

    const temp = weatherData.main.temp;
    const city = weatherData.name;
    const feelsLikeTemp = weatherData.main.feels_like;
    const cloudy = weatherData.clouds.all;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const icon = weatherData.weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
    const weatherDescription = weatherData.weather[0].description;
    const date = calculateDate()

    defaultDetail.innerHTML = `
        <h1 class="degree">${Math.floor(temp)}°</h1>
        <div class="cityDate">
        <h1 class="cityName">${city}</h1>
        <p class="day">${date}</p>
        </div>
        <img src="${imageURL}" >
        
    `;
    descriptionWrapper.innerHTML = `
        <h1>Description:</h1>
        <h2>The current weather is</h2>
        <h2>${weatherDescription}</h2>
    `;
    weatherDetails.innerHTML = `
        <h3 class="weatherDetailsTitle">Weather Details</h3>
        <div class="details">
        <p>Cloudy</p>
        <p>${cloudy}%</p>
        </div>
        <div class="details">
        <p>Humidity</p>
        <p>${humidity}%</p>
        </div>
        <div class="details">
        <p>Wind</p>
        <p>${windSpeed}m/s</p>
        </div>
        <div class="details">
        <p>Feels Like</p>
        <p>${feelsLikeTemp}<strong>°</strong></p>
        </div>
    `;

    document.querySelector(".cityName").addEventListener("mouseover", () => {
        onMouseOver();
        setTimeout( ()=> {descriptionWrapper.style.display = "none"}, 1500)
    });
    
}

const form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

function handleSubmit (event){
    event.preventDefault();
    const cityInput = event.target.location.value;
    fetchWeatherData(cityInput);
    form.reset();
}

// Display weather when names of cities on the page are clicked
const cities = document.querySelectorAll(".cities h3");
cities.forEach( city => city.addEventListener("click", ()=> fetchWeatherData(city.textContent)))

// Function to get date
const calculateDate = () => {
    const date = new Date();
    const getDate = date.getDate();
    const day = date.getDay();
    const daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
    const today = daylist[day];
    const getMonth = date.getMonth();
    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const month = monthList[getMonth].slice(0,3);
    const year = date.getFullYear().toString().slice(-2);
    let hour = date.getHours();
    hour = ('0' + hour).slice(-2);
    let minute = date.getMinutes();
    minute = ('0' + minute).slice(-2);
    let hourMin = `${hour}:${minute}`

    return  `${hourMin} - ${today}, ${getDate} ${month} '${year}`
};

const onMouseOver = () => {
    document.querySelector(".weatherDescription").style.display = "block";
}


document.addEventListener("DOMContentLoaded", init)

