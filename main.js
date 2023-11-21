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
        console.log(data.results);
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
    movieElement.classList.add("movie-card");
    movieElement.innerHTML = `<div class="movie-img">
    <img src="${`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}" alt="${
      movie.original_title
    }">
    </div>
    <h2>${movie.title}</h2>
    <p>${movie.overview}</p>
    <p><span>Popularity </span>${movie.popularity}</p>
    `;
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

document.addEventListener("DOMContentLoaded", function () {
  searchLatestMovies();
});

function searchLatestMovies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2Q5ODQ5YjgyYjNhMzQyOGU4MjRjZTIxMDM1NDNmNCIsInN1YiI6IjY0MmRiODZkNTgzNjFiMDA3N2I4N2Y3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Edg3ky_PMlwoI6HeDWNuhY_PETa7yKljB-MP3c-KKBs",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      const swipperWrapper = document.querySelector(".swiper-wrapper");

      data?.results.forEach((item) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `<img src="${`https://image.tmdb.org/t/p/w500/${item.poster_path}`}" alt="${
          item.original_title
        }">`;
        swipperWrapper.append(slide);
      });

      var swiper = new Swiper(".mySwiper", {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}
