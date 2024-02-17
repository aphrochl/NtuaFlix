const baseurl = 'https://localhost:9876/ntuaflix_api';

document.addEventListener('DOMContentLoaded', function () {
    const nameID = getQueryParam('nameID');

    fetch(`${baseurl}/name/${nameID}`)
        .then(response => response.json())
        .then(data => {
            const actorDetails = data.nameObject;

            // Pass the title information to workofactor.js
            populateTitles(actorDetails.nameTitles);
        })
        .catch(error => console.error('Error fetching actor details:', error));
});

function populateTitles(titleData) {
    // Convert title data to slatestMovies format
    var slatestMoviesPromises = titleData.map(title => fetchTitleDetails(title.titleID));

    Promise.all(slatestMoviesPromises)
        .then(slatestMovies => {
            // Iterate through the slatestMovies array
            for (var i = 0; i < slatestMovies.length; i++) {
                var slatestMovie = slatestMovies[i];

                // Create movie elements
                var slatestContainer = document.getElementById("slatestContainer");
                var slatestDiv = document.createElement("div");
                slatestDiv.classList.add("slatest-inside");

                // Set the values in the HTML elements for each slatest movie
                slatestDiv.innerHTML = `
                    <img class="posterImage" src="${slatestMovie.posterURL}" alt=" ">
                    <div class="heading1">
                        <h4 class="movieTitle">${slatestMovie.name}</h4>
                        <p class="movieCategory">${slatestMovie.category}</p>
                    </div>
                `;

                // Add an event listener to each slatest movie element
                slatestDiv.addEventListener("click", (function (titleID) {
                    return function () {
                        // Redirect to index_movie_details.html with the corresponding titleID
                        redirectToMovieDetails(titleID);
                    }
                })(slatestMovie.nameID));

                // Append the movie elements to the slatest container
                slatestContainer.appendChild(slatestDiv);
            }
        })
        .catch(error => console.error('Error fetching title details:', error));
}

function fetchTitleDetails(titleID) {
    return fetch(`${baseurl}/title/${titleID}`)
        .then(response => response.json())
        .then(data => {
            const titleDetails = data.titleObject;
            const posterURL = titleDetails.titlePoster.length <= 3  ? 'big_logo.png' : titleDetails.titlePoster.replace('{width_variable}', 'w500');


            return {
                nameID: titleDetails.titleID,
                name: titleDetails.originalTitle,
                category: titleDetails.type,
                posterURL: posterURL
            };
        })
        .catch(error => {
            console.error('Error fetching title details:', error);
            return {
                nameID: titleID,
                name: `Title ID: ${titleID}`,
                category: 'N/A',
                posterURL: 'default_poster.jpg'
            };
        });
}

function redirectToMovieDetails(titleID) {
    window.location.href = `index_movie_details.html?titleID=${titleID}`;
}