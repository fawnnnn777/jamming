import React, { useState } from "react";
import styles from './styles/searchbar.module.css'

function SearchBar(){
    const [userInput, setUserInput] = useState('')

    const handleChange = (e) =>{
        setUserInput(e.target.value)
    }

    return (
        <>
            <form className={styles.searchForm}>
                <input onChange={handleChange} value={userInput} type="text"></input>
                <button type="submit"> <span class="material-symbols-outlined">
search
</span></button>
            </form>
        </>
    )
}

export default SearchBar