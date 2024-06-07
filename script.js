document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '5ce518437c0069579e6efdbc50cfd2db'; // Your TMDb API key
    const baseUrl = 'https://api.themoviedb.org/3';

    async function getMovieDetails(movieId) {
        const url = `${baseUrl}/movie/${movieId}?api_key=${apiKey}&append_to_response=credits,reviews`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const movieDetails = await response.json();
            displayMovieDetails(movieDetails);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    }

    async function searchMovies(query) {
        const url = `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const searchResults = await response.json();
            if (searchResults.results.length > 0) {
                getMovieDetails(searchResults.results[0].id);
            } else {
                document.getElementById('movie-details').innerHTML = '<p>No results found</p>';
            }
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    }

    async function getPopularMovies() {
        const url = `${baseUrl}/movie/popular?api_key=${apiKey}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const popularMovies = await response.json();
            displayPopularMovies(popularMovies.results);
        } catch (error) {
            console.error('Error fetching popular movies:', error);
        }
    }

    async function getTopRatedMovies() {
        const url = `${baseUrl}/movie/top_rated?api_key=${apiKey}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const topRatedMovies = await response.json();
            displayMovies(topRatedMovies.results, 'top-rated-movies');
        } catch (error) {
            console.error('Error fetching top rated movies:', error);
        }
    }

    async function getNowPlayingMovies() {
        const url = `${baseUrl}/movie/now_playing?api_key=${apiKey}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const nowPlayingMovies = await response.json();
            displayMovies(nowPlayingMovies.results, 'now-playing-movies');
        } catch (error) {
            console.error('Error fetching now playing movies:', error);
        }
    }

    async function getUpcomingMovies() {
        const url = `${baseUrl}/movie/upcoming?api_key=${apiKey}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const upcomingMovies = await response.json();
            displayMovies(upcomingMovies.results, 'upcoming-movies');
        } catch (error) {
            console.error('Error fetching upcoming movies:', error);
        }
    }

    function displayMovieDetails(movie) {
        const movieDetailsDiv = document.getElementById('movie-details');
        const genres = movie.genres.map(genre => genre.name).join(', ');
        const cast = movie.credits.cast.slice(0, 5).map(actor => actor.name).join(', ');
        const reviews = movie.reviews.results.map(review => `<p><strong>${review.author}</strong>: ${review.content}</p>`).join('');

        movieDetailsDiv.innerHTML = `
            <h2>${movie.title}</h2>
            <p>${movie.overview}</p>
            <p>Release Date: ${movie.release_date}</p>
            <p>Genres: ${genres}</p>
            <p>Cast: ${cast}</p>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
            <button onclick="addToWatchLater(${movie.id})">Add to Watch Later</button>
            <div>
                <h3>Reviews</h3>
                ${reviews || '<p>No reviews available.</p>'}
            </div>
        `;
    }

    function displayPopularMovies(movies) {
        const popularMoviesDiv = document.getElementById('popular-movies');
        popularMoviesDiv.innerHTML = movies.map(movie => `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 movie-item">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
                <div>
                    <h3>${movie.title}</h3>
                    <p>${movie.overview}</p>
                    <p>Release Date: ${movie.release_date}</p>
                    <button onclick="addToWatchLater(${movie.id})">Add to Watch Later</button>
                </div>
            </div>
        `).join('');
    }

    async function getMovieDetails(movieId) {
        const url = `${baseUrl}/movie/${movieId}?api_key=${apiKey}&append_to_response=credits,reviews,videos,recommendations`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const movieDetails = await response.json();
            displayMovieDetails(movieDetails);
            displayMovieTrailer(movieDetails.videos.results);
            displayMovieRecommendations(movieDetails.recommendations.results);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    }

    function displayMovieTrailer(videos) {
        const trailerDiv = document.getElementById('movie-trailer');
        const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        if (trailer) {
            trailerDiv.innerHTML = `
                <h3>Trailer</h3>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>
            `;
        } else {
            trailerDiv.innerHTML = '<p>No trailer available.</p>';
        }
    }
    function displayMovieRecommendations(recommendations) {
        const recommendationsDiv = document.getElementById('movie-recommendations');
        recommendationsDiv.innerHTML = '';
        const moviesToDisplay = recommendations.slice(0, 6);
        moviesToDisplay.forEach((movie, index) => {
            const movieItem = document.createElement('div');
            movieItem.classList.add('col-12', 'col-sm-6', 'col-md-4', 'movie-item');
            movieItem.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
                <div>
                    <h3>${movie.title}</h3>
                    <p>${movie.overview}</p>
                    <p>Release Date: ${movie.release_date}</p>
                    <button onclick="getMovieDetails(${movie.id})">View Details</button>
                </div>
            `;
            recommendationsDiv.appendChild(movieItem);
            if ((index + 1) % 3 === 0 && index !== 0) {
                recommendationsDiv.appendChild(document.createElement('br'));
            }
        });
    }
    
    

    function displayMovies(movies, elementId) {
        const moviesDiv = document.getElementById(elementId);
        moviesDiv.innerHTML = movies.map(movie => `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 movie-item">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
                <div>
                    <h3>${movie.title}</h3>
                    <p>${movie.overview}</p>
                    <p>Release Date: ${movie.release_date}</p>
                    <button onclick="addToWatchLater(${movie.id})">Add to Watch Later</button>
                </div>
            </div>
        `).join('');
    }

    function addToWatchLater(movieId) {
        const watchLater = getWatchLater();
        if (!watchLater.includes(movieId)) {
            watchLater.push(movieId);
            localStorage.setItem('watchLaterMovies', JSON.stringify(watchLater));
            alert('Movie added to Watch Later');
            displayWatchLaterMovies();
        } else {
            alert('Movie is already in Watch Later');
        }
    }

    function removeFromWatchLater(movieId) {
        const watchLater = getWatchLater();
        const index = watchLater.indexOf(movieId);
        if (index !== -1) {
            watchLater.splice(index, 1);
            localStorage.setItem('watchLaterMovies', JSON.stringify(watchLater));
            alert('Movie removed from Watch Later');
            displayWatchLaterMovies();
        }
    }

    function getWatchLater() {
        const watchLater = localStorage.getItem('watchLaterMovies');
        return watchLater ? JSON.parse(watchLater) : [];
    }

    async function displayWatchLaterMovies() {
        const watchLater = getWatchLater();
        const watchLaterMoviesDiv = document.getElementById('watch-later-movies');
        watchLaterMoviesDiv.innerHTML = '';

        for (const movieId of watchLater) {
            const url = `${baseUrl}/movie/${movieId}?api_key=${apiKey}`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const movie = await response.json();
                watchLaterMoviesDiv.innerHTML += `
                    <div class="col-12 col-sm-6 col-md-4 col-lg-3 movie-item">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
                        <div>
                            <h3>${movie.title}</h3>
                            <p>${movie.overview}</p>
                            <p>Release Date: ${movie.release_date}</p>
                            <button class="remove" onclick="removeFromWatchLater(${movie.id})">Remove from Watch Later</button>
                        </div>
                    </div>
                `;
            } catch (error) {
                console.error('Error fetching watch later movies:', error);
            }
        }
    }

    document.getElementById('search-button').addEventListener('click', () => {
        const query = document.getElementById('search-input').value;
        if (query) {
            searchMovies(query);
        }
    });

    // Fetch and display popular movies on page load
    getPopularMovies();

    // Fetch and display additional movie categories
    getTopRatedMovies();
    getNowPlayingMovies();
    getUpcomingMovies();

    // Display watch later movies on page load
    displayWatchLaterMovies();

    // Dark mode toggle
    document.getElementById('dark-mode-toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Expose the addToWatchLater and removeFromWatchLater functions globally
    window.addToWatchLater = addToWatchLater;
    window.removeFromWatchLater = removeFromWatchLater;
});
