import React, { useState } from "react";
import Track from "./Track";
import styles from './styles/results.module.css'


function SearchResults(props){

    return (
        <>
        <div className={styles.resultsDiv}>
        <h1 style={{color: "white"}}> Results </h1>
        {props.songs.map((song)=>{
            return(
                <Track addToPlaylist={props.addToPlaylist} id={song.id} uri={song.uri}key={song.name} name={song.name} artist={song.artist} album={song.album}></Track>
            )
        })}
        </div>
        </>
    )
}

export default SearchResults