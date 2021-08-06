// This is where we start the new review handling code
import {Fragment, useReducer, useState} from "react";
import {addMovie} from "../../data/AddMovie";
import MovieList from "../MovieList/MovieList";


const AddMovie = () => {
    const newMovieInitialState = {
        name: "",
        director: "",
        studio: "",
        year: "",
    };
    const newMovieReducer = (state, data) => {
        return ({...state, [data.field]: data.value});
    };
    const [newMovie, dispatch] = useReducer(newMovieReducer, newMovieInitialState);
    const handleChange = (e) => {
        dispatch({field: e.target.id, value: e.target.value});
    }
    const newMovieName = newMovie.name;
    const newDirector = newMovie.director;
    const newStudio = newMovie.studio;
    const newMovieYear = newMovie.year;


    const [enterMovieMessage, setEnterMovieMessage] = useState("");
    const [movieVersion, setMovieVersion] = useState(0);

    const handleNewMovieSubmit = (e) => {
        e.preventDefault();
        if(newMovie.name != "") {
        addMovie(newMovie)
            .then(result => {
                    if (result.status === 200) {
                        setEnterMovieMessage("Movie added ", result.data.id);
                        setMovieVersion(0); // increment version to force refresh
                        dispatch({field: "name", value: ""});
                        dispatch({field: "director", value: ""});
                        dispatch({field: "studio", value: ""});
                        dispatch({field: "year", value: ""});
                    } else {

                        setEnterMovieMessage("Something went wrong saving your review. ", result.status);
                    }
            })
            .catch(error => setEnterMovieMessage("Something went wrong saving your review! " + error));
    }
    else{setEnterMovieMessage("Something went wrong saving your review. ");}
    };
    return(
        <Fragment>
            <div className="enterReview">
                <h2>Add A New Movie</h2>
                <p className="enterReviewMessage">{enterMovieMessage}</p>
                <form className="enterReview" onSubmit={handleNewMovieSubmit}>
                    <table className="enterReview">
                        <tbody className="enterReview">
                        <tr>
                            <td className="enterReviewLabel">
                                <label htmlFor="reviewerName">Movie Name</label>
                            </td>
                            <td className="enterMovieName">
                                <input type="text" className="enterMovieName" id="name"  onChange={handleChange} value={newMovieName} />
                            </td>
                        </tr>
                        <tr>
                            <td className="enterMovieDirectorLabel">
                                <label htmlFor="director">Movie Director</label>
                            </td>
                            <td className="enterMovieStudio">
                                <input type="text" className="enterMovieDirector" id="director"  onChange={handleChange}  value={newDirector} />
                            </td>
                        </tr>
                        <tr>
                            <td className="enterMovieStudioLabel">
                                <label htmlFor="synopsis">Movie Studio</label>
                            </td>
                            <td className="enterMovieStudio">
                                <input type="text" className="enterMovieStudio" id="studio"  onChange={handleChange}  value={newStudio} />
                            </td>
                        </tr>
                        <tr>
                            <td className="enterMovieYearLabel">
                                <label htmlFor="synopsis">Movie Year</label>
                            </td>
                            <td className="enterMovieYear">
                                <input type="text" className="enterMovieYear" id="year"  onChange={handleChange}  value={newMovieYear} />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan="2" className="enterMovieSubmit">
                                <button type="submit" id="submitReview">Save Movie</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </Fragment>
    );
}
export default AddMovie;