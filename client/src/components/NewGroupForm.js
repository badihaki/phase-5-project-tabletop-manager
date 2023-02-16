import React, { useContext, useState } from "react";
import { GroupsContext } from "./context components/GroupsContext";
import { UserContext } from "./context components/UserContext";
import ErrorList from "./ErrorList";

function GroupForm(){

    const { user } = useContext(UserContext);
    const { groups, setGroups } = useContext(GroupsContext);

    const [ submitSuccess, setSubmitSuccess ] = useState([""]);
    const [ errorMessages, setErrorsMessages ] = useState(null);

    const pageMessages = submitSuccess.map(message=>{
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
                    setSubmitSuccess(["Group created"]);
                })
            }
            else{
                r.json().then(data=>{
                    console.log(data);
                    setErrorsMessages(data.errors);
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
            <ErrorList errors={errorMessages} />
        </form>
    )
}

export default GroupForm;