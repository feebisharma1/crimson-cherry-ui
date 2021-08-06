import axios from "axios";

export const addMovie = (movie) => {
    console.log("data.addMovieReview() adding movie review: ", movie);
    return axios({
        url: `http://localhost:8080/api/movie/save`,
        method: "POST",
        headers: {"Accept": "application/json", "Content-Type" : "application/json"},
        data: movie
    });
}