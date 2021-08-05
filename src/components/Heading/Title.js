import "./Title.css" ;
import {Link} from "react-router-dom";
import MovieMenu from "./MovieMenu";

const MovieTitle = () => {
    return (
        <div className="movieTitle">
            <h1 className="movieTitle">
                <Link to="/">Crimson Cherry Movie Database</Link>
            </h1>
            <MovieMenu />
        </div>
    );
}

export default MovieTitle;