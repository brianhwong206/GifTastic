$(document).ready(function() {

    var topics = ["Jerry Seinfeld", "George Constanza", "Cosmo Kramer", "Elaine Benes", "Frank Costanza", "Newman"]; // initial character array
    
    function showButtons(){
    $("#characterButtons").empty();
    console.log("gifs cleared -- ready to go!");

    for (var i = 0; i <topics.length; i++) {
        var newButton = $("<button>"); // new button is created
        newButton.attr("class", "btn btn-primary");
        newButton.attr("id", i); // new button's id attribute is assigned
        var characterString = topics[i]; // identifies the item within the array as a string
        characterString = characterString.replace(" ", "+") // replaces the space character with the + symbol to assist with API calling
        newButton.attr("data-value", characterString); // new button's data-value attribute is assigned
        newButton.attr("value", topics[i]);// new button's value attribute is assigned
        newButton.html(topics[i]); // new button's html display is assigned
        $("#characterButtons").append(newButton); // appending the newly created button to the id characterButtons on html
        };

    $("button").on("click", function() { // when a button is clicked perform the following function
        $("#characters").empty(); // removes any gifs within the character div
        var person = $(this).attr("data-value"); // newly created variable person is assigned the "clicked" button's data value
        var apiKey = "&api_key=dd6y0tFEs9sbIIXuOdBMWO3Ql9VlpJX5"; // variable for API
        var limit = "&limit=10"; //variable for limit parameter
        var rating = "&rating="; //variable for rating parameter
    
        console.log($(this).attr("value"));
    
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + limit + rating + apiKey; // queryURL 
    
        $.ajax({
            url: queryURL,
            method: "GET"
          })
          .then(function(response) {
            var results = response.data; // variable assigned to hold the response.data from API call
                for (var j = 0; j < results.length; j++) {
    
                    var gifUrl = response.data[j].images.original.url; // stores the gif url into gifUrl variable
                    var stillUrl = response.data[j].images.original_still.url // stores the still url into the stillUrl variable
                    var gifRating = response.data[j].rating; // stores the rating variable
                    var gifTitle = response.data[j].title;
    
                    var personImage = $("<img>"); // new variable personImage is img
                    personImage.attr("src", stillUrl); // src attribute is assign the stillUrl
                    personImage.attr("still-src", stillUrl); // still src attribute holds the stillUrl
                    personImage.attr("gif-src", gifUrl); // gif src attribute holds the gifUrl
                    personImage.attr("rating",  gifRating);
                    personImage.attr("data-state", "still"); // data state assigned as still
                    personImage.addClass("gif"); // gif class added

                    $("#characters").append(personImage);
                    $("#characters").append("<br> Title: " + gifTitle);
                    $("#characters").append("<br> Rating: " + gifRating + "<br>");

                };       
          });
    });

    };
    
    //animate gif
    $(document).on("click", "img", function(){ // when img is clicked
        var state = $(this).attr("data-state"); // state variable is assigned to the clicked item's data state
        var still = $(this).attr("still-src"); // still variable is assigned to the clicked item's still src
        var gif = $(this).attr("gif-src"); // gif variable is assigned to the clicked item's gif src
        
            if (state === "still"){
                $(this).attr("src", gif);
                $(this).attr("data-state", "animate");
                console.log("gif running");
            }
            else if (state === "animate"){
                $(this).attr("src",still);
                $(this).attr("data-state", "still");
                console.log("gif stopped");
            };
    });

    // add another character    
    $("#addCharacter").on("click", function(event){ // when add character button is clicked perform the following function 
        event.preventDefault(); // If this method is called, the default action of the event will not be triggered.

        var newCharacter = $("#character-input").val().trim(); // new variable takes the inputted text trimmed value
            if (newCharacter.length > 0) { 
                topics.push(newCharacter); // pushes newCharacter to the topics
                console.log(topics);
                console.log("New Character Added: " + newCharacter);
                showButtons();
                $("#character-input").val("");
            }
            else {
                alert("Please enter a character's name");
            };
    });

    // execute when page loads
    showButtons();

});
    
    