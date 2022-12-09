import React, { useContext } from "react";
import { UserContext } from "./context components/UserContext";
import SignUpLogIn from "./SignUpLogIn";
import UserInfo from "./UserInfo";

function UserPage(){
    const { user } = useContext(UserContext);

    return(
        <div>
            { user? <UserInfo /> : <SignUpLogIn /> }
        </div>
    )
}

export default UserPage;