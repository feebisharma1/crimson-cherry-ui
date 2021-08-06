import axios from "axios";

export const getMovieDetails = (movieId) => {
    console.log("data.getMovieDetails() getting movie details for movieId: ", movieId);
    return axios({
        url: `http://localhost:8080/api/movie/${movieId}`,
        method: "GET",
        headers: {"Accept": "application/json"}
    });
}

export const findMoviesByName = (movieName) => {
    console.log("data.findMoviesByName() getting movies with name: ", movieName);
    return axios({
        url: `http://localhost:8080/api/movie?name=${movieName}`,
        method: "GET",
        headers: {"Accept": "application/json"}
    });
}

export const findMoviesByDirector = (director) => {
    console.log("data.findMovieByDirector() getting movies directed by: ", director);
    return axios({
        url: `http://localhost:8080/api/movie?director=${director}`,
        method: "GET",
        headers: {"Accept": "application/json"}
    });
}

export const getMovieList = () => {
    console.log("data.getMovieList retrieving list of movies ");
    return axios({
        url: `http://localhost:8080/api/movie/all`,
        method: "GET",
        headers: {"Accept": "application/json"}
    });
}