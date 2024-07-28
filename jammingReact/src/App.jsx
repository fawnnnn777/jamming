import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";
import Track from "./Track";
import './App.css'
import { getResults } from "./spotifyAccess";

function App(){
  const [songs, setSongs] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const params = getHashParams();
    if (params.access_token) {
      setAccessToken(params.access_token);
    }
  }, []);

  const getHashParams = () => {
    const hashParams = {};
    let e;
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };

  const submitResult = async (e, query) => {
    e.preventDefault();
    console.log(query);
    const results = await getResults(query);
    setSongs(results)
    console.log(songs)
  };

  const [Personal, setPersonal] = useState([])

  const handleLogin = () => {
    const clientId = 'e748752dc75a45fea9adcd26f3ee6ed0';
    const redirect_uri = 'http://localhost:5173/';
    const scopes = 'playlist-modify-private playlist-modify-public user-read-private'; // Include the scopes you need
    const url = 'https://accounts.spotify.com/authorize' +
      '?response_type=token' +
      '&client_id=' + encodeURIComponent(clientId) +
      '&redirect_uri=' + encodeURIComponent(redirect_uri) +
      '&scope=' + encodeURIComponent(scopes);
  
    window.location = url;
  };

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
      let s = songs.find(s => s.uri === song)
      songsArray.push(s.uri)
    })
  }
  

  let params = getHashParams()

  console.log(accessToken)

  async function getUser(){
    let userid;
    const response = await fetch('https://api.spotify.com/v1/me',{
      method: "GET",
      headers:{
        'Authorization': "Bearer " + accessToken
    }
    })
    const info = await response.json()
    userid = info.id
    return userid
  }

  console.log(Personal)


  const createPlaylist = async (name, uris) => {
    try {
      const userId = await getUser();
      if (!userId) return;

      const createResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: "POST",
        headers: {
          'Authorization': "Bearer " + accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": name,
          "description": "This is a new playlist",
          "public": false
        })
      });

      if (!createResponse.ok) {
        throw new Error(`HTTP error! Status: ${createResponse.status}`);
      }

      const playlistData = await createResponse.json();
      const playlistId = playlistData.id;

      const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: "POST",
        headers: {
          'Authorization': "Bearer " + accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uris: uris
        })
      });

      if (!addTracksResponse.ok) {
        throw new Error(`HTTP error! Status: ${addTracksResponse.status}`);
      }

      const addTracksResult = await addTracksResponse.json();
      console.log(addTracksResult);

    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };
  
  return(
    <>
    <h1 className="title"> Spotify Jamming </h1>
    <button onClick={handleLogin}>Login</button>
      <SearchBar submitResult={submitResult}/>
      <SearchResults songs={songs} addToPlaylist={addToPlaylist}/>
      <Playlist submitPlaylist={createPlaylist} savePlaylist={savePlaylist} songs={Personal}/>
      {Personal.map((song)=>{
        let s = songs.find(s => s.uri === song)
        console.log(s)
        return <Track removeFromPlaylist={removeFromPlaylist} onPlaylist={true} id={s.uri} key={s.name} name={s.name} uri={s.uri} artist={s.artist} album={s.album}></Track>
      })}
    </>
  )
}

export default App