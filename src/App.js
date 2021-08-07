import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Discover from "./Pages/Discover";
import Genre from "./Pages/Genre";
import Movies from "./Pages/Movies";
import Error from "./Pages/Error";
import SingleMovie from "./components/SingleMovie";
import { GlobalContext } from "./components/Context";
import CustomPagination from "./components/Pagination/CustomPagination";
import TVShows from "./Pages/TVShows";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState({});
  const [singleMovieDataPass, setSingleMovieDataPass] = useState({});
  const [pageNumber, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchOnOff, setSearchOnOff] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        setLoading,
        movies,
        setMovies,
        loading,
        singleMovieDataPass,
        setSingleMovieDataPass,
        pageNumber,
        setPage,
        totalPages,
        setTotalPages,
        searchOnOff,
        setSearchOnOff,
      }}
    >
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Discover />
            </Route>
            <Route path="/genre">
              <Genre />
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/tvshows">
              <TVShows />
            </Route>
            <Route path="/singleMovie/:id">
              <SingleMovie />
            </Route>
            <Route path="*">
              <Error />
            </Route>
          </Switch>
          <CustomPagination />
        </Router>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
