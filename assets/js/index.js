const init = () => {
    fetchDefaultData()
}

const fetchDefaultData = () => {
    const options = {
        method: 'GET',
        headers: {
            "X-RapidAPI-Key": "d8b0d12ba3msh38e30c06b42d375p1ba990jsne3b6255da171",
            "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com"
        }
    };
    
    fetch("https://community-open-weather-map.p.rapidapi.com/weather?q=Nairobi&units=metric", options)
        .then(res => res.json())
        .then(weatherData => uploadDefaultWeather(weatherData))
        .catch(err => console.error(err));
}

const uploadDefaultWeather = (weatherData) => {
    const defaultDetail = document.querySelector(".wrapper");
    const weatherDetails = document.querySelector(".weatherDetails")

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
}

const form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

function handleSubmit (event){
    event.preventDefault();
    const cityInput = event.target.location.value;
    searchWeather(cityInput);
    form.reset();
}

const searchWeather = (city) =>{
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "d8b0d12ba3msh38e30c06b42d375p1ba990jsne3b6255da171",
            "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com"
        }
    };
    
    fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${city}&units=metric`, options)
        .then(res => res.json())
        .then(weatherData => renderWeather(weatherData))
        .catch(err => console.error(err));

}

const renderWeather = (weatherData) => {
    const defaultDetail = document.querySelector(".wrapper");
    const weatherDetails = document.querySelector(".weatherDetails")

    const temp = weatherData.main.temp;
    const city = weatherData.name;
    const feelsLikeTemp = weatherData.main.feels_like;
    const cloudy = weatherData.clouds.all;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const icon = weatherData.weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
    const weatherDescription = weatherData.weather[0].description;
    const date = calculateDate();

    defaultDetail.innerHTML = `
        <h1 class="degree">${Math.floor(temp)}°</h1>
        <div class="cityDate">
        <h1 class="cityName">${city}</h1>
        <p class="day">${date}</p>
        </div>
        <img src="${imageURL}" >
    `;
    document.querySelector(".cityName").addEventListener("mouseover", () => console.log(weatherDescription))
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
}

const cities = document.querySelectorAll(".cities h3");
cities.forEach( city => city.addEventListener("click", ()=> displayWeather(city.textContent)))

const displayWeather = (location) => {
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "d8b0d12ba3msh38e30c06b42d375p1ba990jsne3b6255da171",
            "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com"
        }
    };
    
    fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${location}&units=metric`, options)
        .then(res => res.json())
        .then(weatherData => renderWeather(weatherData))
        .catch(err => console.error(err));
}

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
}

init();


// const temp = weatherData.main.temp;
// const feelsLikeTemp = weatherData.main.feels_like;
// const weatherDescription = weatherData.weather[0].description;
// const humidity = weatherData.main.humidity;
// const visibility = weatherData.visibility;
// const windSpeed = weatherData.wind.speed;



// const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"&appid="+apiKey;