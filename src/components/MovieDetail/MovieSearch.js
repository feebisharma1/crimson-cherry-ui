import "./MovieSearch.css";
import {useState} from 'react';

const MovieSearch = (props) => {

    const [searchTerm, setSearchTerm] = useState(props.movieToSearchFor);
    const [validMovieId, setvalidMovieId] = useState(false);
    const [touched, setTouched] = useState(false);

    if (props.movieToSearchFor == null ) {
        props.setMovieToSearchFor("");
        setSearchTerm("");
    };

    const handleChange = (changeEvent) => {
        // console.log("changed search term is: " + changeEvent.target.value);
        setSearchTerm(changeEvent.target.value);
        setvalidMovieId(changeEvent.target.value.trim().length > 0);
        setTouched(true);
    };

    const doSearch = (submitEvent) => {
        console.log("Submit of movie to search with search term of: " + searchTerm);
        props.setMovieToSearchFor(searchTerm);
        submitEvent.preventDefault();
    };

    const clearSearch = (submitEvent) => {
        console.log("clearing move to search for: ");
        setSearchTerm("");
        submitEvent.preventDefault();
        props.setMovieToSearchFor("");
    };

    return (
        <div className="movieSearch">
            <form onSubmit={doSearch}>
                <label htmlFor="movieKey">Search for Movie:</label>
                <input onChange={handleChange} value={searchTerm} id="movieKey" type="Text"
                       className={ (! validMovieId  && touched) ? 'searchBoxError' : '' }/>
                <button type="submit" disabled={!validMovieId} id="movieSearchButton">Search</button>
                <button onClick={clearSearch} id="clearMovieSearchButton">Reset</button>
            </form>
        </div>
    );

};

export default MovieSearch;