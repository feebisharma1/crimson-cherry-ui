import axios from "axios";

export const addMovieReview = (review) => {
    console.log("data.addMovieReview() adding movie review: ", review);
    return axios({
        url: `http://localhost:8080/api/review`,
        method: "POST",
        headers: {"Accept": "application/json", "Content-Type" : "application/json"},
        data: review
    });
}
