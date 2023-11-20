const searchButton = document.getElementById("searchButton");
const input = document.getElementById("searchInput");

function searchMovies() {
  const apiKey = "ecd9849b82b3a3428e824ce2103543f4";
  const searchInput = document.getElementById("searchInput").value;

  if (searchInput.trim() === "") {
    alert("Please enter a movie name.");
    return;
  }

  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length !== 0) {
        displayResults(data.results);
      } else {
        alert("Something went wrong");
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function displayResults(results) {
  const resultContainer = document.getElementById("result");
  resultContainer.innerHTML = "";

  if (results.length === 0) {
    resultContainer.innerHTML = "No results found.";
    return;
  }

  results.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.innerHTML = `<h2>${movie.title}</h2><p>${movie.overview}</p>`;
    resultContainer.appendChild(movieElement);
  });
}

searchButton.addEventListener("click", () => {
  console.log("click1");
  searchMovies();
});
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    searchMovies();
  }
});
