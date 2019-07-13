(function () {
  let weather = document.querySelector(`.weather_container`);
  let icon = weather.querySelector(`.icon`);

  let renderCurrentWeather = (data) => {
    let description = weather.querySelector(`.description`);
    let place = weather.querySelector(`.place`);
    let temperature = weather.querySelector(`.temperature`);
    let start = weather.querySelector(`.start`);
    let h = weather.querySelector(`.h`);
    let circle = weather.querySelector(`.weather_circle`);

    circle.classList.remove(`hidden`);
    h.classList.remove(`hidden`);
    start.classList.add(`hidden`);
    if (data.weather[0].icon) {
      let img = document.createElement(`img`);
      img.src = `https://openweathermap.org/img/w/` + data.weather[0].icon + `.png`;
      icon.appendChild(img);
    }
    temperature.textContent = parseInt(data.main.temp, 10) + ` °C`;
    description.innerHTML = data.weather[0].description;
    place.textContent = data.name + `, ` + data.sys.country;
  };

  let renderWeather = (data, lon, lat) => {
    let dataList = data.list;
    let dataArray = [];
    let map = weather.querySelector(`.map`);
    dataList.forEach(function (item, i) {
      item.id = i;
      dataArray.push(item);
    });

    let iframe = document.createElement(`iframe`);
    let height = window.innerHeight;

    iframe.width = `100%`;
    if (height > 800) {
      height = height / 4;
    } else {
      height = height / 2;
    }

    let wc = document.querySelector(`.weather_circle`);
    wc.style.top = height / 2.2 + `px`;
    iframe.height = height + `px`;
    iframe.frameBorder = `0`;
    iframe.style.border = `0`;
    iframe.src = `https://www.google.com/maps/embed/v1/view?center=` + lat + `, ` + lon + `&zoom=10&key=AIzaSyCLMJSENck6qAnALYTF0pjMhE28e_WuN9s`;
    map.appendChild(iframe);

    let pins = weather.querySelector(`.pins`);
    pins.appendChild(renderDailyWeather(dataArray));
  };

  let dateToArray = (dt) => {
    let dateArray = dt.replace(/-/g, ` `).split(` `);
    return dateArray;
  };

  let timeToArray = (tm) => {
    let time = tm.replace(/-/g, `:`).split(` `);
    let timeArray = time[1].split(/:/);
    return timeArray;
  };

  let renderDailyWeather = (data) => {
    let fragment = document.createDocumentFragment();
    data.forEach(function (item) {
      let element = document.querySelector(`template`).content.querySelector(`.hourly`).cloneNode(true);
      element.querySelector(`.temp__icon>img`).src = `https://openweathermap.org/img/w/` + item.weather[0].icon + `.png`;
      // element.querySelector(`.temp__time`).textContent = item.dt_txt.slice(5, 10) + ` / ` + item.dt_txt.slice(10, 16);
      element.querySelector(`.temp__time`).textContent = dateToArray(item.dt_txt)[2] + `-` + dateToArray(item.dt_txt)[1] + ` | `
                                                       + timeToArray(item.dt_txt)[0] + `:` + timeToArray(item.dt_txt)[1];
      element.querySelector(`.temp__description`).textContent = item.weather[0].description;
      element.querySelector(`.temp__temperature`).textContent = ` ` + parseInt(item.main.temp, 10) + ` °C`;
      element.querySelector(`.temp__wind`).textContent = item.wind.speed + ` m/s`;
      fragment.appendChild(element);
    });
    return fragment;
  };

  let removePins = () => {
    let img = icon.querySelector(`img`);
    let map = weather.querySelector(`.map`);
    let iframe = weather.querySelector(`iframe`);
    let hourly = weather.querySelectorAll(`.hourly`);
    let pins = weather.querySelector(`.pins`);

    if (img) {
      icon.removeChild(img);
    }
    if (iframe) {
      map.removeChild(iframe);
    }
    [].forEach.call(hourly, function (item) {
      pins.removeChild(item);
    });
  };

  window.render = {
    renderCurrentWeather,
    renderWeather,
    renderDailyWeather,
    removePins
  };

})();
