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

    defaultDetail.innerHTML = `
        <h1 class="degree">${Math.floor(temp)}°</h1>
        <div class="cityDate">
        <h1 class="cityName">${city}</h1>
        <p class="day">13:39-Monday, 9 Sep '19</p>
        </div>
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


init();


// const temp = weatherData.main.temp;
// const feelsLikeTemp = weatherData.main.feels_like;
// const weatherDescription = weatherData.weather[0].description;
// const humidity = weatherData.main.humidity;
// const visibility = weatherData.visibility;
// const windSpeed = weatherData.wind.speed;
// const icon = weatherData.weather[0].icon;
// const country = weatherData.sys.country
// const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";


// const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"&appid="+apiKey;