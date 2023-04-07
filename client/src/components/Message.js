import React, { useState } from "react";
import MessageThread from "../MessageThread";

function Message({ message }){
    const [ showThread, setShowThread ] = useState(false)
    return(
        <li key={message.id} className={"message"}>
            <span style={{ fontWeight:"bold" }}>{message.user.name}</span> says:
            <p>
                {message.content}
                <br />
                <button onClick={ ()=>{setShowThread(!showThread)} }>
                    {showThread? "Close Thread" : "Open Thread" }
                </button>
            </p>
            { showThread ? <MessageThread message={message} /> : "" }
        </li>
    )
}

export default Message;