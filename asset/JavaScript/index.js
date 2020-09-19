$(document).ready(function () {
  // Dom Variables
  // var CORS = "https://cors-anywhere.herokuapp.com/";
  var submitBtn = $("#input-btn");
  var firstContainer = $("#first-container");
  var secondContainer = $("#second-container");
  var homeBtn = $("#home");
  var gymList = $("#gymList");

  // JS variables

  // Functions

  // function to generate map
  // function mapGeneration(userInput) {
  //   var positionQueryURL = `https://www.mapquestapi.com/geocoding/v1/address?key=FZoxJhWY2xMjvAB5kYeqPUCSU8eAs6hV&inFormat=kvp&outFormat=json&location=${userInput}&thumbMaps=false&maxMatches=5`;
  //   $.ajax({
  //     url: positionQueryURL,
  //     method: "GET",
  //   }).then(function (success) {

  //     var geoLatitude = success.results[0].locations[0].latLng.lat;
  //     var geoLongitude = success.results[0].locations[0].latLng.lng;

  //     L.mapquest.key = "J4OCq4RHL0SJ5Gk2Nl3gAInDB8piwquG";
  //     L.mapquest.map("map", {
  //       center: [geoLatitude, geoLongitude],
  //       layers: L.mapquest.tileLayer("map"),
  //       zoom: 12,
  //     });
  //   });
  // }

  function gymGeneration(userInput) {
    var positionQueryURL = `https://www.mapquestapi.com/search/v2/radius?origin=${userInput}&radius=5&maxMatches=20&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|799101&outFormat=json&key=FZoxJhWY2xMjvAB5kYeqPUCSU8eAs6hV`;

    $.ajax({
      url: positionQueryURL,
      method: "GET",
    }).then(function (success) {
   
      var geoLatitude = success.origin.latLng.lat;
      var geoLongitude = success.origin.latLng.lng;

      for (var i = 0; i < 5; i++) {
        var popGymListContiner = $("<ul>");
        var popGymList = $("<li>");
        var gymName = success.searchResults[i].fields.name;
        var gymAddress = success.searchResults[i].fields.address
        var gymPhoneNumber = success.searchResults[i].fields.phone
        
        popGymList.append(gymName, gymAddress, gymPhoneNumber)
        popGymListContiner.append(popGymList)
        gymList.append(popGymListContiner)

      }

      // Generates the map
      L.mapquest.key = "J4OCq4RHL0SJ5Gk2Nl3gAInDB8piwquG";
      L.mapquest.map("map", {
        center: [geoLatitude, geoLongitude],

        layers: L.mapquest.tileLayer("map"),
        zoom: 12,
      });
    });
  }

  // Function Calls
  // Event Listeners
  submitBtn.on("click", function (event) {
    event.preventDefault();
    firstContainer.addClass("hide");
    secondContainer.removeClass("hide");
    var userInput = $("#areaCode").val();
    console.log(userInput);
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
  
  homeBtn.on("click", function(event){
    event.preventDefault();
    firstContainer.removeClass("hide");
    secondContainer.addClass("hide");
  })
});

