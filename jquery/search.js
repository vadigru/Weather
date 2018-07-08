$(document).ready(function () {
  $(`#search`).keydown(function () {
    $.getJSON(`json/list.json`, function (data) {
      let searchField = $(`#search`).val();
      let expression = new RegExp(searchField, `i`);
      $(`#result`).html(``);
      $.each(data, function (key, value) {
        if ((value.name.search(expression) !== -1) || (value.country.search(expression) !== -1)) {
          $(`#result`).append(`<li class="list-group-item getloc">` + value.name + `, ` + value.country + `</li>`);
        }
      });
    });
  });
});

