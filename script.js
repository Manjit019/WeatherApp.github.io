
const apikey = "0904058356e87443560b817fe59b3c53";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

setInterval(livetime, 1000);
function livetime() {
    const date = new Date();
    document.querySelector(".current-date").innerHTML = `${date.toDateString()} | ${date.toLocaleTimeString()}`;
}


const search = document.querySelector(".search-box input");
const SearchBtn = document.getElementById("search-btn");
const weatherIcon = document.querySelector(".weather-icon");

let hours = new Date().getHours();
if (hours => 19 && hours <= 24) {
    weatherIcon.src = "./images/cloudy-night.png";
}

async function checkWeather(city) {
    const response = await fetch(apiurl + `&appid=${apikey}&q=${city}`);

    var data = await response.json();

    if (data.name == undefined) {
        document.querySelector(".city").innerHTML = "";
        document.querySelector(".error").style.display = "block";
    }
    else {
        document.querySelector(".error").style.display = "none";
        document.querySelector(".city").innerHTML = `<i class="fa-solid fa-location-dot"></i> ` + data.name;
    }
    document.querySelector(".temp h2").innerHTML = Math.round(data.main.temp) + `<sup><span>°C</span></sup>`;
    document.querySelector(".Wind b").innerHTML = data.wind.speed;
    document.querySelector(".Humidity b").innerHTML = data.main.humidity;
    document.querySelector(".Pressure b").innerHTML = data.main.pressure;
    document.querySelector(".Visibility b").innerHTML = data.visibility / 1000;
    console.log(data);

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "./images/cloudy.png";
    }
    else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "./images/rainy-day.png";
    }
    else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "./images/drizzle.png";
    }
    else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "./images/mist.png";
    }
    else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "./images/clear.png";
    }


    // }
}

SearchBtn.addEventListener("click", () => {
    localStorage.setItem("city", search.value);
    checkWeather(search.value);
});


city = localStorage.getItem("city");
checkWeather(city);


// Dark mode component 

const icon = document.querySelector(".icon");
icon.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    if (document.body.classList.contains("light-theme")) {
        icon.classList.remove("fa-moon")
        icon.classList.add("fa-sun");
    }
    else {
        icon.classList.add("fa-moon")
        icon.classList.remove("fa-sun");
    }
})