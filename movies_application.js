
"use strict";

// Loads The Function
function loadMovies() {
    document.getElementById("loader").style.display = "block"; //loading sign
    fetch("http://localhost:3000/movies")
        .then(response => response.json())
        .then(movies => {
            let htmlString = "";
            for (let movie of movies) {
                htmlString += "<div class='container'>"
                htmlString += "<div class='card' style='width: 18rem' class='scrolling-wrapper-flexbox'>";
                htmlString += "<div class='card-body'>";
                htmlString += " <h2 class='card-text' class='text'>" + `${movie.title}` + "</h2>";
                htmlString += "<p class='card-text' class='text'>" + ` Movie Rating: ${movie.rating}` + "</p>";
                htmlString += "<button class='card-textm delete-button' class='text' data-id='" + `${movie.id}` + "'>" + "Delete" + "</button>";
                htmlString += "<button class='card-textm edit-button' class='text' data-id='" + `${movie.id}` + "'>" + "Edit" + "</button>";

                htmlString += "</div>";
                htmlString += "</div>";
                htmlString += "</div>";

            }
            htmlString = "<div class='card-container'>" + htmlString + "</div>";


            document.getElementById("container").innerHTML = htmlString;
            document.getElementById("loader").style.display = "none"; //removes loading sign

            // Delete button event listener
            const deleteButtons = document.getElementsByClassName('delete-button');
            for (let button of deleteButtons) {
                button.addEventListener('click', function () {
                    const id = this.getAttribute('data-id');
                    deleteMovie(id);

                });
            }

            // Edit button event listener
            const editButtons = document.getElementsByClassName('edit-button');
            for ( let button of editButtons){
                button.addEventListener('click',function(){
                    const id = this.getAttribute('data-id');
                    editMovie(id);
                })
            }
        })
        .catch(error => console.error(error));
}
//Search Button Function
document.getElementById('submitButton').addEventListener('click', function (e) {
    e.preventDefault();

    const titleInput = document.getElementById('searchBar').value;

    fetch("http://localhost:3000/movies")
        .then(response => response.json())
        .then(movies => {
            let filteredMovies = movies.filter(function(movie) {
                return movie.title.toLowerCase().includes(titleInput.toLowerCase());
            });

            let htmlString = "";
            for (let movie of filteredMovies) {
                htmlString += "<div class='card' style='width: 18rem'>";
                htmlString += "<div class='card-body'>";
                htmlString += " <h2 class='card-text' class='text'>" + `${movie.title}` + "</h2>";
                htmlString += "<p class='card-text' class='text'>" + ` Movie Rating: ${movie.rating}` + "</p>";
                htmlString += "<button class='card-text delete-button' class='text' data-id='" + `${movie.id}` + "'>" + "Delete" + "</button>";
                htmlString += "<button class='card-text edit-button' class='text' data-id='" + `${movie.id}` + "'>" + "Edit" + "</button>";
                htmlString += "</div>";
                htmlString += "</div>";
            }
            htmlString = "<div class='card-container'>" + htmlString + "</div>";


            document.getElementById("container").innerHTML = htmlString;

        })
        .catch(error => console.error(error));
});
//Add a movie functionality
document.getElementById("addMovieForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form values
    let title = document.getElementById("title").value;
    let rating = document.getElementById("rating").value;


    // Create movie object
    let movie = {
        title: title,
        rating: rating
    };

    // Call API to add movie
    fetch("http://localhost:3000/movies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movie)
    })
        .then(response => response.json())
        .then(movies => {
            // Reload movie list
            loadMovies();
            // Clear form fields
            document.getElementById("title").value = "";
            document.getElementById("rating").value = "";

        })
        .catch(error => console.error(error));
});

// Delete
function deleteMovie(id) {
    fetch(`http://localhost:3000/movies/${id}`, {
        method: 'DELETE',
    })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            const deletedElement = document.querySelector(`.card[data-id="${id}"]`);
            deletedElement.remove();
        })
        .catch(error => console.error(error));

}

// Edit movie function
function editMovie(id) {
    const title = prompt("Enter new movie title:");
    const rating = prompt("Enter new movie rating:");

    const movieData = {
        title: title,
        rating: rating
    };

    fetch(`http://localhost:3000/movies/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieData)
    })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            loadMovies(); // Reload movies after editing
        })
        .catch(error => console.error(error));
}

// Call loadMovies on page load
window.onload = loadMovies;

document.getElementById('submitButton').addEventListener('click', function (e) {
    e.preventDefault();
    const searchBar = document.getElementById('searchBar');
    const searchValue = searchBar.value;
    searchMovies(searchValue);
});


