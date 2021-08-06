import {BrowserRouter, Switch, Route} from "react-router-dom";

import './App.css';
import ActorList from "./components/ActorDetails/ActorList";
import AddActors from "./components/ActorDetails/AddActors";
import MovieTitle from "./components/Heading/Title";
import MovieDetails from "./components/MovieDetail/MovieDetail";
import PageNotFound from "./components/PageNotFound/PageNotFound";

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
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </BrowserRouter>

  );
}

export default App;
