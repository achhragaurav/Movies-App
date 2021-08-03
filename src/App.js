import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Movies from "./Pages/Movies";
import Error from "./Pages/Error";
import SingleMovie from "./components/SingleMovie";
import { GlobalContext } from "./components/Context";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState({});

  return (
    <GlobalContext.Provider value={{ setLoading, movies, setMovies, loading }}>
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/singleMovie/:id">
              <SingleMovie />
            </Route>
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </Router>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
