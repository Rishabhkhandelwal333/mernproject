import React, { Fragment, useEffect, useState } from 'react'
import './newMovie.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, createMovie } from '../../actions/movieAction';
import { useAlert } from "react-alert";
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Sidebar from './Sidebar';
import { NEW_MOVIE_RESET } from '../../constants/movieConstant';

const NewMovie = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, success } = useSelector((state) => state.newMovie);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Seats, setSeats] = useState(0);
    const [images, setImages] = useState([]);
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
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Movie Created Successfully");
            window.location.href = "/admin/dashboard";
            dispatch({ type: NEW_MOVIE_RESET });
        }
    }, [dispatch, alert, error, success]);

    const createMovieSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("genre", category);
        myForm.set("seats", Seats);
        images.forEach((image) => {
            myForm.append("images", image);
          });
        dispatch(createMovie(myForm));
    };

    const createMoviesImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPreview([]);
    
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
                <MetaData title="Create Movie" />
                <div className='dashboard'>
                    <Sidebar />
                    <div className='newMovieContainer'>
                        <form
                            className='createMovieForm'
                            encType='multipart/form-data'
                            onSubmit={createMovieSubmitHandler}

                        >
                            <h1>Create Movie</h1>

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
                                <select onChange={(e) => setCategory(e.target.value)}>
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
                                    onChange={createMoviesImagesChange}
                                    multiple

                                />
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
                                Create
                            </Button>

                        </form>

                    </div>

                </div>
            </Fragment>
        );
    };

    export default NewMovie