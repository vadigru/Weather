(function () {
  let CITY = `list.json`;

  let getFile = (fileName) => {
    let request = new XMLHttpRequest();
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

  let load = (id, lon, lat) => {
    let FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?id=` + id + `&units=metric&APPID=0fcbd75464bb33d2a0aab610b32e1e45`;
    let WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?id=` + id + `&units=metric&APPID=0fcbd75464bb33d2a0aab610b32e1e45`;

    let xhttp = new XMLHttpRequest();
    let xhttp1 = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        let obj = this.responseText;
        let obj1 = JSON.parse(obj);
        window.render.renderWeather(obj1, lon, lat);
      }
    };
    xhttp.open(`GET`, FORECAST_URL, true);
    xhttp.send();

    xhttp1.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        let obj = this.responseText;
        let obj2 = JSON.parse(obj);
        window.render.renderCurrentWeather(obj2);
      }
    };
    xhttp1.open(`GET`, WEATHER_URL, true);
    xhttp1.send();
  };


  window.backend = {
    load: load
  };
})();
