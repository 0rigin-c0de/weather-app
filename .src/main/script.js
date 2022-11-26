const wrapper = document.querySelector(".wrapper"),
  inputPart = document.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-txt"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button"),
  weatherPart = wrapper.querySelector(".weather-part"),
  arrowBack = wrapper.querySelector("header i");
let url;

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser not support geolocation api");
  }
});

function onSuccess(position) {
  const { longitude, latitude } = position.coords;
  const apikey = "2d4ead0c457b554e818493a791ce4c34";
  url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;

  fetchData(url);
}

function onError(error) {
  infoTxt.innerText = error.message;
  infoTxt.classList.add("error");
}

// function fetchData(url) {
//   infoTxt.innerText = "Getting Weather Details.......";
//   infoTxt.classList.add("pending");
//   fetch(url) //api for the get request
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// }
function fetchData() {
  infoTxt.innerText = "Getting weather details...";
  infoTxt.classList.add("pending");
  fetch(url)
    .then((res) => res.json())
    .then((result) => weatherDetails(result))
    .catch(() => {
      infoTxt.innerText = "Something went wrong";
      infoTxt.classList.replace("pending", "error");
    });
}
function weatherDetails(info) {
  if (info.cod == "") {
    infoTxt.classList.replace("pending", "error");
    infoTxt.innerText = `${inputField.value} isn't a valid city name`;
  } else {
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { temp, feels_like, humidity } = info.main;

    weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
    weatherPart.querySelector(".weather").innerText = description;
    weatherPart.querySelector(
      ".location span"
    ).innerText = `${city}, ${country}`;
    weatherPart.querySelector(".temp .numb-2").innerText =
      Math.floor(feels_like);
    weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
    infoTxt.classList.remove("pending", "error");
    infoTxt.innerText = "";
    inputField.value = "";
    wrapper.classList.add("active");
  }
}
arrowBack.addEventListener("click", () => {
  wrapper.classList.remove("active");
});
