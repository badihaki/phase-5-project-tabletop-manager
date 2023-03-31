import React from "react";
import { Link } from "react-router-dom";

function Message({ message }){
    return(
        <li key={message.id} className={"message"}>
            <span style={{ fontWeight:"bold" }}>{message.user.name}</span> says:
            <p>
                {message.content}
                <br />
                <Link to={`/messages/${message.id}`}>
                    <button>
                        Go to thread
                    </button>
                </Link>
            </p>
        </li>
    )
}

export default Message;