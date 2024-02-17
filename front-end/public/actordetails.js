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

function getQueryParam(param) {
    const queryParams = getQueryParams();
    return queryParams[param] || 'N/A';
}

document.addEventListener('DOMContentLoaded', function () {
    const nameID = getQueryParam('nameID');
    console.log('nameID:', nameID);

    // Fetch actor details using an API endpoint
    fetch(`https://localhost:9876/ntuaflix_api/name/${nameID}`)
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data);

            const actorDetails = data.nameObject;
            console.log('Actor Details:', actorDetails);

            // Ensure that actorDetails.name is not undefined
             
            document.querySelector('.heropage h1').textContent = actorDetails.name;
 
            const birthYear = actorDetails.birthYr === 0 ? 'Unknown' : actorDetails.birthYr;
            document.getElementById('birthYear').textContent = `Birth Year: ${birthYear}`;

            // Check if death year is 0, replace it with 'Unknown'
            const deathYear = actorDetails.deathYr === 0 ? '--' : actorDetails.deathYr;
            document.getElementById('deathYear').textContent = `Death Year: ${deathYear}`;
            const formattedProfession = actorDetails.profession.replace(/_/g, ' ');
  document.getElementById('profession').textContent = `Profession: ${formattedProfession}`;            
  const posterUrl = actorDetails.namePoster.length <= 3  ? 'none.png' : actorDetails.namePoster.replace('{width_variable}', 'w500') || 'none.jpg';

            document.getElementById('posterImg').src = posterUrl;
            // Replace {width_variable} with 'w500' or your desired width
             
        })
        .catch(error => console.error('Error fetching actor details:', error));
});