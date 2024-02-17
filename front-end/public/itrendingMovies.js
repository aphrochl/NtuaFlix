var movies = [
    { titleID: 'tt0099851' ,title: "Into the Woods", imdbRating: "8.7", posterURL: "https://image.tmdb.org/t/p/w500/uwMNWZg9gxCNCeruYvEdBN3Zhyb.jpg\r" },
    //tt0099851
    { titleID: 'tt0103062',title: "Tell Me That You Love Me", imdbRating: " 8.2", posterURL: "https://image.tmdb.org/t/p/w500/hEBf4QPMswqPnOe6GlwhqDozhVi.jpg\r" },
    //tt0103062
    { titleID: 'tt0090144',title: "Le temps des bouffons", imdbRating: "8.1", posterURL: "https://image.tmdb.org/t/p/w500/7PVsQkiQsMf5j4pviQgEKJh4BPo.jpg\r" },
    //tt0090144
    { titleID: 'tt0095571',title: "The Making of Monsters", imdbRating: "8.4", posterURL: "https://image.tmdb.org/t/p/w500/zgenzvJ09QuRaduURuBuQzmM4jy.jpg\r" },
    //	
//tt0095571
    { titleID: 'tt0098542', title: "Ti, koyto si na nebeto", imdbRating: "8.2", posterURL: "https://image.tmdb.org/t/p/w500/pLGv4Jpb4IhOSNj4rOpkLLvhRfa.jpg\r" },
    //tt0098542
    // { title: "BLOOD HOUND", imdbRating: "8.5", posterURL: "images/hollywood/3.jpg" },
    // { title: "REUNION", imdbRating: "9.5", posterURL: "images/hollywood/1.jpg" }
];


 

 

var iollywoodContainer = document.getElementById("iollywoodContainer");

// Dynamically create and append movie items
movies.forEach(function (movie) {
    var movieDiv = document.createElement("div");
    movieDiv.className = "iollywood-inside";

    var img = document.createElement("img");
    img.src = movie.posterURL;
    img.alt = movie.title;

    var h3 = document.createElement("h3");
    h3.innerText = movie.title;

    var imdbDiv = document.createElement("div");
    imdbDiv.className = "imdb";
    imdbDiv.innerHTML = "<p>" + movie.imdbRating + "</p>";

    movieDiv.appendChild(img);
    movieDiv.appendChild(h3);
    movieDiv.appendChild(imdbDiv);

    // Add an event listener to each movie element
    movieDiv.addEventListener('click', function () {
        // Redirect to index_movie_details.html with the corresponding titleID
        redirectToMovieDetails(movie.titleID);
    });

    iollywoodContainer.appendChild(movieDiv);
});

// Redirect function
function redirectToMovieDetails(titleID) {
    // Use encodeURIComponent to make sure the titleID is properly formatted for a URL
    window.location.href = `index_movie_details.html?titleID=${encodeURIComponent(titleID)}`;
}