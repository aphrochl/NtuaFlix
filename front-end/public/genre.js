async function searchMoviesgenre() {
    const qgenre = document.getElementById('qgenre').value;
    const minrating = document.getElementById('minrating').value;
    const yrFrom = document.getElementById('yrFrom').value;
    const yrTo = document.getElementById('yrTo').value;

    const requestData = {
        qgenre: qgenre,
        minrating: parseFloat(minrating),
        yrFrom: parseInt(yrFrom),
        yrTo: parseInt(yrTo)
    };

    const response = await fetch('https://localhost:9876/ntuaflix_api/bygenre', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    });

    const data = await response.json();

    console.log('Received data from the server:', data);

    if (data && data.titleObjectList) {
        displayResults(data.titleObjectList);
    } else {
        console.error('Invalid or missing data received from the server');
    }
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No movies found.</p>';
        return;
    }

    const moviesPerRow = 5;
    const totalMovies = results.length;

    // Calculate the number of full rows and the number of movies in the last row
    const fullRows = Math.floor(totalMovies / moviesPerRow);
    const moviesInLastRow = totalMovies % moviesPerRow;

    let currentIndex = 0;

    for (let i = 0; i < fullRows; i++) {
        const rowContainer = createRowContainer();

        for (let j = 0; j < moviesPerRow; j++) {
            const movie = results[currentIndex++];
            appendMovieToRow(rowContainer, movie);
        }

        resultsContainer.appendChild(rowContainer);
    }

    // Handle the last row separately
    if (moviesInLastRow > 0) {
        const lastRowContainer = createRowContainer();

        for (let i = 0; i < moviesInLastRow; i++) {
            const movie = results[currentIndex++];
            appendMovieToRow(lastRowContainer, movie);
        }

        resultsContainer.appendChild(lastRowContainer);
    }

    function createRowContainer() {
        const rowsContainer = document.createElement('div');
        rowsContainer.classList.add('rows-container');
        return rowsContainer;
    }

    function appendMovieToRow(rowContainer, movie) {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-container');

        //const noPoster = !movie.titlePoster || movie.titlePoster === '\\N\r' || '\N\r' ;
        const posterURL = movie.titlePoster.length <= 3 ? 'big_logo.png' : movie.titlePoster.replace('{width_variable}', 'w500');

        movieElement.innerHTML = `
            <a href="index_movie_details.html?titleID=${movie.titleID}">
                <img src="${posterURL}" alt="${movie.originalTitle} Poster">
                <p>${movie.originalTitle}</p>
            </a>
        `;

        rowContainer.appendChild(movieElement);
    }
}