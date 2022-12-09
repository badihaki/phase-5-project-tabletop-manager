import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./context components/UserContext";

function NavigationBar(){
    const { user } = useContext(UserContext)
    return(
        <div className="sidebar">
            <ul>
                <li>
                    <Link to={"/home"}> Home </Link>
                </li>
                <li>
                    <Link to={"/user"}> User </Link>
                </li>
                <li>
                    <Link to={"/auth"}> SignUp </Link>
                </li>
            </ul>
            {user? <button>Logout</button> : ""}
        </div>
    )
}

export default NavigationBar;