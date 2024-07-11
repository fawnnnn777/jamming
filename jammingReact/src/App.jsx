import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";

import { songs } from "./songs";


function App(){

  const [Personal, setPersonal] = useState([])

  const addToPlaylist = (id) =>{
      if(Personal.includes(id)){
          console.log('not possible, song alredy on your list')
      }else{
          setPersonal((prev)=>{
              return [id, ...prev]
          })
      }
      console.log(Personal)
  } 

  
  return(
    <>
    <h1> Spotify Jamming </h1>
      <SearchBar/>
      <SearchResults songs={songs} addToPlaylist={addToPlaylist}/>
      <Playlist songs={Personal}/>
    </>
  )
}

export default App