function searchMovies() {
    const apiKey = '91c8072381313442ec35041820d8f199';
    const searchInput = document.getElementById('searchInput').value;

    if (searchInput.trim() === '') {
        alert('Please enter a movie name.');
        return;
    }

    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayResults(data.results);
            } else {
                alert('Something went wrong')
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayResults(results) {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';

    if (results.length === 0) {
        resultContainer.innerHTML = 'No results found.';
        return;
    }

    results.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.innerHTML = `<h2>${movie.title}</h2><p>${movie.overview}</p>`;
        resultContainer.appendChild(movieElement);
    });
}