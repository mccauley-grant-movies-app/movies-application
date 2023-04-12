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

// function submitButton(input) {
//     fetch("http://localhost:3000/movies")
//         .then(response => response.json())
//         .then(movies => {
//document.getElementById('submitButton').addEventListener('click', function (e) {
//     e.preventDefault();
//     console.log("Clicked!")
// })
//         })
// })}

document.getElementById('submitButton').addEventListener('click', function (e) {
    e.preventDefault();

    const titleInput = document.getElementById('textbox').value;

    fetch("http://localhost:3000/movies")
        .then(response => response.json())
        .then(movies => {
            console.log("Movies:", movies);
            let filteredMovies = movies.filter(function(movie) {
                return movie.title.toLowerCase().includes(titleInput.toLowerCase());
            });
            console.log("Filtered movies:", filteredMovies);
        })
        .catch(error => console.error(error));
});









