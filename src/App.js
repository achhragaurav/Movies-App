import { GlobalContext } from "./components/Context";
import { useState, useEffect } from "react";
import { fetchMovies } from "../src/utils/fetchMovies";
import Loading from "./components/Loading";
import Search from "./components/Search";

var dataa = {};

function App() {
  // Loading and Input
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState({});

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/Inception`,
        {
          method: "GET", // or 'PUT'
          headers: {
            "x-rapidapi-key":
              "9bf439e012mshc51568f00f1e937p1c846ejsn2906142dc06f",
            "x-rapidapi-host":
              "imdb-internet-movie-database-unofficial.p.rapidapi.com",
          },
        }
      );
      const mov = await response.json();
      setLoading(false);
      setMovies(mov);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchMovies("Inception").then((data) => {
      dataa = { ...data };
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  return (
    <div className="App">
      <main>
        <GlobalContext.Provider value={{ setLoading, dataa }}>
          <Search />
          {dataa.titles.map((item) => {
            return (
              <div className="movie">
                <h1>{item.title}</h1>
                <img src={item.image} alt="" />
              </div>
            );
          })}
        </GlobalContext.Provider>
      </main>
    </div>
  );
}

export default App;
// data.titles[0].title
