async function searchMovies() {
    const searchInput = document.getElementById('searchInput').value;
     if (!searchInput) {
        alert('Please enter a movie title.');
        return;
    }

    try {
        const cleanedSearchInput = encodeURIComponent(searchInput);

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ titlePart: searchInput, namePart: searchInput }),
        };        

        const [titleResponse, nameResponse] = await Promise.all([
            fetch(`/ntuaflix_api/searchtitle`, requestOptions),
            fetch(`/ntuaflix_api/searchname`, requestOptions),
        ]);

        const titleData = await titleResponse.json();
        const nameData = await nameResponse.json();

        // Store data in localStorage
        localStorage.setItem('titleData', JSON.stringify(titleData));
        localStorage.setItem('nameData', JSON.stringify(nameData));

        // Redirect to results.html
        window.location.replace('/results.html');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

        function displayResults(titleData, nameData) {
            const leftColumn = document.getElementById('leftColumn');
            const rightColumn = document.getElementById('rightColumn');

            leftColumn.innerHTML = '';
            rightColumn.innerHTML = '';
            if (!titleData.data.length && !nameData.length) {
    leftColumn.textContent = 'No matching movies or names found.';
}
            if (titleData.status === 'success' && titleData.data.length > 0) {
                const titleList = document.createElement('ul');

                titleData.data.forEach(movie => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <strong>${movie.title_type}</strong> - <br>
                        ${movie.title_primaryTitle} - <br>
                        ${movie.title_originalTitle} - <br>
                        ${movie.title_isAdult ? 'For Adults' : 'For All Ages'} - <br>
                        ${movie.title_startYear ? 'Start Year: ' + movie.title_startYear : ''} - 
                        ${movie.title_endYear ? 'End Year: ' + movie.title_endYear : 'Present'} - <br>
                        ${movie.title_runtimeMinutes ? 'Runtime: ' + movie.title_runtimeMinutes + ' mins' : ''} - <br>
                        
                        <em>Poster:</em> <img src="${getPosterUrl(movie.title_posterURL, `w92`)}" alt="Movie Poster" style="max-height: 100px;"> - <br>
                        <em>Average Rating:</em> ${movie.avRating !== undefined ? 'Rating: ' + movie.avRating.toFixed(1) : 'Rating: Not available'} - <br>
                        <em>Number of Votes:</em> ${movie.nVotes !== undefined ? 'Votes: ' + movie.nVotes : 'Votes: Not available'} <br><br>
                    `;
                    titleList.appendChild(listItem);
                });

                leftColumn.appendChild(titleList);
            } else {
                leftColumn.textContent = 'No matching movies found.';
            }

            if (nameData.length > 0) {
                const nameList = document.createElement('ul');

                nameData.forEach(name => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <strong>${name.name}</strong> - <br>
                        Birth Year: ${name.birthYr || 'N/A'} - <br>
                        Death Year: ${name.deathYr || 'Present'} - <br>
                        Profession: ${name.profession || 'N/A'} - <br>
                        <em>Poster:</em> <img src="${getPosterUrl(name.namePoster, `w92`)}" alt="Name Poster" style="max-height: 100px;"> <br><br>
                    `;
                    nameList.appendChild(listItem);
                });

                rightColumn.appendChild(nameList);
            } else {
                if (titleData.status !== 'success' || titleData.data.length === 0) {
                    rightColumn.textContent = 'No matching names found.';
                }
            }
        }

        function getPosterUrl(url, width) {
            if (url) {
                return url.replace('{width_variable}', width);
            }
            return '';
        }

        document.getElementById('searchInput').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') { // Check if the key pressed is 'Enter'
                event.preventDefault(); // Prevent the default action to ensure form isn't submitted
                document.getElementById('searchButton').click(); // Programmatically click the search button
            }
        });
        