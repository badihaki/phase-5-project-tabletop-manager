import React, { useContext } from "react";
import { UserContext } from "./context components/UserContext";

function UserInfo(){
    const { user } = useContext(UserContext)

    return(
        <div>
            <h1>{user.name}</h1>
        </div>
    )
}

export default UserInfo;