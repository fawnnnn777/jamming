import React, { useState } from "react";
import Track from "./Track";

function Playlist(){
const [userInput, setUserInput] = useState('')

const handleChange = (e) =>{
    setUserInput(e.target.value)
}

    return(
        <>  
        <h1>Create A New Playlist</h1>
            <input onChange={handleChange} value={userInput} type="text" placeholder="Playlist Name"></input>
            <button>Add To My Spotify</button>
        </>
    )
}

export default Playlist