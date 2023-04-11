"use strict"

document.getElementById("loader").style.display = "block";
fetch("http://localhost:3000/movies")
    .then(response => response.json())
    .then(movies => {
        let htmlString = "";
        for (let movie of movies) {
            htmlString += "<div class='card' style='width: 18rem'>";
            htmlString += "<div class='card-body'>";
            htmlString += " <h2 class='card-text'>" + `${movie.title}` + "</h2>";
            htmlString += "<p class='card-text'>" + `${movie.rating}` + "</p>";
            htmlString += "</div>";
            htmlString += "</div>";
        }

        document.getElementById("container").innerHTML = htmlString;
        document.getElementById("loader").style.display = "none";
    })
    .catch(error => console.error(error));





