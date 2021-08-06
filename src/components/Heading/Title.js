import "./Title.css" ;
import cherryLogo from '../../cherries.jpg';
import {Link} from "react-router-dom";
import MovieMenu from "./MovieMenu";

const MovieTitle = () => {
    return (
        <div className="movieTitle" >
            <MovieMenu />
            <div className="movieTitle">
                <img id="cherryLogo" src={cherryLogo} alt="logo"  width="101px" height="102px" />
                <h1 className="movieTitle">
                    <Link className="movieTitle" to="/">Crimson Cherry Movie Database</Link>
                </h1>
            </div>
        </div>
    );
}

export default MovieTitle;