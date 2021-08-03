export const fetchMovies = (movie) => {
  return fetch(
    `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/${movie}`,
    {
      method: "GET", // or 'PUT'
      headers: {
        "x-rapidapi-key": "9bf439e012mshc51568f00f1e937p1c846ejsn2906142dc06f",
        "x-rapidapi-host":
          "imdb-internet-movie-database-unofficial.p.rapidapi.com",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
