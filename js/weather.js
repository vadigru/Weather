(function () {
  let body = document.querySelector(`body`);
  let weather = document.querySelector(`.weather_container`);
  let icon = document.querySelector(`.icon`);
  let search = weather.querySelector(`#search`);
  let result = weather.querySelector(`#result`);

  let onClickResultHandle = (evt) => {
    let target = evt.target;

    window.cityList.forEach(function (item) {
      if (target.textContent === (item.name + `, ` + item.country)) {
        let cityId = item.id;
        let cityLon = item.coord.lon;
        let cityLat = item.coord.lat;
        result.innerHTML = ``;
        search.value = item.name + `, ` + item.country;
        window.render.removePins();
        window.backend.load(cityId, cityLon, cityLat);
      }
      if ((target.id === `search`) && (target.value !== ``)) {
        search.value = ``;
      }
    });
  };

  let onClickMatchClear = (evt) => {
    let target = evt.target;
    if (target.tagName === `body`) {
      result.innerHTML = ``;
      search.value = ``;
    }
    if (target.classList !== `.getloc`) {
      if (target.id !== `search`) {
        result.innerHTML = ``;
        search.value = ``;
      }
    }
  };

  let onKeyPressEmptySearch = (evt) => {
    let target = evt.target;
    if (target.value === ``) {
      result.innerHTML = ``;
      search.value = ``;
    }
  };

  let onEscMatchClear = (evt) => {
    if (evt.keyCode === 27) {
      result.innerHTML = ``;
      search.value = ``;
    }
  };

  body.addEventListener(`click`, onClickResultHandle);
  document.addEventListener(`click`, onClickMatchClear, true);
  document.addEventListener(`keyup`, onKeyPressEmptySearch);
  document.addEventListener(`keyup`, onEscMatchClear);

})();
