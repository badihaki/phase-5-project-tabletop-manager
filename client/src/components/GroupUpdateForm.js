import React, { useState } from "react";

function GroupUpdateForm( {updateFunction, group} ){

    const [ form, setForm ] = useState({
        "id":group.id,
        "name":group.name,
        "game":group.game,
        "game_day":group.game_day
    })
    
    function handleSubmit(e){
        e.preventDefault();
        updateFunction(form);
    }

    function handleFormChange(input){
        const key = input.target.name;
        const value = input.target.value;
        const newForm = {...form};
        newForm[key] = value;
        setForm(newForm);
    }

    return(
        <form onSubmit={handleSubmit}>
            Change Name: <input type={'text'} name={"name"} value={form.name} onChange={handleFormChange} />
            <br />
            Change Game: <input type={'text'} name={"game"} value={form.game} onChange={handleFormChange} />
            <br />
            Change Gameday:
            <select name="game_day" value={form.game_day} onChange={handleFormChange} >
                <option value={"Sunday"}>Sunday</option>
                <option value={"Monday"}>Monday</option>
                <option value={"Tuesday"}>Tuesday</option>
                <option value={"Wednesday"}>Wednesday</option>
                <option value={"Thursday"}>Thursday</option>
                <option value={"Friday"}>Friday</option>
                <option value={"Saturday"}>Saturday</option>
            </select>
            <br />
            <button type="submit">Submit</button>
        </form>
    )
}

export default GroupUpdateForm;