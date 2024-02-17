// Scroll functions remain unchanged
function scrollRight() {
    const container = document.querySelector('.slatest-movies');
    container.scrollLeft += 150;
}

function scrollLeft() {
    const container = document.querySelector('.slatest-movies');
    container.scrollLeft -= 150;
}

document.addEventListener('MovieDataLoaded', function () {
    console.log('Movie data loaded. Updating cast and crew UI.');

    // Retrieve actor's details array from sessionStorage
    const actorDetailsArray = JSON.parse(sessionStorage.getItem('actorDetailsArray')) || [];
    console.log('Actor Details Array:', actorDetailsArray);
    // Now, update the UI using actor details from movie.js directly
    updateUI(actorDetailsArray);
});

function updateUI(actorDetailsArray) {
    // Get the container where you want to display the slatest movies
    const slatestContainer = document.getElementById('slatestContainer');

    // Clear the container before adding the updated movie elements
    slatestContainer.innerHTML = '';

    // Iterate through the actorDetailsArray
    for (let i = 0; i < actorDetailsArray.length; i++) {
        const actor = actorDetailsArray[i];

        // Create movie elements
        const slatestDiv = document.createElement('div');
        slatestDiv.classList.add('slatest-inside');
        const posterUrl = actor.principalPoster.length <= 3 ? 'none.png' : getPosterUrl(actor.principalPoster, 'w500');        // Set the values in the HTML elements for each actor
        slatestDiv.innerHTML = `
            <!-- there goes the actor's photo -->
            <img class="posterImage" src="${posterUrl}"  alt=" ">
            <div class="heading1">
                <h4 class="movieTitle">${actor.name}</h4>
                <p class="movieCategory">${actor.category}</p>
                <!-- there goes the actor's name -->
            </div>
        `;

        // Log actor's name for debugging
        console.log('Actor Name:', actor.name);

        // Log poster URL for debugging
        console.log('Poster URL:', getPosterUrl(actor.principalPoster, 'w500'));

        // Add an event listener to each actor element
        slatestDiv.addEventListener('click', function () {
            // Redirect to index_actor_details.html with the corresponding nameID
            redirectToActorDetails(actor.nameID);
        });

        // Append the actor elements to the slatest container
        slatestContainer.appendChild(slatestDiv);
    }
}


// Additional function to get the poster URL with a fallback
 

// Additional function to get the poster URL with a fallback
 

// Redirect function remains unchanged
function redirectToActorDetails(nameID) {
    window.location.href = `index_actor_details.html?nameID=${nameID}`;
}