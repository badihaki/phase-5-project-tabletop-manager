import React from "react";
import { Link, useRouteError } from "react-router-dom";

function ErrorPage(){
    const error = useRouteError();
    console.error(error);

    return(
        <div>
            <h1>Where are you going!?</h1>
            <p>
                An unexpected error occurred and you've wandered where nothing exists, young traveller.
            </p>
            <h3>Errors</h3>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <br />
            <Link to={'/home'}>Go back to safety</Link>
        </div>
    );
}

export default ErrorPage;