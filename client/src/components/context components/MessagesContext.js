import React, { useState } from "react";

const MessagesContext = React.createContext();

function MessagesProvider( { children } ){

    const [ messages, setMessages ] = useState(null);

    return(
        <MessagesContext.Provider value={ { messages, setMessages } }>
            { children }
        </MessagesContext.Provider>
    )

}

export { MessagesContext, MessagesProvider };