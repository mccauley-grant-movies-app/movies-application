"use strict"

document.getElementById("loader").style.display = "block"
fetch("http://localhost:3000/movies")
    .then(response => response.json())
    .then(movies => {
        let htmlString = "";
        for (let movie of movies) {
            htmlString += `<div class="movie">
                        <h2>${movie.title}</h2>
                        <p>${movie.rating}</p>
                     </div>`;

        }
        document.getElementById("container").innerHTML = htmlString;
        document.getElementById("loader").style.display = "none"

    })
    .catch(error => console.error(error));





