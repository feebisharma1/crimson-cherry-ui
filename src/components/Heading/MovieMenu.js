import {Link} from "react-router-dom";

const MovieMenu = () => {
    return(
        <div className="navMenu">
            <ul className="navMenu">
                <li><Link to="/movie">Find a Movie</Link></li>
                <li><Link to="/addMovie">Add a Movie</Link></li>
                <li><Link to="/actor">Find an Actor</Link></li>
                <li><Link to="/addActor">Add an Actor</Link></li>
            </ul>
        </div>
    );
}

export default MovieMenu;