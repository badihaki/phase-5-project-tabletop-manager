import React from "react";

function SignUpLogIn(){
    return(
        <div>
            <form>
                <h3>Sign j Up</h3>
                <br />
                Name
                <br />
                Email
                <br />
                Password
            </form>
            <br />
            <p>-OR-</p>
            <form>
                <h3>Log In</h3>
                <br />
                Email
                <br />
                Password
            </form>
        </div>
    )
}

export default SignUpLogIn;