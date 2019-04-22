

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

  //$("button.feeling").on("click", function() {
  // var feelingButton = $(this).attr("data-feeling");
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

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div for the gif
            var gifDiv = $("<div>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            //var ratingBox = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var emoImage = $("<img>");
            emoImage.addClass("emo"); 

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            emoImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
           // gifDiv.append(ratingBox);
            gifDiv.append(emoImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
          }
        }
      
      });

    }) 

    $('emoImage').on('click', function() {
 
      var $this   = $(this),
              $index  = $this.index(),
               
              $img    = $this.children('img'),
              $imgSrc = $img.attr('src'),
              $imgAlt = $img.attr('data-alt'),
              $imgExt = $imgAlt.split('.');
               
      if($imgExt[1] === 'gif') {
          $img.attr('src', $img.data('alt')).attr('data-alt', $imgSrc);
      } else {
          $img.attr('src', $imgAlt).attr('data-alt', $img.data('alt'));
      }
     
    });
  });