import React, { useState } from "react";

function SearchBar(){
    const [userInput, setUserInput] = useState('')

    const handleChange = (e) =>{
        setUserInput(e.target.value)
    }

    return (
        <>
            <form>
                <input onChange={handleChange} value={userInput} type="text"></input>
                <button type="submit"> <span class="material-symbols-outlined">
search
</span></button>
            </form>
        </>
    )
}

export default SearchBar