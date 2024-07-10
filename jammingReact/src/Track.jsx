import React from "react";

function Track({name, artist, album}){
    const handleSave = (e)=>{
        console.log(`save`)
    }

    return (
        <>
        <div>
            <h2>{name}</h2>
            <p>{artist} - {album}</p>
            <button onClick={handleSave}><span class="material-symbols-outlined">favorite</span></button>
        </div>
        </>
    )
}

export default Track