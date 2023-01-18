import React, { useContext, useState } from "react";
import { CharactersContext } from "./context components/CharactersContext";
import { UserContext } from "./context components/UserContext";

function Characters(){
    const { user } = useContext(UserContext);
    const { characters, setCharacters } = useContext(CharactersContext)

    const [ newCharacterForm, setNewCharacterForm ] = useState({
        "name":"",
        "history":"",
        "stats":""
    })
    
    const characterList = characters.map(toon=>{
        // console.log(toon);
        return(
            <li key={toon.id}>
                {toon.name} : <button name={toon.id} onClick={handleDeleteButton}>Delete</button>
                <ul>
                    <li>Level: {toon.level}</li>
                    <li>{toon.stats}</li>
                    <li>{toon.history}</li>
                </ul>
            </li>
        )
    })

    function handleSubmit(e){
        e.preventDefault();
        fetch("/characters",{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newCharacterForm)
        }).then(
            r=>{
                if(r.ok || r.created){
                    r.json().then(data=>{
                        console.log(data);
                        setCharacters([...characters, data]);
                    })
                }
            }
        )
        setNewCharacterForm({
            "name":"",
            "history":"",
            "stats":"",
            "level":1
        })
    }
    
    function handleDeleteButton(e){
        const toonID = e.target.name;
        fetch(`characters/${toonID}`,{
            method: "DELETE",
        }).then(()=>{
            const newToonList = characters.filter(toon=>{
                return toon.id != toonID
            })
            setCharacters(newToonList);
        })
    }

    function handleNewCharacterFormChange(e){
        const key = e.target.name;
        const value = e.target.value;
        const newForm = {...newCharacterForm}
        newForm[key] = value;
        setNewCharacterForm(newForm);
    }

    return(
        <div>
            <h2>{user.name}'s Character Page</h2>
            List of characters:
            <ul>
                {characterList}
            </ul>
            <div>
                Create new characters below:
                <br />
                <form onSubmit={handleSubmit}>
                    Character name:
                    <br />
                    <input type={"text"} name={"name"} value={newCharacterForm.name} onChange={handleNewCharacterFormChange} />
                    <br />
                    Character History
                    <br />
                    <input type={"text"} name={"history"} value={newCharacterForm.history} onChange={handleNewCharacterFormChange} />
                    <br />
                    Character Stats
                    <br />
                    <input type={"text"} name={"stats"} value={newCharacterForm.stats} onChange={handleNewCharacterFormChange} />
                    <br />
                    <br />
                    <button type="submit">Create Character</button>
                    <br />
                </form>
            </div>
        </div>
    )
}

export default Characters;