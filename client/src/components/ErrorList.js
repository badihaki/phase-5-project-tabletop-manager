import React from "react";

function ErrorList({ errors }){

    function Error({ error}){
        
        return(
            <li>
                {error}
            </li>
        )
    }

    const errorList = ()=>{
        if(errors === null || errors === undefined){
            return (<div></div>)
        }
        else{
            // console.log(errors)
            const compiledErrorsArray = []
            for (const error in errors) {
                // console.log(error);
                // if (Object.hasOwnProperty.call(errors, error)) {
                //     const errorMessage = errors[error];
                //     return errorMessage.forEach(message => {
                //         // debugger;
                //         return <Error errorName={error} errorContents={message} />                        
                //     });
                // }
                if(errors.hasOwnProperty(error)) {
                    // console.log(`${error} : ${errors[error]}`);
                    compiledErrorsArray.push(`${error} : ${errors[error]}`);
                }
            }
            return compiledErrorsArray.map(err=>{
                return <Error key={err} error={err} />
            })

            // end else
            }
        }
    
    return(
        <div>
            <ul>
                {errorList()}
            </ul>
        </div>
    )
}

export default ErrorList;