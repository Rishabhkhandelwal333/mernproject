import axios from "axios";
import {
    ALL_MOVIE_FAIL,
    ALL_MOVIE_REQUEST,
    ALL_MOVIE_SUCCESS,
    MOVIE_DETAILS_REQUEST,
    MOVIE_DETAILS_SUCCESS,
    MOVIE_DETAILS_FAIL,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_REQUEST,
    ADMIN_MOVIE_REQUEST,
    ADMIN_MOVIE_FAIL,
    ADMIN_MOVIE_SUCCESS,
    NEW_MOVIE_FAIL,
    NEW_MOVIE_REQUEST,
    NEW_MOVIE_SUCCESS,
    DELETE_MOVIE_FAIL,
    DELETE_MOVIE_REQUEST,
    DELETE_MOVIE_SUCCESS,
    UPDATE_MOVIE_FAIL,
    UPDATE_MOVIE_REQUEST,
    UPDATE_MOVIE_SUCCESS,
    ALL_REVIEW_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    CLEAR_ERRORS,
} from "../constants/movieConstant";

export const getMovie = (keyword = "", currentPage = 1, price = [0, 500], category, ratings = 0) => async (dispatch) => {
    try {

        dispatch({
            type: ALL_MOVIE_REQUEST
        });
        let link = `/api/v1/movies?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        if (category) {
            link = `/api/v1/movies?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&genre=${category}&ratings[gte]=${ratings}`;
        }
        const { data } = await axios.get(link);

        dispatch({
            type: ALL_MOVIE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ALL_MOVIE_FAIL,
            payload: error.response.data.message,
        });
    }
};
//getMovieDetails

export const getMovieDetails = (id) => async (dispatch) => {
    try {

        dispatch({
            type: MOVIE_DETAILS_REQUEST
        });
        const { data } = await axios.get(`/api/v1/movie/${id}`);
        console.log(data);

        dispatch({
            type: MOVIE_DETAILS_SUCCESS,
            payload: data.movie,
        })

    } catch (error) {
        dispatch({
            type: MOVIE_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

//new  review 

export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({
            type: NEW_REVIEW_REQUEST
        });

        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.put(`/api/v1/review`, reviewData, config);



        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Get all Movies for Admin

export const getAdminMovie = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_MOVIE_REQUEST });
        const { data } = await axios.get("/api/v1/admin/movies");

        dispatch({
            type: ADMIN_MOVIE_SUCCESS,
            payload: data.movies,

        });
    } catch (error) {
        dispatch({
            type: ADMIN_MOVIE_FAIL,
            payload: error.response.data.message,
        });
    }

};

// create a new movie  --admin


export const createMovie = (movieData) => async (dispatch) => {
    try {

        dispatch({
            type: NEW_MOVIE_REQUEST
        });

        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.post(`/api/v1/admin/movie/new`, movieData, config);



        dispatch({
            type: NEW_MOVIE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: NEW_MOVIE_FAIL,
            payload: error.response.data.message,
        });
    }
};


//Delete Movie

export const deleteMovie = (id) => async (dispatch) => {
    try {

        dispatch({
            type: DELETE_MOVIE_REQUEST
        });


        const { data } = await axios.delete(`/api/v1/admin/movie/${id}`);


        dispatch({
            type: DELETE_MOVIE_SUCCESS,
            payload: data.success,
        })

    } catch (error) {
        dispatch({
            type: DELETE_MOVIE_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Update Movie 

export const updateMovie = (id,movieData) => async (dispatch) => {
    try {

        dispatch({
            type: UPDATE_MOVIE_REQUEST
        });

        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.put(`/api/v1/admin/movie/${id}`, movieData, config);



        dispatch({
            type: UPDATE_MOVIE_SUCCESS,
            payload: data.success,
        })

    } catch (error) {
        dispatch({
            type: UPDATE_MOVIE_FAIL,
            payload: error.response.data.message,
        });
    }
};

//get all reviews --admin

export const getAllReviews = (id) => async (dispatch) => {
    try {

        dispatch({
            type: ALL_REVIEW_REQUEST
        });

      
        const { data } = await axios.get(`/api/v1/reviews?movieId=${id}`);



        dispatch({
            type: ALL_REVIEW_SUCCESS,
            payload: data.reviews,
        })

    } catch (error) {
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

//del review  --admin

export const deleteReviews = (reviewId,movieId) => async (dispatch) => {
    try {

        dispatch({
            type: DELETE_REVIEW_REQUEST
        });

      
        const { data } = await axios.delete(`/api/v1/reviews?id=${reviewId}&movieId=${movieId}`);

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.reviews,
        })

    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};
//clear all errors


export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};