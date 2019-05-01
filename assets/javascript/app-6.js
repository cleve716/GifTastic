

$( document ).ready(function(){
 
  var feelings = ["shy", "overwhelmed", "happy batman", "diabolical"];  // Initial array of feelings

  // Function for displaying feeling data
  function createButtons() {
    $("#buttons-view").empty(); //removes buttons, so that they are not repeated
 
    for (var i = 0; i < feelings.length; i++) {   // Loops through the feelings array     
      var newButton = $('<button>');  // Creates buttons for each feeling in the array.
      newButton.addClass("feeling");  // Adds a class     
      newButton.attr("data-feeling", feelings[i]); // Adds a data-attribute with a value of the feeling at index i
      newButton.text(feelings[i]); // value at index[i] becomes text for the new button
      $("#buttons-view").append(newButton); // adds button
      
    }
  }
 createButtons(); //button creation of original 4 values in array

  $("#add-feeling").on("click", function(event) {  // on click for the add-feeling submit
    event.preventDefault();  // event.preventDefault() prevents the form from trying to submit itself.
    var newFeeling = $("#feeling-input").val().trim(); // grabs the text from the input box
    feelings.push(newFeeling);// The feeling from the textbox is then added to the feelings array
    $("#feeling-input").val("");   //clears feeling from textbox
    createButtons(); // re-creates buttons
  });

  console.log(feelings);
  


$(document).on('click', '.feeling', function(event) { // when a feeling button is clicked
 event.preventDefault();                           
 var feelingButton = $(this).html();    // the text value is grabbed 

    console.log(feelingButton);
  


    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + // feeling text is inserted into url
      feelingButton + "&api_key=wbNAtcTUxiusq5brJ0iWhPTHcFmiVwpw&limit=3";
      console.log(queryURL)
   
    $.ajax({  //AJAX GET request
      url: queryURL,
      method: "GET"
    })

    .then(function(response) {
        
        console.log(response);
     
        var results = response.data; // stores an array of results in the results variable
        //$("#gifs-appear-here").empty();
       
        for (var i = 0; i < results.length; i++) {   // Looping over every result item
          
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") { //only continue if g or pg
            var gifDiv = $("<div>");  // creates a div for the gif          
            var emoImage = $("<img>"); // creates an image tag
            emoImage.addClass("emo"); //adds a class
            emoImage.attr("src", results[i].images.fixed_height.url);   // gives the image tag a src attribute from the results
            var rating = results[i].rating;    // stores the result item's rating               
            var ratingText = $("<p>").text("Rating: " + rating);    // creates a paragraph tag with the result item's rating
            ratingText.addClass("rate"); // adds a class
            
         
            gifDiv.append(emoImage);   // appends the paragraph and emoImage to the "gifDiv" 
            gifDiv.append(ratingText);           
            $("#gifs-appear-here").prepend(gifDiv);   // prepends the gifDiv to the "#gifs-appear-here" div in the HTML
          
          }
        }
      
      });

    }) 

   
  });