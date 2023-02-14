import React, { useContext, useState } from "react";
import { CharactersContext } from "./context components/CharactersContext";
import { UserContext } from "./context components/UserContext";
import SignUpLogIn from "./SignUpLogIn";

function Characters(){
    const { user } = useContext(UserContext);
    const { characters, setCharacters } = useContext(CharactersContext)
    
    function UpdateForm( {toon} ){
        const [ updateForm, setUpdateForm ] = useState({
            "level": toon.level,
            "history":toon.history,
            "stats":toon.stats
        })

        function handleUpdateFormChange(e){
            const key = e.target.name;
            const value = e.target.value;
            const newForm = {...updateForm};
            newForm[key] = value;
            setUpdateForm(newForm);
        }
        function handleUpdateFormSubmit(e){
            e.preventDefault();
            fetch(`/characters/${toon.id}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateForm)
            }).then(r=>{
                if(r.ok){
                    r.json().then(data=>{
                        const newCharacterList = characters.map(character=>{
                            if(character.id == data.id){
                                return character = data;
                            }
                            else return character;
                        })
                        setCharacters(newCharacterList);
                    })
                }
                else{
                    r.json().then(data=>{
                        console.log(data);
                    })
                }
            })
        }
        return(
            <form onSubmit={handleUpdateFormSubmit}>
                Level: <input type={"number"} name={"level"} value={updateForm.level} onChange={handleUpdateFormChange} />
                <br />
                Stats: <input type={"text"} name={"stats"} value={updateForm.stats} onChange={handleUpdateFormChange} />
                <br />
                History: <input type={"text"} name={"history"} value={updateForm.history} onChange={handleUpdateFormChange} />
                <br />
                <button type="submit">Update</button>
            </form>
        )
    }

    function CharacterSheet({ toon }){
        const [showForm, setShowForm] = useState(false);
        return(
            <li>
                {toon.name} : <button name={toon.id} onClick={handleDeleteButton}>Delete</button>
                <ul>
                    <li>Level: {toon.level}</li>
                    <li>{toon.stats}</li>
                    <li>{toon.history}</li>
                </ul>
                <button onClick={ ()=>setShowForm(!showForm) }>Update Character Sheet</button>
                <br />
                { showForm? <UpdateForm toon={toon} /> : "" }
                <br />
                <br />
            </li>
        )
    }

    const characterList = ()=>{
        if(characters != null){
            return characters.map(toon=>{
                    if(toon != null){
                        return <CharacterSheet key={toon.id} toon={toon} />
                    }
                    else{
                        console.error("WARNING no characters detected.")
                        console.log("Printing out character list...");
                        console.log(characters);
                    }
                })
        }
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

    function CharacterCreationForm(){
        const [ newCharacterForm, setNewCharacterForm ] = useState({
            "name":"",
            "history":"",
            "stats":""
        })

        
        function handleNewCharacterFormChange(e){
            const key = e.target.name;
            const value = e.target.value;
            const newForm = {...newCharacterForm}
            newForm[key] = value;
            setNewCharacterForm(newForm);
        }


        function handleSubmit(e){
            e.preventDefault();
            fetch("/api/characters",{
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(newCharacterForm)
            }).then(
                r=>{
                    if(r.ok || r.created){
                        r.json().then(data=>{
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

        return(
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
        )
    }

    function CharacterComponent(){

        return(
            <div>
                <h2>{user.name}'s Character Page</h2>
                List of characters:
                <ul>
                    {characterList()}
                </ul>
                <div>
                    Create new characters below:
                    <br />
                    <CharacterCreationForm />
                </div>
            </div>
        )
    }

    return(
        user? <CharacterComponent /> : <SignUpLogIn />
    )
}

export default Characters;