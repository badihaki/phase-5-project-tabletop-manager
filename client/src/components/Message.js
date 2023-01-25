import React from "react";

function Message({ message }){
    return(
        <li key={message.id}>
            - - - - - -
            <br />
            <span style={{ fontWeight:"bold" }}>{message.user.name}</span> says:
            <p>
                {message.content}
            </p>
            - - - - - -
            <br />
            <br />
        </li>
    )
}

export default Message;