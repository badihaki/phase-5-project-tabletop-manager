import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./context components/UserContext";

function NavigationBar(){
    const { user, setUser } = useContext(UserContext)

    function handleLogoutButton(){
        fetch('/logout', {
            method: "DELETE"
        }).then(setUser(null));
    }

    return(
        <div className="sidebar">
            <ul>
                <li>
                    <Link to={"/home"}> Home </Link>
                </li>
                <li>
                    <Link to={"/dashboard"}> User </Link>
                </li>
                <li>
                    <Link to={"/groups"}> Groups </Link>
                </li>
                {user? <li><Link to={"/characters"}> Characters </Link></li> : ""}
            </ul>
            {user? <button onClick={handleLogoutButton} >Logout</button> : ""}
        </div>
    )
}

export default NavigationBar;