import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage(){
    const error = useRouteError();
    console.error(error);

    return(
        <div>
            <h1>Where are you going!?</h1>
            <p>
                An unexpected error occurred and you've wandered where nothing exists, young traveller.
            </p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

export default ErrorPage;