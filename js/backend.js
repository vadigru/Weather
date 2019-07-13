(function () {
  const CITY = `./json/list.json`;

  const getFile = (fileName) => {
    const request = new XMLHttpRequest();
    request.open(`GET`, fileName);
    request.onloadend = function () {
      parse(request.responseText);
    };
    request.send();
  };

  getFile(CITY);

  let parse = (obj) => {
    window.cityList = JSON.parse(obj);
  };

  const load = (id, lon, lat) => {
    const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&APPID=0fcbd75464bb33d2a0aab610b32e1e45`;
    const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&APPID=0fcbd75464bb33d2a0aab610b32e1e45`;

    const xhttp = new XMLHttpRequest();
    const xhttp1 = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const obj = this.responseText;
        const obj1 = JSON.parse(obj);
        console.log(obj1);
        window.render.renderWeather(obj1, lon, lat);
      }
    };
    xhttp.open(`GET`, FORECAST_URL, true);
    xhttp.send();

    xhttp1.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const obj = this.responseText;
        const obj2 = JSON.parse(obj);
        window.render.renderCurrentWeather(obj2);
      }
    };
    xhttp1.open(`GET`, WEATHER_URL, true);
    xhttp1.send();
  };

  window.backend = {
    load,
  };
}());
