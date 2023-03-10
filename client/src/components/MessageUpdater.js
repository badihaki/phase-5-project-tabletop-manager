import React, { useContext, useState } from "react";
import { MessagesContext } from "./context components/MessagesContext";

function MessageUpdater(){
    const { messages, setMessages } = useContext(MessagesContext);
    const [ disabledButton, setDisableButton ] = useState(false);

    function handleButtonClick(e){
        e.preventDefault();
        setDisableButton(true);
        fetch("/api/group_messages/").then(r=>r.json()).then(
            data => {
                console.log(data)
                setMessages(data);
            }
        ).then(()=>setDisableButton(false))
    }

    return(
        <button type={"button"} disabled={disabledButton} onClick={handleButtonClick}>Update Messages</button>
    )
}

export default MessageUpdater;