export const fetchMovies = async (page) => {
  console.log(process.env.REACT_APP_API_KEY);
  return fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
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

// import { useContext } from "react";
// import { GlobalContext } from "../components/Context";

// const fetchData = async () => {
//   setLoading(true);
//   try {
//     const response = await fetch(
//       `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/Inception`,
//       {
//         method: "GET", // or 'PUT'
//         headers: {
//           "x-rapidapi-key":
//             "9bf439e012mshc51568f00f1e937p1c846ejsn2906142dc06f",
//           "x-rapidapi-host":
//             "imdb-internet-movie-database-unofficial.p.rapidapi.com",
//         },
//       }
//     );
//     const mov = await response.json();
//     await setMovies(mov);
//     setLoading(false);
//   } catch (error) {
//     setLoading(false);
//     console.log(error);
//   }
// };
