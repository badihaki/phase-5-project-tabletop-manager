import React, { useContext } from "react";
import { UserContext } from "./context components/UserContext";

function Characters(){
    const { user } = useContext(UserContext);

    return(
        <div>
            <h1></h1>
        </div>
    )
}