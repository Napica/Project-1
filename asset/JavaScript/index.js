$(document).ready(function () {
  // Dom Variables
  
  var CORS = "https://cors-anywhere.herokuapp.com/";
  var submitBtn = $("#input-btn");
  var firstContainer = $("#first-container");
  var secondContainer = $("#second-container");
  
  // JS variables
  
  // Functions

  // function to generate map
  function mapGeneration() {
 
    function callLocation() {
      var positionQueryURL =
        "https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=&facet=state&facet=timezone&facet=dst";
      $.ajax({
        url: positionQueryURL,
        method: "GET",
      }).then(function (success) {
        var geoLatitude = success.records[0].fields.latitude;
        var geoLongitude = success.records[0].fields.longitude;
    
        L.mapquest.key = "J4OCq4RHL0SJ5Gk2Nl3gAInDB8piwquG";
        callLocation();
        L.mapquest.map("map", {
          center: [geoLatitude, geoLongitude],
          layers: L.mapquest.tileLayer("map"),
          zoom: 12,
        });
      });
    }
    callLocation();
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
      var quote = response.quoteText;
      var author = response.quoteAuthor;
      var quoteDiv = $("<div>").text(quote);
      var authorDiv = $("<div>").text(author);
      $("#random-generator").append(quoteDiv);
      $("#random-generator").append(authorDiv);

      mapGeneration();
    });
  });
});
