var CORS = "https://cors-anywhere.herokuapp.com/"

var submitBtn = document.getElementById("input-btn");

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    $.ajax({
        url: "https://api.forismatic.com/api/1.0/",
        jsonp: "jsonp",
        dataType: "jsonp",
        data: {
          method: "getQuote",
          lang: "en",
          format: "jsonp"
        }
      }).then(function(response) {
        var quote = response.quoteText;
        var author = response.quoteAuthor;
        var quoteDiv = $("<div>").text(quote);
        var authorDiv = $("<div>").text(author);
        $("#company-section").append(quoteDiv);
        $("#company-section").append(authorDiv);
        
      });
});











