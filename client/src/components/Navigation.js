import React from "react";
import { Link } from "react-router-dom";

function NavigationBar(){
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
        </div>
    )
}

export default NavigationBar;