import {Fragment, useState, useEffect, useReducer} from "react";
import {Link, useHistory, useParams} from 'react-router-dom';

import "./MovieDetail.css";
import MovieSearch from "./MovieSearch";
import {getMovieDetails, findMoviesByName} from "../../data/GetMovieDetails";
import {addMovieReview} from "../../data/AddReview";


const MovieDetails = () => {

    let movieFound = false;
    let fatalError = false;

    const params = useParams();
    const history = useHistory();
    const [getDetailsForMovieId, setGetDetailsForMovieId] = useState(params.movieId);
    const [movieToSearchFor, setMovieToSearchFor] = useState("");
    const [movieDetails, setMovieDetailsReal] = useState(null);
    const [message, setMessageReal] = useState("");
    const [enterReviewMessage, setEnterReviewMessage] = useState("");
    const [movieVersion, setMovieVersion] = useState(0);

    if (getDetailsForMovieId == null) {
        setGetDetailsForMovieId("");
    }

    const setMovieDetails = (value) => {
        console.log("Setting movie details to: ", value);
        setMovieDetailsReal(value);
    }

    const setMessageWrapper = (msg) => {
        console.log("Setting message to :", msg);
        setMessageReal(msg)
    }

    const displayDetailForMovie = (movieId) => {
        if (movieId != null && movieId !== "" ) {
            setGetDetailsForMovieId(movieId);
            history.push(`/movie/${movieId}`);
        }
    }
    useEffect( () => displayDetailForMovie(movieToSearchFor), [movieToSearchFor]);

    useEffect( () => {
        // need to match both null and undefined so use != not !==
        if ( params.movieId != null) {
            console.log("movieId on param is: ", params.movieId);
            setGetDetailsForMovieId(params.movieId);
        }
        else {
            setGetDetailsForMovieId("");
        }
    }, [params.movieId]);


    const loadMovieDetailsById = (movieIdOrName) => {
        console.log("MovieDetails.loading details for movieIdOrName: ", movieIdOrName);
        if (movieIdOrName == null || movieIdOrName === "") {
            setMovieDetails(null);
            setMessageWrapper("Please search for the movie you want to view");
            return;
        }
        const movieIdNumber = Number(movieIdOrName);
        if ( !isNaN(movieIdNumber) && movieIdNumber > 0 ) {

            setMessageWrapper("Loading movie details, please wait... (movieId " + movieIdOrName + ")");
            getMovieDetails(movieIdOrName)
                .then(
                    response => {
                        const movieInfo = response.data;
                        console.log(movieInfo);
                        if (movieInfo != null) {
                            setMessageWrapper("");
                            movieFound = true;
                            setMovieDetails(movieInfo);
                        } else {
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
        else {
            setMessageWrapper("Loading movie details, please wait... (movieName " + movieIdOrName + ")");
            findMoviesByName(movieIdOrName)
                .then(
                    response => {
                        const movieList = response.data;
                        console.log(movieList);
                        if (movieList != null && movieList.length > 0 ) {
                            const firstMovie =  movieList[0];
                            console.log("Found movies with a name of ", movieIdOrName);
                            setMessageWrapper("");
                            setMovieDetails(firstMovie);
                            movieFound = true;
                            if (movieList.length > 1) {
                                setMessageWrapper("It looks like there are more than one movie with this name.  Showing the first.");
                            }
                        }
                        else {
                            console.log("No movie returned...");
                            setMessageWrapper("Sorry, but the movieName you requested was not found in our database.");
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
    }
    useEffect(() => {loadMovieDetailsById(getDetailsForMovieId) }, [getDetailsForMovieId, movieVersion]);


    let actorList = "";
    let reviewList = "";
    if (movieDetails != null && (movieDetails.id == getDetailsForMovieId || movieDetails.name === getDetailsForMovieId )) {
        movieFound = true;

        if (movieDetails.actors.length === 0) {
            actorList = <tr className="movieInfoActors">
                <td colSpan="2" className="movieInfoActors">There are not yet any actors associated with this movie.</td>
            </tr>;
        }
        else {
            actorList = movieDetails.actors.map((actor, index) =>
                <tr className="movieInfoActors">
                    <td colSpan="2" key={`actorName.${index}`} className="movieInfoActors">
                        <Link to={`/actor/${actor.id}`} className="movieDetailActorLink">
                            {actor.name}
                        </Link>
                    </td>
                </tr>
            );
        }

        if (movieDetails.reviews.length === 0) {
            const noReviewsText = "There are not yet any reviews for this movie. " +
                                  "Please contribute by entering your review of this movie to the Crimson Cherry Movie database!"
            reviewList = <tr className="movieInfo movieReviewInfo">
                             <td colSpan="2" className="movieReviewInfo movieReviewerName">{noReviewsText}</td>
                         </tr>;
        }
        else {
            reviewList = movieDetails.reviews.map((review, index) =>
                <Fragment>
                    <tr className="movieInfo movieReviewInfo" key={`reviewerName.${index}`}>
                        <td className="movieFieldHeader movieReviewerName">{review.reviewerName}</td>
                        <td className="movieInfo movieReviewInfo">
                            <div>
                                <span
                                    className="reviewedStars">{review.numberOfStars} {review.numberOfStars === 1 ? "Star" : "Stars"}</span>
                                <span className="reviewedOn">{review.reviewedOn}</span>
                            </div>
                        </td>
                    </tr>
                    <tr className="movieInfo movieReviewInfo" key={`synopsis.${index}`}>
                        <td colSpan="2" className="movieInfo movieReviewSynopsis">{review.synopsis}</td>
                    </tr>
                    <tr className="movieInfo movieReviewInfo" key={`review.${index}`}>
                        <td colSpan="2" className="movieInfo movieReviewField">{review.review}</td>
                    </tr>
                    <tr className="movieInfo movieReviewSpacer" key={`spacer.${index}`} >
                        <td colSpan="2" className="movieInfo movieReviewSpacer">
                            <hr />
                        </td>
                    </tr>
                </Fragment>
            );
        }
    }

    // This is where we start the new review handling code
    const newReviewInitialState = {
        reviewerName : "",
        numberOfStars : "",
        synopsis : "",
        review : "",
    };
    const newReviewReducer = (state, data) => {
        return( {...state, [data.field] : data.value } );
    };
    const [newReview, dispatch] = useReducer(newReviewReducer, newReviewInitialState);
    const handleChange = (e) => {
        dispatch( { field : e.target.id, value : e.target.value });
    }
    const newReviewerName = newReview.reviewerName;
    const newNumberOfStars = newReview.numberOfStars;
    const newSynopsis = newReview.synopsis;
    const newReviewText = newReview.review;

    const handleNewReviewSubmit = (e) => {
        e.preventDefault();
        const reviewToAdd = {...newReview, movieId : movieDetails.id}; // Add movieId to the review
        console.log("About to add movie review ", reviewToAdd);
        addMovieReview(reviewToAdd)
            .then( result => {
                if (result.status === 200) {
                    setEnterReviewMessage("Thank you for submitting this review! ", result.data.id);
                    setMovieVersion( movieVersion + 1); // increment version to force refresh
                    // Clear out their old review
                    dispatch( { field : "numberOfStars", value: 0});
                    dispatch( { field : "synopsis", value: ""});
                    dispatch( { field : "review", value: ""});
                    // { newReviewerName, newNumberOfStars, newSynopsis, newReviewText} = newReview;
                } else {
                    setEnterReviewMessage( "Something went wrong saving your review. ", result.status);
                }
            })
            .catch(error => setEnterReviewMessage("Something went wrong saving your review! " + error));
    };


    return(
        <Fragment>
            <MovieSearch movieToSearchFor={movieToSearchFor} setMovieToSearchFor={setMovieToSearchFor}/>
            <div className="movieDetailMessage">
                {message}
            </div>
            {!movieFound && !fatalError && getDetailsForMovieId !== "" &&
                <div className="wantToAddMovie">
                    We would like for you to <Link to="/addMovie">add your movie</Link> to our database!
                </div>
            }
            {movieFound &&
                <div>
                    <h1 className="movieName">{movieDetails.name}</h1>
                    <div className="movieInfo">
                        <table className="movieInfo">
                            <tbody className="movieInfo">
                                <tr className="movieInfo">
                                    <td className="movieFieldHeader">Director</td>
                                    <td className="movieInfo">{movieDetails.director}</td>
                                </tr>
                                <tr className="movieInfo">
                                    <td className="movieFieldHeader">Rating</td>
                                    <td className="movieInfo">{movieDetails.rating}</td>
                                </tr>
                                <tr className="movieInfo">
                                    <td className="movieFieldHeader">Runtime</td>
                                    <td className="movieInfo">{movieDetails.runtime}</td>
                                </tr>
                                <tr className="movieInfo">
                                    <td className="movieFieldHeader">Studio</td>
                                    <td className="movieInfo">{movieDetails.studio}</td>
                                </tr>
                                <tr className="movieInfo">
                                    <td className="movieFieldHeader">Synopsis</td>
                                    <td className="movieInfo">{movieDetails.synopsis}</td>
                                </tr>
                                <tr className="movieInfo">
                                    <td className="movieFieldHeader">Year</td>
                                    <td className="movieInfo">{movieDetails.year}</td>
                                </tr>
                                <tr className="movieInfo">
                                    <td className="movieFieldHeader">Budget</td>
                                    <td className="movieInfo">{movieDetails.budget}</td>
                                </tr>
                                <tr className="movieInfo">
                                    <td colSpan="2" className="moveDetailActorHeader">
                                        Actors
                                    </td>
                                </tr>
                                {actorList}

                                <tr className="movieInfo">
                                    <td colSpan="2" className="moveDetailReviewHeader">
                                        Reviews
                                    </td>
                                </tr>
                                {reviewList}
                            </tbody>
                        </table>
                    </div>


                    <div className="enterReview">
                        <h2>Enter your review</h2>
                        <p className="enterReviewMessage">{enterReviewMessage}</p>
                        <form className="enterReview" onSubmit={handleNewReviewSubmit}>
                            <table className="enterReview">
                                <tbody className="enterReview">
                                    <tr>
                                        <td className="enterReviewLabel">
                                            <label htmlFor="reviewerName">Your name</label>
                                        </td>
                                        <td className="enterReviewData">
                                            <input type="text" className="enterReviewData" id="reviewerName"  onChange={handleChange} value={newReviewerName} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="enterReviewLabel">
                                            <label htmlFor="numberOfStars">Number of Stars</label>
                                        </td>
                                        <td className="enterReviewData">
                                            <select id="numberOfStars" className="enterNumberOfStars"  onChange={handleChange} value={newNumberOfStars}>
                                                <option key="1" value="1">1</option>
                                                <option key="2" value="2">2</option>
                                                <option key="3" value="3">3</option>
                                                <option key="4" value="4">4</option>
                                                <option key="5" value="5">5</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="enterReviewLabel">
                                            <label htmlFor="synopsis">Review Title</label>
                                        </td>
                                        <td className="enterReviewData">
                                            <input type="text" className="enterReviewData" id="synopsis"  onChange={handleChange}  value={newSynopsis} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="enterReviewLabel">
                                            <label htmlFor="review">Detailed Review</label>
                                        </td>
                                        <td className="enterReviewData">
                                            <textarea className="reviewTextArea" id="review"  onChange={handleChange} value={newReviewText} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="enterReviewSubmit">
                                            <button type="submit" id="submitReview">Save Review</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            }
        </Fragment>
    );
};

export default MovieDetails;