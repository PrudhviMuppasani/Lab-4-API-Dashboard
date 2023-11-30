function fetchGeoCode(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Error");
    }
    return response.json();
  });
}

function getLocalDates(latitude, longitude) {
  const date = new Date();
  const utcTime = date.getTime();

  const offset = Math.round(longitude / 15);
  const todayLocalTime = new Date(utcTime + offset * 60 * 60 * 1000);

  const tomorrowLocalTime = new Date(todayLocalTime);
  tomorrowLocalTime.setDate(todayLocalTime.getDate() + 1);

  const todayLocalDate = todayLocalTime.toISOString().split("T")[0];
  const tomorrowLocalDate = tomorrowLocalTime.toISOString().split("T")[0];

  return [todayLocalDate, tomorrowLocalDate];
}

function todaySunriseSunsetApiCall(todaySunriseSunsetUrl, todayDate) {
  fetch(todaySunriseSunsetUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error");
      }
      return response.json();
    })
    .then((data) => {
      let apiDataRiseSet = data.results;
      document.getElementById("todayDate").innerHTML = todayDate;
      document.getElementById("todaySunriseText").innerHTML =
        apiDataRiseSet.sunrise;
      document.getElementById("todaySunsetText").innerHTML =
        apiDataRiseSet.sunset;
      document.getElementById("todayDawnText").innerHTML = apiDataRiseSet.dawn;
      document.getElementById("todayDuskText").innerHTML = apiDataRiseSet.dusk;
      document.getElementById("todayDayLengthText").innerHTML =
        apiDataRiseSet.day_length;
      document.getElementById("todaySolarNoonText").innerHTML =
        apiDataRiseSet.solar_noon;
      document.getElementById("todayTimeZoneText").innerHTML =
        apiDataRiseSet.timezone;
      document.getElementById("todayGoldenHour").innerHTML =
        apiDataRiseSet.golden_hour;
    })
    .catch((error) => {
      console.error("Error from GeoCode API-> ", error);
    });
}

function tomorrowSunriseSunsetApiCall(tomorrowSunriseSunsetUrl, tomorrowDate) {
  fetch(tomorrowSunriseSunsetUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error");
      }
      return response.json();
    })
    .then((data) => {
      let apiDataRiseSet = data.results;
      document.getElementById("tomorrowDate").innerHTML = tomorrowDate;
      document.getElementById("tomorrowSunriseText").innerHTML =
        apiDataRiseSet.sunrise;
      document.getElementById("tomorrowSunsetText").innerHTML =
        apiDataRiseSet.sunset;
      document.getElementById("tomorrowDawnText").innerHTML =
        apiDataRiseSet.dawn;
      document.getElementById("tomorrowDuskText").innerHTML =
        apiDataRiseSet.dusk;
      document.getElementById("tomorrowDayLengthText").innerHTML =
        apiDataRiseSet.day_length;
      document.getElementById("tomorrowSolarNoonText").innerHTML =
        apiDataRiseSet.solar_noon;
      document.getElementById("tomorrowTimeZoneText").innerHTML =
        apiDataRiseSet.timezone;
      document.getElementById("tomorrowGoldenHour").innerHTML =
        apiDataRiseSet.golden_hour;
    })
    .catch((error) => {
      console.error("Error from GeoCode API-> ", error);
    });
}

function handleLocationSearch() {
  const searchedLocationValue = document
    .getElementById("searchedLocationValue")
    .value.trim();

  let capitalizedValue =
    searchedLocationValue.charAt(0).toUpperCase() +
    searchedLocationValue.slice(1);
  console.log(capitalizedValue);

  let searchedValue = document.querySelectorAll("#searchLocation");

  searchedValue.forEach((element) => {
    element.textContent = capitalizedValue;
  });

  if (searchedLocationValue.length !== 0) {
    const getGeoCodeUrl = `https://geocode.maps.co/search?q=${encodeURIComponent(
      searchedLocationValue
    )}`;

    fetchGeoCode(getGeoCodeUrl)
      .then((data) => {
        if (data.length !== 0) {
          const { lat, lon } = data[0];
          const Latitude = lat;
          const Longitude = lon;

          console.log(
            "Latitude Value======== " + lat + "Longitude Value========= " + lon
          );

          const todayTomorrowDates = getLocalDates(Latitude, Longitude);

          const todayDate = todayTomorrowDates[0];
          const tomorrowDate = todayTomorrowDates[1];

          console.log("Today's Date ================= " + todayDate);

          console.log("Tomorrow's Date ================== " + tomorrowDate);

          const todaySunriseSunsetUrl = `https://api.sunrisesunset.io/json?lat=${encodeURIComponent(
            lat
          )}&lng=${encodeURIComponent(lon)}&date=${todayDate}`;
          const tomorrowSunriseSunsetUrl = `https://api.sunrisesunset.io/json?lat=${encodeURIComponent(
            lat
          )}&lng=${encodeURIComponent(lon)}&date=${tomorrowDate}`;

          todaySunriseSunsetApiCall(todaySunriseSunsetUrl, todayDate);
          tomorrowSunriseSunsetApiCall(tomorrowSunriseSunsetUrl, tomorrowDate);
        } else {
          alert("Please Enter a Valid Location to Search");
          console.log("Error");
        }
      })
      .catch((error) => {
        console.log("Error from GeoCode API-> ", error);
        alert("There is and Error With the API being Used, Please Try Later.");
      });
  } else {
    alert("Please Enter any Location to Search");
    location.reload();
    console.log("Please enter Location");
  }
}
