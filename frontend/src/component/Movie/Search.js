import React, { useState, Fragment } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";


const Search = () => {
  const [keyword, setKeyword] = useState("");
  
  
  // use window.location.href="" here 

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      window.location.href=`/movies/${keyword}`;
     
    } else {
      window.location.href=`/movies`;
    }
  };

  return (
    <Fragment>
      <MetaData title="Search A Movie -- BookMyShow" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Movie ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
