$(document).ready(function () {
  // Dom Variables
  // var CORS = "https://cors-anywhere.herokuapp.com/";
  var submitBtnGym = $("#input-btn-gym");
  var submitBtnMarket = $("#input-btn-market");
  var firstContainer = $("#first-container");
  var secondContainer = $("#second-container");
  var homeBtn = $("#home");
  // var gymList = $("#gymList");

  // JS variables

  // Functions

  function gymGeneration(userInput) {
    var positionQueryURL = `https://www.mapquestapi.com/search/v2/radius?origin=${userInput}&radius=7&maxMatches=40&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|799101&outFormat=json&key=FZoxJhWY2xMjvAB5kYeqPUCSU8eAs6hV`;

    $.ajax({
      url: positionQueryURL,
      method: "GET",
    }).then(function (success) {
      var geoLatitude = success.origin.latLng.lat;
      var geoLongitude = success.origin.latLng.lng;

      L.mapquest.key = "FZoxJhWY2xMjvAB5kYeqPUCSU8eAs6hV";
      var map = L.mapquest.map("map", {
        center: [geoLatitude, geoLongitude],
        layers: L.mapquest.tileLayer("map"),
        zoom: 15,
      });

      for (var i = 0; i < 20; i++) {
        var popGymListContiner = $("<ul>");
        var popGymList = $("<li>");
        var gymName = success.searchResults[i].fields.name;
        var gymAddress = success.searchResults[i].fields.address;
        var gymPhoneNumber = success.searchResults[i].fields.phone;
        console.log(success.searchResults[i]);

        var gymComp = gymName + "\n" + gymAddress + "\n" + gymPhoneNumber;

        var gymCompLat = success.searchResults[i].fields.lat;
        var gymCompLon = success.searchResults[i].fields.lng;

        L.marker([gymCompLat, gymCompLon], {
          icon: L.mapquest.icons.marker(),
          draggable: false,
        })
          .bindPopup(gymComp)
          .addTo(map);
      }
    });
  }

  function marketGeneration(userInput) {
    var positionQueryURL = `https://www.mapquestapi.com/search/v2/radius?origin=${userInput}&radius=7&maxMatches=20&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|541101&outFormat=json&key=FZoxJhWY2xMjvAB5kYeqPUCSU8eAs6hV`;

    $.ajax({
      url: positionQueryURL,
      method: "GET",
    }).then(function (success) {
      var geoLatitude = success.origin.latLng.lat;
      var geoLongitude = success.origin.latLng.lng;

      L.mapquest.key = "FZoxJhWY2xMjvAB5kYeqPUCSU8eAs6hV";
      var map = L.mapquest.map("map", {
        center: [geoLatitude, geoLongitude],
        layers: L.mapquest.tileLayer("map"),
        zoom: 15,
      });

      for (var i = 0; i < 20; i++) {
        var popGymListContiner = $("<ul>");
        var popGymList = $("<li>");
        var marketName = success.searchResults[i].fields.name;
        var marketAddress = success.searchResults[i].fields.address;
        var marketPhoneNumber = success.searchResults[i].fields.phone;
        console.log(success.searchResults[i]);

        var marketComp =
          marketName + "\n" + marketAddress + "\n" + marketPhoneNumber;

        var marketCompLat = success.searchResults[i].fields.lat;
        var marketCompLon = success.searchResults[i].fields.lng;

        L.marker([marketCompLat, marketCompLon], {
          icon: L.mapquest.icons.marker(),
          draggable: false,
        })
          .bindPopup(marketComp)
          .addTo(map);
      }
    });
  }

  // Function Calls
  // Event Listeners
  submitBtnGym.on("click", function (event) {
    event.preventDefault();
    firstContainer.addClass("hide");
    secondContainer.removeClass("hide");
    var userInput = $("#areaCode").val();
    // console.log(userInput);
    $.ajax({
      url: "https://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        method: "getQuote",
        lang: "en",
        format: "jsonp",
      },
    }).then(function (response) {
      $("#random-generator").empty();
      var quote = response.quoteText;
      var author = response.quoteAuthor;
      var quoteDiv = $("<div>").text(quote);
      var authorDiv = $("<div>").text(author);
      $("#random-generator").append(quoteDiv);
      $("#random-generator").append(authorDiv);
      gymGeneration(userInput);
    });
  });

  submitBtnMarket.on("click", function (event) {
    event.preventDefault();
    firstContainer.addClass("hide");
    secondContainer.removeClass("hide");
    var userInput = $("#areaCode").val();
    // console.log(userInput);
    $.ajax({
      url: "https://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        method: "getQuote",
        lang: "en",
        format: "jsonp",
      },
    }).then(function (response) {
      $("#random-generator").empty();
      var quote = response.quoteText;
      var author = response.quoteAuthor;
      var quoteDiv = $("<div>").text(quote);
      var authorDiv = $("<div>").text(author);
      $("#random-generator").append(quoteDiv);
      $("#random-generator").append(authorDiv);
      marketGeneration(userInput);
    });
  });

  homeBtn.on("click", function (event) {
    event.preventDefault();
    firstContainer.removeClass("hide");
    secondContainer.addClass("hide");
  });
});
