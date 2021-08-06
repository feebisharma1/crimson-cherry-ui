import {getMovieList} from "../../data/GetMovieDetails";
import {Fragment, useState, useEffect} from "react";
import {Link, useHistory, useParams} from 'react-router-dom';

const MovieList = (movieList) => {

    let moviesFound = false;
    let fatalError = false;

    const params = useParams();
    const history = useHistory();
    const [getDetailsForMovieId, setGetDetailsForMovieId] = useState(params.movieId);
    const [movieDetails, setMovieDetails] = useState([]);
    const [notFoundMessage, setNotFoundMessage] = useState("No movies found in database");
    const [message, setMessageReal] = useState("");
    console.log("Refreshing with : ", movieDetails);

    const displayDetailForMovie = (movieId) => {
        setGetDetailsForMovieId(movieId);
        history.push(`/find/${movieId}`);
    }

    const setMessageWrapper = (msg) => {
        console.log("Setting message to :", msg);
        setMessageReal(msg)
    }

    const loadMovies = () => {
        console.log("Loading Movies from Database... ");
        setMessageWrapper("Loading Movies from Database...");
        getMovieList()
            .then(
                response => {
                    const movieInfo = response.data;
                    console.log("MOVIE INFO" + movieInfo);
                    if (movieInfo != null) {
                        setMessageWrapper("");
                        moviesFound = true;
                        setMovieDetails(movieInfo);
                        console.log("MOVIE DETAILS : " , movieDetails)
                    }
                    else {
                        console.log("No movie returned...");
                        setMessageWrapper("Sorry, but the movieId you requested was not found in our database.");
                        setMovieDetails(null);
                    }
                }
            )
            .catch(err => {
                    setMovieDetails(null);
                    const msg = "We encountered an error getting your movie from our database. " +
                        "Maybe the gremlins took over the computer room again..." +
                        "We will try to rid ourselves of the gremlins and get it working, so please try again later!";
                    setMessageWrapper(msg, err);
                    fatalError = true;
                }
            );
    }
    useEffect(() => {loadMovies(getMovieList) }, [getMovieList]);


    let moviesList = "";
    if(movieDetails == null){
        console.log("Movie Details is null")
    }
     moviesList = movieDetails.map((movie, index) =>
        <tr className="movieInfoActors">
            <td colSpan="2" key={`movieName.${index}`} className="movieInfoActors">
                <h1 className="movieName">
                <Link to={`/movie/${movie.id}`} className="movieDetailLink">
                    {movie.name}
                </Link>
                </h1>
            </td>
            <td>
            Director : {movie.director}
            </td>
            <td>
                Studio : {movie.studio}
            </td>
        </tr>
    );

    return(
        <Fragment>
                <div className="movieInfo">
                    <table className="movieInfo">
                        <tbody className="movieInfo">
                        {moviesList}
                        </tbody>
                    </table>
                </div>
        </Fragment>
    );
}

export default MovieList;