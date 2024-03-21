
const apikey = "0904058356e87443560b817fe59b3c53";
const apiurl = "../././api.openweathermap.org/data/2.5/weather?units=metric";

const date = new Date();
document.querySelector(".current-date").innerHTML = date.toDateString();

const search = document.querySelector(".search-box input");
const SearchBtn = document.getElementById("search-btn");
const weatherIcon = document.querySelector(".weather-icon");

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
    document.querySelector(".temp h2").innerHTML = Math.round(data.main.temp) + `<span>°C</span>`;
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
