import React, { Fragment, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import './MovieList.css'
import { useSelector,useDispatch } from 'react-redux';
import {
    clearErrors,
    getAdminMovie,
    deleteMovie,

} from  "../../actions/movieAction";

import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from './Sidebar';
import { DELETE_MOVIE_RESET } from '../../constants/movieConstant';

const MovieList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const {error,movies} = useSelector((state)=>state.movies);

    const {error:deleteError,isDeleted} = useSelector((state)=>state.movie)

    const deleteMovieHandler = (id) =>{
        dispatch(deleteMovie(id));
    };

    useEffect(()=>{

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if(isDeleted){
            alert.success("Movie Deleted Sucessfully");
            window.location.href="/admin/dashboard";
            dispatch({type:DELETE_MOVIE_RESET});
        }

        dispatch(getAdminMovie());
    },[dispatch,alert,error,deleteError,isDeleted]);

    const columns =[
        {field:"id",headerName:"Movie ID",minWidth:200,flex:0.5},
        {field:"name",headerName : "Movie Name",minWidth:350,flex:1},
        {field:"seats",headerName:"Seats",type:"number",minWidth:150,flex:0.3},
        {field:"price",headerName:"Price",type:"number",minWidth:270,flex:0.5},
        {field:"actions",headerName:"Action",type:"number",minWidth:150,flex:0.3,sortable:false,
        renderCell:(params)=>{
            return(
                <Fragment>
                <Link to={`/admin/movie/${params.getValue(params.id,"id")}`}>
                <EditIcon/>
                </Link>
                <Button onClick={()=>deleteMovieHandler(params.getValue(params.id,"id"))}>
                    <DeleteIcon/>
                </Button>
                </Fragment>
            );

        },
    }
    ];

    const rows=[];

    movies && 
        movies.forEach((item,index) => {
            rows.push({
                
                id:item._id,
                seats:item.seats,
                price:item.price,
                name:item.name,
            });
        });
  return (
    <Fragment>
        <MetaData title="{'ALL MOVIES -Admin'}"/>
        <div className='dashboard'>
            <Sidebar/>
            <div className='movieListContainer'>

                <h1 id="movieListHeading">ALL MOVIES</h1>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='movieListTable'
                    autoHeight

                />
            </div>

        </div>
    </Fragment>
  )
}

export default MovieList