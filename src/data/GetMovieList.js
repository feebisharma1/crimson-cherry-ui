import axios from "axios";

export const getMovieList = () => {
    console.log("data.getMovieList retrieving list of movies ");
    return axios({
        url: `http://localhost:8080/api/movie/all`,
        method: "GET",
        headers: {"Accept": "application/json"}
    });
}