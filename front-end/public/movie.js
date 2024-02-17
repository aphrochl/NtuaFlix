const baseurl = 'https://localhost:9876/ntuaflix_api';

document.addEventListener('DOMContentLoaded', function () {
  console.log('Script loaded and DOMContentLoaded event triggered.');

  const queryParams = getQueryParams();
  console.log('Query Parameters:', queryParams);

  const titleID = queryParams['titleID'] || '';
  console.log('Fetching movie details for titleID:', titleID);

  // Fetch movie details from the API
  fetch(`${baseurl}/title1/${titleID}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const titleObject = data.titleObject;

      // Add this block to store the category information in sessionStorage
      if (titleObject.principals.length > 0) {
        const actorDetailsArray = titleObject.principals.map(principal => ({
          nameID: principal.nameID,
          name: principal.name,
          principalPoster: principal.principalPoster,
          category: principal.category // Add category information
        }));
        sessionStorage.setItem('actorDetailsArray', JSON.stringify(actorDetailsArray));
      }

      document.querySelector('.heropage h1').textContent = titleObject.originalTitle;

      // Check if type is '/N' and set text content accordingly
      const categoryText = titleObject.type === '\\N' ? 'Not categorized' : titleObject.type;
      document.getElementById('movieCategory').textContent = `Category: ${categoryText}`;

      document.getElementById('movieReleaseYear').textContent = `This work has been released: ${titleObject.startYear}`;
      if (titleObject.endYear && titleObject.endYear !== '\\N') {
        document.getElementById('movieReleaseYear').textContent += ` - ${titleObject.endYear}`;
      }
      document.getElementById('movieRating').textContent = ` ${titleObject.avRating}`;
      document.getElementById('movieVotes').textContent = ` # of Votes: ${titleObject.nVotes}`;
      document.getElementById('movieRuntimeMinutes').textContent = `Runtime: ${titleObject.runtimeMinutes} minutes`;
  
      // Display genres
      const genres = titleObject.genres.map(genre => genre.genreTitle).join(', ');

      if (genres === '\\N') { // Check if genres is '\N'
        document.getElementById('movieGenres').textContent = "Not categorized";
      } else {
        document.getElementById('movieGenres').textContent = `It falls into the category of ${genres}`;
      }

      const posterUrl = titleObject.titlePoster === '\\N' ? 'big_logo.png' : titleObject.titlePoster.replace('{width_variable}', 'w500') || '';
      console.log('Poster URL:', posterUrl);
      document.getElementById('posterImg').src = posterUrl;

    // Display titleAkas information
    const titleAkasContainer = document.getElementById('movieTitleAkas');
    titleAkasContainer.innerHTML = '';

    if (titleObject.titleAkas && titleObject.titleAkas.length > 0) {
       

      titleObject.titleAkas.forEach(titleAka => {
        const titleAkaItem = document.getElementById('movieTitleAkas').textContent = ` Region (${titleAka.regionAbbrev || 'N/A'})`;
         
      });

       
    } else {
      titleAkasContainer.textContent = 'No alternate titles available.';
    }

    // Dispatch the 'MovieDataLoaded' event after processing movie details
    document.dispatchEvent(new CustomEvent('MovieDataLoaded'));
  })
    .catch(error => console.error('Error fetching movie details:', error));
});

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