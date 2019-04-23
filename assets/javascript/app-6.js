

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
  


$(document).on('click', '.feeling', function(event) {
 event.preventDefault();
 var feelingButton = $(this).html();    

    console.log(feelingButton);
  


    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      feelingButton + "&api_key=dc6zaTOxFJmzC&limit=3";
      console.log(queryURL)
   
    $.ajax({  //AJAX GET request
      url: queryURL,
      method: "GET"
    })

    .then(function(response) {
        // Storing an array of results in the results variable
        console.log(response);
     
        var results = response.data;
        //$("#gifs-appear-here").empty();
       
        for (var i = 0; i < results.length; i++) {   // Looping over every result item
          
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") { //only continue if g or pg
            var gifDiv = $("<div>");  // Creating a div for the gif
          
            var emoImage = $("<img>"); // Creating an image tag
            emoImage.addClass("emo");    
            emoImage.attr("src", results[i].images.fixed_height.url);   // Giving the image tag an src attribute of a proprty pulled off the result item
            var rating = results[i].rating;    // Storing the result item's rating               
            var ratingText = $("<p>").text("Rating: " + rating);    // Creating a paragraph tag with the result item's rating
            ratingText.addClass("rate");
            // Appending the paragraph and personImage we created to the "gifDiv" div we created
           // gifDiv.append(ratingBox);
            gifDiv.append(emoImage);
            gifDiv.append(ratingText);
            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
          
          }
        }
      
      });

    }) 

   
  });