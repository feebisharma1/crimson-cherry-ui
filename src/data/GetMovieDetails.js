import axios from "axios";

export const getMovieDetails = (movieId) => {
    console.log("data.getMovieDetails() getting movie details for ", movieId);
    return axios({
        url: `http://localhost:8080/api/movie/${movieId}`,
        method: "GET",
        headers: {"Accept": "application/json"}
    });
}