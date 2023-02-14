import React from "react";

function ErrorList({ errors }){

    function Error({ errorName, errorContents }){
        return(
            <li>
                {errorName} : {errorContents}
            </li>
        )
    }

    const errorList = ()=>{
        if(errors === null || errors === undefined){
            return (<div></div>)
        }
        else{
            for ( const [ key, value ] of Object.entries(errors) ) {
                return <Error errorName={key} errorContents={value} />
            }
        }
    }
    
    return(
        <div>
            <ul>
                <ul>
                    {errorList()}
                </ul>
            </ul>
        </div>
    )
}

export default ErrorList;