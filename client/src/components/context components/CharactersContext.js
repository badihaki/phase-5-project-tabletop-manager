import React, { useState } from "react";

const CharactersContext = React.createContext();

function CharactersProvider( { children } ){

    const [ characters, setCharacters ] = useState(null);

    return(
        <CharactersContext.Provider value={ { characters, setCharacters } }>
            { children }
        </CharactersContext.Provider>
    )

}

export { CharactersContext, CharactersProvider };