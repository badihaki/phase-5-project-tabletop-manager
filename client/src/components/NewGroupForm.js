import React, { useContext, useState } from "react";
import { UserContext } from "./context components/UserContext";

function GroupForm(){

    const { user } = useContext(UserContext);

    const [ form, setForm ] = useState({
        "game_master_id":user.id,
        "name":"",
        "game_day":"Sunday",
        "game":""
    });

    function handleFormChange(input){
        const key = input.target.name;
        const value = input.target.value;
        const newForm = {...form};
        newForm[key] = value;
        setForm(newForm);
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(form);
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
        </form>
    )
}

export default GroupForm;