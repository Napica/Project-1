$(document).ready( function(){

    var CORS = "https://cors-anywhere.herokuapp.com/"
    
    var submitBtn = $("#input-btn");
    var firstContainer = $("#first-container");
    var secondContainer = $("#second-container");
    
    submitBtn.on("click", function(event) {
        event.preventDefault();
        firstContainer.addClass("hide");
        secondContainer.removeClass("hide");
        $.ajax({
            url: "https://api.forismatic.com/api/1.0/",
            jsonp: "jsonp",
            dataType: "jsonp",
            data: {
              method: "getQuote",
              lang: "en",
              format: "jsonp"
            }
          }).then(function(response) {
            var quote = response.quoteText;
            var author = response.quoteAuthor;
            var quoteDiv = $("<div>").text(quote);
            var authorDiv = $("<div>").text(author);
            $("#random-generator").append(quoteDiv);
            $("#random-generator").append(authorDiv);
            
          });
    });
    
    })
    