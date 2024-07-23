import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";
import Track from "./Track";
import './App.css'
import { getResults } from "./spotifyAccess";

function App(){

  const [songs, setSongs] = useState([]);

  const submitResult = async (e, query) => {
    e.preventDefault();
    console.log(query);
    const results = await getResults(query);
    setSongs(results)
  };

  const [Personal, setPersonal] = useState([])

  const addToPlaylist = (id) =>{
      if(Personal.includes(id)){
          console.log('not possible, song alredy on your list')
          console.log(Personal)

      }else{
          setPersonal([
            ...Personal,
            id
          ])
          console.log(id)
          console.log(Personal)
          console.log("added")
      }
  } 

  const removeFromPlaylist = (id) =>{
    if(Personal.includes(id)){
      setPersonal(prev => prev.filter(song => song !=id))
      console.log(`${id} removed`)
    }
  }

  const savePlaylist = (e) =>{
    e.preventDefault()
    const songsArray = []
    Personal.map((song)=>{
      let s = songs.find(s => s.id === song)
      songsArray.push(s.uri)
    })
  }

  return(
    <>
    <h1 className="title"> Spotify Jamming </h1>
      <SearchBar submitResult={submitResult}/>
      <SearchResults songs={songs} addToPlaylist={addToPlaylist}/>
      <Playlist savePlaylist={savePlaylist} songs={Personal}/>
      {Personal.map((song)=>{
        let s = songs.find(s => s.id === song)
        console.log(s)
        return <Track removeFromPlaylist={removeFromPlaylist} onPlaylist={true} id={s.id} key={s.name} name={s.name} artist={s.artist} album={s.album}></Track>
      })}
    </>
  )
}

export default App