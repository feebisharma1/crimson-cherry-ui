import {getMovieDetails} from "../../data/GetMovieDetails";
import {Fragment, useState, useEffect} from "react";
import {useHistory, useParams} from 'react-router-dom';

const MovieDetails = () => {

    const params = useParams();
    const history = useHistory();
    const [getDetailsForMovieId, setGetDetailsForMovieId] = useState(params.movieId);
    const [movieDetails, setMovieDetails] = useState(null);
    const [notFoundMessage, setNotFoundMessage] = useState("The movie you requested is not in our database.");

    const movieFound = false;

    const displayDetailForMovie = (movieId) => {
        setGetDetailsForMovieId(movieId);
        history.push(`/find/${movieId}`);
    }

    useEffect( () => {
        // need to match both null and undefined so use != not !==
        if ( params.movieId != null) {
            console.log("movieId on param is: ", params.movieId);
            setNotFoundMessage("Loading ")
            setGetDetailsForMovieId(params.movieId);
        }
        else {
            setGetDetailsForMovieId("");
        }
    }, [params.movieId]);


    const loadMovieDetails = (movieId) => {
        console.log("MovieDetails.loading details for movieId: ", movieId);
        getMovieDetails(movieId)
            .then(
                response => {
                    const movieInfo = response.data;
                    console.log(movieInfo);
                    setMovieDetails(movieInfo);
                    setNotFoundMessage("");
                }
            )
            .catch( err => {
                setNotFoundMessage("Sorry, but the movie you requested can't be found.", err);
                }
            )
    }
    useEffect(() => {loadMovieDetails(getDetailsForMovieId) }, [getDetailsForMovieId] );



    return(
        <Fragment>
            {notFoundMessage !== "" &&
            <div className="movieNotFound">
                {notFoundMessage}
            </div>
            }
            {notFoundMessage === "" &&
            <div>
                <h1>{movieDetails.name}</h1>
                <div>
                    <div>{movieDetails.id}</div>
                    <div>{movieDetails.budget}</div>
                    <div>{movieDetails.director}</div>
                    <div>{movieDetails.rating}</div>
                    <div>{movieDetails.runtime}</div>
                    <div>{movieDetails.studio}</div>
                    <div>{movieDetails.synopsis}</div>
                    <div>{movieDetails.year}</div>
                </div>
            </div>
            }
        </Fragment>
    );
}

export default MovieDetails;