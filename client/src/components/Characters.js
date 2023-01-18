import React, { useContext, useState } from "react";
import { CharactersContext } from "./context components/CharactersContext";
import { UserContext } from "./context components/UserContext";
import SignUpLogIn from "./SignUpLogIn";

function Characters(){
    const { user } = useContext(UserContext);
    const { characters, setCharacters } = useContext(CharactersContext)

    const [ newCharacterForm, setNewCharacterForm ] = useState({
        "name":"",
        "history":"",
        "stats":""
    })
    
    function UpdateForm( {toon} ){
        const [ form, setForm ] = useState({
            "level": toon.level,
            "history":toon.history,
            "stats":toon.stats
        })

        function handleFormChange(e){
            const key = e.target.name;
            const value = e.target.value;
            const newForm = {...form};
            newForm[key] = value;
            setForm(newForm);
        }
        function handleFormSubmit(e){
            e.preventDefault();
            fetch(`/characters/${toon.id}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            }).then(r=>{
                if(r.ok){
                    r.json().then(data=>{
                        const newCharacterList = [...characters];
                        newCharacterList.forEach(char=>{
                            if(char.id == data.id){
                                return char = data;
                            }
                        })
                        // newCharacterList.map(char=>{
                        //     if(char.id == data.id){
                        //         return char = data;
                        //     }
                        // })
                        console.log(newCharacterList);
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
            <form onSubmit={handleFormSubmit}>
                Level: <input type={"number"} name={"level"} value={form.level} onChange={handleFormChange} />
                <br />
                Stats: <input type={"text"} name={"stats"} value={form.stats} onChange={handleFormChange} />
                <br />
                History: <input type={"text"} name={"history"} value={form.history} onChange={handleFormChange} />
                <br />
                <button type="submit">Update</button>
            </form>
        )
    }

    function CharacterSheet({ toon }){
        const [showForm, setShowForm] = useState(false);
        return(
            <li key={toon.id}>
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

    const characterList = characters.map(toon=>{
        return <CharacterSheet key={toon.id} toon={toon} />
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

    function CharacterComponent(){
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

    return(
        user? <CharacterComponent /> : <SignUpLogIn />
    )
}

export default Characters;