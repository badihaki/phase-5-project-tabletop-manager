import React, { useContext, useState } from "react";
import { GroupsContext } from "./context components/GroupsContext";
import { UserContext } from "./context components/UserContext";

function GroupForm(){

    const { user } = useContext(UserContext);
    const { groups, setGroups } = useContext(GroupsContext);

    const [ messages, setMessages ] = useState([""]);

    const pageMessages = messages.map(message=>{
        return(
            <div key={message}>
                {message}
            </div>
        )
    })

    const [ form, setForm ] = useState({
        "game_master_id":user.id,
        "name":"",
        "game_day":"Sunday",
        "game":""
    });

    function clearForm(){
        setForm({
        "game_master_id":user.id,
        "name":"",
        "game_day":"Sunday",
        "game":""
        })
    }

    function handleFormChange(input){
        const key = input.target.name;
        const value = input.target.value;
        const newForm = {...form};
        newForm[key] = value;
        setForm(newForm);
    }

    function handleSubmit(e){
        e.preventDefault();
        fetch(`/api/groups`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        }).then(r=>{
            if(r.ok){
                r.json().then(data=>{
                    const newGroup = [...groups, data];
                    setGroups(newGroup);
                    setMessages(["Group created"]);
                })
            }
            else{
                r.json().then(data=>{
                    console.log(data);
                    const errorArray = ['UH-OH!! We ran into a problem!!'];
                    for (const key in data.errors) {
                        for (const message of data.errors[key]) {
                            errorArray.push(message)
                        }
                    }
                    setMessages(errorArray);
                })
            }
        })
        clearForm();
    }

    function GameDaySelect(){
        return(
            <select name="game_day" value={form.game_day} onChange={handleFormChange} >
                <option value={"Sunday"}>Sunday</option>
                <option value={"Monday"}>Monday</option>
                <option value={"Tuesday"}>Tuesday</option>
                <option value={"Wednesday"}>Wednesday</option>
                <option value={"Thursday"}>Thursday</option>
                <option value={"Friday"}>Friday</option>
                <option value={"Saturday"}>Saturday</option>
            </select>
        )
    }

    return(
        <form onSubmit={handleSubmit}>
            Name
            <br />
            <input name="name" value={form.name} onChange={handleFormChange} />
            <br />
            Game
            <br />
            <input name="game" value={form.game} onChange={handleFormChange} />
            <br />
            GameDay
            <br />
            <GameDaySelect />
            <br />
            <button type="submit">Submit</button>
            <br />
            {pageMessages}
        </form>
    )
}

export default GroupForm;