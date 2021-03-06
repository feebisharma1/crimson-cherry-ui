import {BrowserRouter, Switch, Route} from "react-router-dom";

import './App.css';
import ActorList from "./components/ActorDetails/ActorList";
import AddActors from "./components/ActorDetails/AddActors";
import MovieTitle from "./components/Heading/Title";
import MovieDetails from "./components/MovieDetail/MovieDetail";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import MovieList from "./components/MovieList/MovieList";
import AddMovie from "./components/AddMovie/AddMovie";

function App() {
  const isThereMessage = true;
  return (
      <BrowserRouter>
        <MovieTitle />
        <Switch>
          <Route path={["/movie/:movieId", "/movie"]}>
            <MovieDetails />
          </Route>
          <Route path={"/actor"}>
            <ActorList />
          </Route>
          <Route path={"/addActor"}>
            <AddActors isThereMessage={isThereMessage}/>
          </Route>
            <Route path="/" exact={true}>
            <MovieList/>
        </Route>
            <Route path="/addMovie" exact={true}>
                <AddMovie/>
            </Route>
          <Route>
            <PageNotFound />
          </Route>

        </Switch>
      </BrowserRouter>

  );
}

export default App;
