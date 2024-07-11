import React, { useState } from "react";
import Track from "./Track";


function SearchResults(props){

    return (
        <>
        <h1> Results </h1>
        {props.songs.map((song)=>{
            return(
                <Track addToPlaylist={props.addToPlaylist} id={song.id} key={song.name} name={song.name} artist={song.artist} album={song.album}/>
            )
        })}
        </>
    )
}

export default SearchResults