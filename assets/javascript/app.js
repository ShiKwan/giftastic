$(document).ready(function(){
	var gifArray = ["deadpool", "harley quinn", "the punisher", "wonder woman", "daredevil", "thor ragnarok"];

	$(document).on("click", ".gif-btn", function() {
	  console.log("here");

      var giphy = $(this).attr("data-name");
      var rating = "&rating="+$(".ddlRating").val();
      var limit = "&limit="+$(".ddlLimit").val();
      console.log(rating);
      console.log(giphy);
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        giphy + "&api_key=jyuSEDNjEUsbbzshiX4ZtrIfSv7nWFvy"+limit+rating;

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
          	console.log(results[i]);
            var gifDiv = $("<div class='item'>");
            var labelDiv = $("<div class='caption'>")
            var rating = results[i].rating;

            var p = $("<h3>").text("Rating: " + rating);

            var personImage = $("<img class='lazy'>");
            personImage.addClass("gif");
            personImage.attr("data-src", results[i].images.fixed_height.url);
            personImage.attr("data-still", results[i].images.fixed_height_still.url);
            personImage.attr("data-animate", results[i].images.fixed_height.url);
            personImage.attr("data-state", "still");
            personImage.attr("src", results[i].images.fixed_height_still.url);
            labelDiv.prepend(p);
            gifDiv.prepend(personImage);
            gifDiv.prepend(labelDiv);

            $(".images-holder").prepend(gifDiv);
          }
        }).fail(function(response){
        	console.log(response);
        });
    });

 	$(document).on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        console.log(state);
        if(state == "still"){
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
		else if(state == "animate"){
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still"); 
        }    
    });

    // Function for displaying movie data
	function renderButtons() {
		$(".button-container").empty();
		for (var i = 0; i < gifArray.length; i++) {
			var a = $("<button>");
			a.addClass("btn btn-default gif-btn");
			a.attr("data-name", gifArray[i]);
			a.text(gifArray[i]);
			$(".button-container").append(a);
		}
	}

      // This function handles events where the add movie button is clicked
    $("#cmdSubmit").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var newGIF = $("#txtGiphy").val().trim();

        // The movie from the textbox is then added to our array
        gifArray.push(newGIF);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    function pauseAudio(){
		if(document.getElementById("navAudio").classList.contains('play')){
			document.getElementById("navAudio").classList.add('mute');
			document.getElementById("navAudio").classList.remove('play');
			document.getElementById("audio_on").style.display = "none";
			document.getElementById("audio_mute").style.display = "inline";
			backgroundMusic.pause();
			backgroundMusic.currentTime = 0;
		}else if(document.getElementById("navAudio").classList.contains('mute')){
			document.getElementById("navAudio").classList.add('play');
			document.getElementById("navAudio").classList.remove('mute');
			document.getElementById("audio_on").style.display = "inline";
			document.getElementById("audio_mute").style.display = "none";
			backgroundMusic.play();	
		}
	}
});



/*
https://api.giphy.com/v1/gifs/search

api_key=jyuSEDNjEUsbbzshiX4ZtrIfSv7nWFvy
q=cheeseburger //queue
limit=25 //default 25


 */