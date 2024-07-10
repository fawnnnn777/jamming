import React from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";

import { songs } from "./songs";


function App(){
  return(
    <>
    <h1> Spotify Jamming </h1>
      <SearchBar/>
      <SearchResults songs={songs}/>
      <Playlist/>
    </>
  )
}

export default App