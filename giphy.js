var topics = ["Goat", "Porcupine", "Armadillo", "Dung Beetle", "Sloth", "Warthog", "Giraffe", "Zebra", "Pika", "Moose"];

function alertanimalName() {

    var animalName = $(this).attr("data-name");
    
    alert(animalName)
    
    
    };
    
    function displayButtons(){
    
        $("#buttons-list").empty();
    
        for(var i = 0; i < topics.length; i++){
    
            var button = $("<button>");
    
            button.addClass("zooAnimal");    
            // tvShow changed to zooAnimal
            button.attr("data-name", topics[i]);    
            button.text(topics[i]);
    
            $("#buttons-list").append(button);
        }
    
    };
    
    
    // click function to add button to list
    $("#add-zooAnimal").click(function(){
        event.preventDefault();
    
    var zooAnimal = $("#zoo-animals-input").val().trim();
    
    topics.push(zooAnimal);
    
    displayButtons();
    });
    
    // click function to add images to page
    
    $(document).on("click", "button", function(){
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=0FGhwINevKerHN8I1FhMtQzN8gMRr886";
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
    
         console.log(queryURL);
         console.log(response);
    
         var results = response.data;
    
         for(var i = 0; i < results.length; i++){
             var animalDiv = $("<div>");
    
             var p = $("<p>").text("Rating: " + results[i].rating);
             var p1 = $("<p>").text("Title: " + results[i].title);
    
             var animalImage = $("<img>");
    
             animalImage.attr("src", results[i].images.fixed_height_still.url);
             animalImage.attr('data-animate', results[i].images.fixed_height.url);
             animalImage.attr('data-state', "still");
             animalImage.attr('data-still', results[i].images.fixed_height_still.url);
             animalImage.addClass("animalImage");
    
             animalDiv.append(p);
             animalDiv.append(p1);
             animalDiv.append(animalImage);
    
             $("#zooAnimal-expo").prepend(animalDiv);
    
             console.log(results);
         }
        })
    });
    
    
    // funciton to play and pause gif
    
    $(document).on("click", ".animalImage", function(){
        var state = $(this).attr("data-state");
    
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
    
    });
    
    displayButtons();