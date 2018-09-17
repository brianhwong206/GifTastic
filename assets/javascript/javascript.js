$(document).ready(function() {

var characterArray = ["Jerry Seinfeld", "George Constanza", "Cosmo Kramer", "Elaine Benes", "Frank Costanza", "Newman"]; // initial character array


for (var i = 0; i <characterArray.length; i++) {
    var newButton = $("<button>"); // new button is created
    newButton.attr("id", "button-" + i); // new button's id attribute is assigned
    var characterString = characterArray[i]; // identifies the item within the array as a string
    characterString = characterString.replace(" ", "+") // replaces the space character with the + symbol to assist with API calling
    newButton.attr("data-value", characterArray[i]); // new button's data-value attribute is assigned
    newButton.attr("value", characterArray[i]);// new button's value attribute is assigned
    newButton.html(characterArray[i]); // new button's html display is assigned
    $("#characterButtons").append(newButton); // appending the newly created button to the id characterButtons on html
};

$("button").on("click", function() { // when a button is clicked perform the following function
    $("#characters").empty();
    var person = $(this).attr("data-value"); // newly created variable person is assigned the "clicked" button's data value
    var apiKey = "&api_key=dd6y0tFEs9sbIIXuOdBMWO3Ql9VlpJX5"; // variable for API
    var limit = "&limit=10"; //variable for limit parameter
    var rating = "&rating="; //variable for rating parameter

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + limit + rating + apiKey; // queryURL 

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {
        var results = response.data; // variable assigned to hold the response.data from API call
            for (var j = 0; i < results.length ; j++) {
                console.log(response.data);

                var gifUrl = response.data[j].images.fixed_height_small.url; // stores the gif url into gifUrl variable
                var stillUrl = response.data[j].images.fixed_height_small_still.url // stores the still url into the stillUrl variable
                var gifRating = response.data[j].rating; // stores the rating variable

                var personImage = $("<img>"); // new variable personImage is img
                personImage.attr("src", stillUrl); // src attribute is assign the stillUrl
                personImage.attr("still-src", stillUrl); // still src attribute holds the stillUrl
                personImage.attr("gif-src", gifUrl); // gif src attribute holds the gifUrl
                personImage.attr("rating",  gifRating);
                personImage.attr("data-state", "still"); // data state assigned as still
                personImage.addClass("gif"); // gif class added

                $("#characters").append(personImage);
                $("#characters").append(gifRating);
            };       
      });
});

//animate gif
$(".gif").on("click", function(){
    var state =  $(this).attr("data-state");
    if (state == "still"){
        $(this).attr("src",$(this).attr("gifUrl"));
        $(this).attr("data-state", "animate");
      }
      else if (state == "animate"){
        $(this).attr("src",$(this).attr("stillUrl"));
        $(this).attr("data-state", "still");
      }
});

$("#addCharacter").on("click", function(event){ // when add character button is clicked perform the following function
    event.preventDefault(); // If this method is called, the default action of the event will not be triggered.
    var newCharacter = $("#character-input").val().trim(); // new variable takes the inputted text trimmed value
    if (newCharacter.length > 0) { 
        characterArray.push(newCharacter); // pushes newCharacter to the characterArray
        console.log(characterArray);
        $("#character-input").val("");
        // $("#characterButtons").empty();
        // addButtons();
    };
});

});

