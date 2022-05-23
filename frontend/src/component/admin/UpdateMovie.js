import React, { Fragment, useEffect, useState } from 'react'
import './newMovie.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, updateMovie,getMovieDetails } from '../../actions/movieAction';
import { useAlert } from "react-alert";
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Sidebar from './Sidebar';
import { UPDATE_MOVIE_RESET } from '../../constants/movieConstant';
import { useParams } from 'react-router-dom';

const UpdateMovie = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {error,movie}=useSelector((state) => state.movieDetails);
    const { loading, error:UpdateError, isUpdated} = useSelector((state) => state.movie);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [seats, setSeats] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);


    const categories = [
        "Horror",
        "Comedy",
        "Sports",
        "Science",
        "Love",
        "Action",
        "Suspense",
    ];


    const {id} = useParams();
    const movieId= id;

    useEffect(() => {

        if(movie && movie._id !== movieId){
            dispatch(getMovieDetails(movieId));
        }else{
            setName(movie.name);
            setDescription(movie.description);
            setCategory(movie.genre);
            setSeats(movie.seats);
            setOldImages(movie.images);
            setPrice(movie.price);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        
        if (UpdateError) {
            alert.error(UpdateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Movie Updated Successfully");
            window.location.href = "/admin/movies";
            dispatch({ type: UPDATE_MOVIE_RESET });
        }
    }, [dispatch, alert, error, isUpdated,movieId,movie,UpdateError]);

    const updateMovieSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("genre", category);
        myForm.set("seats", seats);
        images.forEach((image) => {
            myForm.append("images", image);
          });
        dispatch(updateMovie(movieId,myForm));
    };

    const updateMoviesImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
              setImages((old) => [...old, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
      };
        return (
            <Fragment>
                <MetaData title="Update Movie" />
                <div className='dashboard'>
                    <Sidebar />
                    <div className='newMovieContainer'>
                        <form
                            className='createMovieForm'
                            encType='multipart/form-data'
                            onSubmit={updateMovieSubmitHandler}

                        >
                            <h1>Update Movie</h1>

                            <div>
                                <SpellcheckIcon />
                                <input
                                    type="text"
                                    placeholder="Movie Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <AttachMoneyIcon />
                                <input
                                    value={price}
                                    type="number"
                                    placeholder="Price"
                                    required
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div>
                                <DescriptionIcon />

                                <textarea
                                    placeholder="Movie Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    cols="30"
                                    rows="1"
                                ></textarea>
                            </div>

                            <div>
                                <AccountTreeIcon />
                                <select  value= {category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Choose Genre</option>
                                    {categories.map((cate) => (
                                        <option key={cate} value={cate}>
                                            {cate}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <StorageIcon />
                                <input
                                    value={seats}
                                    type="number"
                                    placeholder="Seats"
                                    required
                                    onChange={(e) => setSeats(e.target.value)}
                                />
                            </div>

                            <div id="createMovieFormFile">
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={updateMoviesImagesChange}
                                    multiple

                                />
                            </div>
                            <div id="createMovieFormImage">
                          {oldImages && oldImages.map((image, index) => (
                              <img key={index} src={image.url} alt="old Movie Preview" />
                             ))}
                            </div>


                            <div id="createMovieFormImage">
                          {imagesPreview.map((image, index) => (
                              <img key={index} src={image} alt="Movie Preview" />
                             ))}
                            </div>


                            <Button
                                id="createMovieBtn"
                                type="submit"
                                disabled={loading ? true : false}
                            >
                                Update
                            </Button>

                        </form>

                    </div>

                </div>
            </Fragment>
        );
    };

    export default UpdateMovie