buttonArray = [
  "Elephant",
  "Giraffe",
  "Leopard",
  "Buffalo",
  "Zebra",
  "Wildebeest",
  "Rhinoceros"
];

hasSearched = false;

$(document).ready(function() {
  buttonGenerator();

  // Search button and text input function
  $("#searchBtn").on("click", function() {
    hasSearched = true;
    $("#gifDiv").empty();
    apiCall();
    buttonArray.push(userInput);
    console.log(userInput);
    buttonGenerator();
    $("#searchInput").val("");
  });

  // Allows enter button to trigger search
  $("#searchInput").keyup(function(event) {
    if (event.keyCode === 13) {
      $("#searchBtn").click();
    }
  });

  // Searches api when a button is clicked
  $(document).on("click", ".buttonClass", function() {
    $("#gifDiv").empty();
    userInput = $(this).attr("data-name");
    apiCall();
  });

  function apiCall() {
    if (hasSearched == true) {
      userInput = $("#searchInput")
        .val()
        .trim();
      hasSearched = false;
    }
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=xHFwQ00oT0w98UQHk4Jmnad3Nvagp6BA&limit=10&q=" +
      userInput;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      for (var i = 0; i < 10; i++) {
        // grabs still and gif image urls

        stillImageUrl = response.data[i].images.fixed_height_still.url;

        gifImageUrl = response.data[i].images.fixed_height.url;

        ratingPull = response.data[i].rating;

        ratingUppercase = ratingPull.toUpperCase();

        // Dynamically created elements
        var createdImg = $("<img>");

        var createdRatings = $(
          "<p>" + "Rated: " + ratingUppercase + "</p> <br>"
        );

        var createdDiv = $("<div>");
        createdDiv.attr("id", "divId" + [i]);

        var favBtn = $("<button>");

        favBtn.text("☆");

        $("#gifDiv").append(createdDiv);

        // Sets attributes to the created items
        createdDiv.attr("class", "newDivs");

        createdImg.attr("src", stillImageUrl);
        createdImg.attr("alt", "A newly created Image");
        createdImg.attr("data-gif", gifImageUrl);
        createdImg.attr("data-empty", "");
        createdImg.addClass("imgClass" + [i]);
        createdImg.attr("data-rating", ratingUppercase);

        $("#divId" + [i]).append(createdImg);
        $("#divId" + [i]).append(createdRatings);

        // $("#gifDiv").append(createdImg);
        // $("#gifDiv").append(createdRatings);

       

        // Play/pause function for Gifs
        $(".imgClass" + [i]).on("click", function() {
          if ($(this).attr("data-empty") == "") {
            $(this).attr("data-empty", $(this).attr("src"));
            $(this).attr("src", $(this).attr("data-gif"));
          } else {
            $(this).attr("data-gif", $(this).attr("src"));
            $(this).attr("src", $(this).attr("data-empty"));
            $(this).attr("data-empty", "");
          }
        });
      }
    });
  }

  // creates buttons and displays on page
  function buttonGenerator() {
    $("#buttonDiv").empty();
    for (var i = 0; i < buttonArray.length; i++) {
      var addButton = $("<button>");
      addButton.attr("data-name", buttonArray[i]);
      addButton.addClass("buttonClass");
      addButton.text(buttonArray[i]);
      $("#buttonDiv").append(addButton);
    }
  }
});
