import React from "react";
import styles from './styles/track.module.css'

function Track(props){

    return (
        <>
        <div className={styles.trackDiv}>
            <div className={styles.trackInfo}>
            <h2>{props.name}</h2>
            <p>{props.artist} - {props.album}</p>
            </div>
            {props.onPlaylist == true ?  <button onClick={() => props.removeFromPlaylist(props.id)}><span class="material-symbols-outlined">close</span></button> 
            : 
            <button onClick={() => props.addToPlaylist(props.id)}><span class="material-symbols-outlined">favorite</span></button>}
        </div>
        </>
    )
}

export default Track