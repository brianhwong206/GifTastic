$(document).ready(function() {

var characterArray = ["Jerry Seinfeld", "George Constanza", "Cosmo Kramer", "Elaine Benes", "Frank Costanza", "Newman"]; // initial character array

function addButtons(){
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
};

function onPageLoad(){
    addButtons();
};


$("button").on("click", function() { // when a button is clicked perform the following function
    alert(this.val());
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
        for (var j = 0; i < results.length; j++) {

            var gifUrl = response.data[j].images.original.url;
            var gifRating = response.data[j].rating;

            var personImage = $("<img>");
            personImage.attr("src", gifUrl);

            $("#characters").append(personImage);
            $("#characters").append(gifRating + "<br>");
        };
        
      });
    });

$("#addCharacter").on("click", function(event){ // when add character button is clicked perform the following function
    event.preventDefault(); // If this method is called, the default action of the event will not be triggered.
    var newCharacter = $("#character-input").val().trim(); // new variable takes the inputted text trimmed value
    if (newCharacter.length > 0) { 
        characterArray.push(newCharacter); // pushes newCharacter to the characterArray
        console.log(characterArray);
        $("#character-input").val("");
        $("#characterButtons").empty();
        addButtons();
    };
});

onPageLoad();

});

