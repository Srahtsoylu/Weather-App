const wrapper = document.querySelector(".wrapper");
inputPart = wrapper.querySelector(".input-part");
infotxt = inputPart.querySelector(".info-txt");
inputField = inputPart.querySelector("input");
locationBtn = inputPart.querySelector("Button");
backbutton = document.querySelector("header i");
iconn = document.querySelector(".weather-part img");
let api;

inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});
locationBtn.addEventListener("click", () => {
    infotxt.innerText = "Loading";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSucses, onError);
  } else {
    console.log("");
  }
});
function onSucses(position) {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=a9a3d1cd0a0b1c8016473d456015957d`;
  infotxt.innerText = "Loading";
  fetchData();
}
function onError(err) {
  infotxt.innerText = err.message;
  console.log(err);
}
function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a9a3d1cd0a0b1c8016473d456015957d`;
  infotxt.innerText = "Loading";
  fetchData();
}

function weatherDetails(info) {
  if (info.cod == "404") {
    infotxt.innerText = `${inputField.value} adında bir şehir bulunamadı`;
  } else {
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { feels_like, humidity, temp } = info.main;
    console.log(id);

    if (id == 800) {
      iconn.src = "images/clear.svg";
    } else if (id > 800 && id < 805) {
      iconn.src = "images/cloud.svg";
    } else if (id > 700 && id < 782) {
      iconn.src = "images/haze.svg";
    } else if (id > 599 && id < 623) {
      iconn.src = "images/snow.svg";
    } else if ((id) => 300 && id <= 321) {
      icon.src = "images/rain.svg";
    }
    wrapper.querySelector(".temp, .num").innerText = Math.floor(temp);
    wrapper.querySelector(".weather").innerText = description;
    wrapper.querySelector(".location").innerText = `${city}, ${country}`;
    wrapper.querySelector(".numb").innerText = Math.floor(feels_like);
    wrapper.querySelector(".humidity span").innerText = `${humidity}%`;
    wrapper.classList.add("active");
  }
  console.log(info);
}
function fetchData() {
  fetch(api).then((response) =>
    response.json().then((result) => weatherDetails(result))
  );
}
backbutton.addEventListener("click", () => {
  wrapper.classList.remove("active");
  infotxt.innerText ="";
});
