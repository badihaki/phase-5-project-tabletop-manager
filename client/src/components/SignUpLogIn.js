import React, { useState } from "react";

function SignUpLogIn(){
    const [ signUpForm, setSignUpForm ] = useState({
        "name": "",
        "email": "",
        "password": "",
        "password_confirmation": ""
    })
    const [ logInForm, setLogInForm ] = useState({
        "email": "",
        "password": ""
    })
    

    function handleSignUpForm(e){
        const targetName = e.target.name;
        const targetValue = e.target.value;
        const newForm = {...signUpForm}
        newForm[targetName] = targetValue
        setSignUpForm(newForm)
    }
    function submitSignUpForm(submitEvent){
        submitEvent.preventDefault();
        console.log(signUpForm);
        fetch('/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signUpForm)
        }).then(r => {
            if(r.ok){
                r.json().then(data=>{
                    console.log(data);
                })
            }
        })
    }

    function handleLogInForm(e){
        const targetName = e.target.name;
        const targetValue = e.target.value;
        const newForm = {...logInForm}
        newForm[targetName] = targetValue
        setLogInForm(newForm)
    }
    function submitLogInForm(submitEvent){
        submitEvent.preventDefault();
        console.log(logInForm);
    }

    return(
        <div>
            <form onSubmit={submitSignUpForm}>
                <h3>Sign Up</h3>
                <br />
                Name
                <br />
                <input type={"text"} name={"name"} onChange={handleSignUpForm} value={signUpForm.name} />
                <br />
                Email
                <br />
                <input type={"email"} name={"email"} onChange={handleSignUpForm} value={signUpForm.email} />
                <br />
                Password
                <br />
                <input type={"password"} name={"password"} onChange={handleSignUpForm} value={signUpForm.password} />
                <br />
                Confirm Password
                <br />
                <input type={"password"} name={"password_confirmation"} onChange={handleSignUpForm} value={signUpForm.password_confirmation} />
                <br />
                <button type="submit" >Sign Up</button>
            </form>
            <br />
            <p>-OR-</p>
            <form onSubmit={submitLogInForm}>
                <h3>Log In</h3>
                <br />
                Email
                <br />
                <input type={"email"} name={"email"} onChange={handleLogInForm} value={logInForm.email} />
                <br />
                Password
                <br />
                <input type={"password"} name={"password"} onChange={handleLogInForm} value={logInForm.password} />
                <br />
                <button type="submit" >Log In</button>
            </form>
        </div>
    )
}

export default SignUpLogIn;