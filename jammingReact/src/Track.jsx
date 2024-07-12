import React from "react";

function Track(props){

    return (
        <>
        <div>
            <h2>{props.name}</h2>
            <p>{props.artist} - {props.album}</p>
            <button onClick={() => props.addToPlaylist(props.id)}><span class="material-symbols-outlined">favorite</span></button>
            <h1>{props.id}</h1>
        </div>
        </>
    )
}

export default Track