function goToTitleDetails(movie) {
    const queryString = `?titleID=${encodeURIComponent(movie.titleID)}`;
    window.location.href = `index_movie_details.html${queryString}`;
}

function goToNameDetails(name) {
    const queryString = `?nameID=${encodeURIComponent(name.nameID)}`;
    window.location.href = `index_actor_details.html${queryString}`;
}

function getQueryParams() {
    const queryParams = {};
    const queryString = window.location.search.substring(1);
    const params = queryString.split('&');

    for (const param of params) {
        const [key, value] = param.split('=');
        queryParams[key] = decodeURIComponent(value);
    }

    return queryParams;
}

function displayResults() {
    const queryParams = getQueryParams();
    const titleData = JSON.parse(localStorage.getItem('titleData') || '{}');
    const nameData = JSON.parse(localStorage.getItem('nameData') || '{}');
    const titleContainer = document.getElementById('titleContainer');
    const nameContainer = document.getElementById('nameContainer');

    titleContainer.innerHTML = '';
    nameContainer.innerHTML = '';

    if (titleData.titleObjectList && titleData.titleObjectList.length > 0) {
        titleData.titleObjectList.forEach(movie => {
            const content = `
            <img src="${getPosterUrl(movie.titlePoster, 'w185')}" alt="Poster Image" onerror="this.src='big_logo.png'" style="max-height: 250px;"> <br>
            <strong>${movie.originalTitle}</strong> <br>
            <div class="btn1">
                    <a href="#" onclick="goToTitleDetails('${movie.titleID}')">
                        <i class="fas fa-play"></i>Show Details
                    </a>
                </div>
            `;
            appendResult(titleContainer, content, () => goToTitleDetails(movie));
        });
    } else {
        titleContainer.innerHTML = 'No matching movies found.';
    }

    if (nameData.nameObjectList && nameData.nameObjectList.length > 0) {
        nameData.nameObjectList.forEach(name => {
            const content = `
            <img src="${getPosterUrl(name.namePoster, 'w185')}" alt="Poster Image" onerror="this.src='none.png'" style="max-height: 250px;"><br><br>
            <strong>${name.name}</strong> <br>
            <div class="btn1">
                    <a href="#" onclick="goToNameDetails('${name.nameID}')">
                        <i class="fas fa-play"></i>Show Details
                    </a>
                </div>
        `;
            appendResult(nameContainer, content, () => goToNameDetails(name));
        });
    } else {
        if (!titleData.titleObjectList || titleData.titleObjectList.length === 0) {
            nameContainer.innerHTML = 'No matching names found.';
        }
    }
}


        function createResultBox(content, clickHandler) {
        const resultBox = document.createElement('div');
        resultBox.className = 'resultBox';
        resultBox.innerHTML = content;
        resultBox.addEventListener('click', clickHandler);
        return resultBox;
    }

    function appendResult(container, content, clickHandler) {
        const resultBox = createResultBox(content, clickHandler);
        container.appendChild(resultBox);
    }

        // Function to display search results
        
        function getPosterUrl(url, width) {
            if (url) {
                return url.replace('{width_variable}', width);
            }
            return '';
        }

        // Call displayResults function when the page loads
        window.onload = displayResults;