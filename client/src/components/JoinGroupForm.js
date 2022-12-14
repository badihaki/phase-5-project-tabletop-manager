import React from "react";

function JoinGroupForm(){
    return(
        <form>
            Experience Level<span> : </span>
            <select>
                <option value={"New Player"}>New Player</option>
                <option value={"Journeyman"}>Journeyman</option>
                <option value={"Veteran"}>Veteran</option>
                <option value={"Master"}>Master</option>
            </select>
            <br />
            <button type="submit">Submit</button>
        </form>
    )
}

export default JoinGroupForm;