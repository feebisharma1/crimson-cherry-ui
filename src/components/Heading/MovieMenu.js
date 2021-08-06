import {Link} from "react-router-dom";

const MovieMenu = () => {
    return(
        <div className="navMenu">
            <ul className="navMenu">
                <li className="navMenu" id="menuHeader">Menu</li>
                <li className="navMenu"><Link className="navMenu" to="/movie">Find a Movie</Link></li>
                <li className="navMenu"><Link className="navMenu" to="/addMovie">Add a Movie</Link></li>
                <li className="navMenu"><Link className="navMenu" to="/actor">Find an Actor</Link></li>
                <li className="navMenu"><Link className="navMenu" to="/addActor">Add an Actor</Link></li>
            </ul>
        </div>
    );
}

export default MovieMenu;