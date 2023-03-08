import React from "react";
import { Link } from "react-router-dom";

function Message({ message }){
    return(
        <li key={message.id}>
            - - - - - -
            <br />
            <span style={{ fontWeight:"bold" }}>{message.user.name}</span> says:
            <p>
                {message.content}
                <br />
                <Link to={`/messages/${message.id}`}>Go to thread</Link>
            </p>
            - - - - - -
            <br />
            <br />
        </li>
    )
}

export default Message;