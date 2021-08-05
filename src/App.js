import {BrowserRouter, Switch, Route} from "react-router-dom";

import './App.css';
import MovieTitle from "./components/Heading/Title";
import MovieDetails from "./components/MovieDetail/MovieDetail";
import PageNotFound from "./components/PageNotFoune/PageNotFound";


function App() {
  return (
      <BrowserRouter>
        <MovieTitle />
        <Switch>

          <Route path={["/movie/:movieId", "/movie"]}>
            <MovieDetails />
          </Route>

          <Route>
            <PageNotFound />
          </Route>

        </Switch>
      </BrowserRouter>

  );
}

export default App;
