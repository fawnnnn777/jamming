import React, { useState } from "react";
import Track from "./Track";

function Playlist(props){
const [userInput, setUserInput] = useState('')

const handleChange = (e) =>{
    setUserInput(e.target.value)
}

    return(
        <>  
        <h1>Create A New Playlist</h1>
        <form onSubmit={props.savePlaylist}>
            <input onChange={handleChange} value={userInput} type="text" placeholder="Playlist Name"></input>
            <button type="submit">Add To My Spotify</button>
        </form>
        </>
    )
}

export default Playlist