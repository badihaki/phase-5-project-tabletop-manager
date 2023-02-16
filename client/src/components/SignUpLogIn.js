import React, { useContext, useState } from "react";
import { UserContext } from "./context components/UserContext";
import ErrorList from "./ErrorList";

function SignUpLogIn(){

    const { setUser } = useContext(UserContext)

    const [ signUpForm, setSignUpForm ] = useState({
        "name": "",
        "email": "",
        "password": "",
        "password_confirmation": ""
    })
    const [ signUpErrors, setSignUpErrors] = useState(null);
    const [ logInErrors, setLogInErrors ] = useState(null);
    const [ logInForm, setLogInForm ] = useState({
        "email": "",
        "password": ""
    })
    const [ successfulSignup, setSuccessfulSignup ] = useState(false);

    // Sign Up
    function handleSignUpForm(e){
        const targetName = e.target.name;
        const targetValue = e.target.value;
        const newForm = {...signUpForm}
        newForm[targetName] = targetValue
        setSignUpForm(newForm)
    }
    function submitSignUpForm(submitEvent){
        submitEvent.preventDefault();
        fetch('/api/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signUpForm)
        }).then(r => {
            if(r.ok){
                r.json().then( ()=>{
                    setSignUpErrors(null);
                    setSuccessfulSignup(true);
                    clearSignUpForm();
                })
            }
            else{
                r.json().then(data=>{
                    const errorArray = ['UH-OH!! We ran into a problem!!'];
                    for (const key in data.errors) {
                        for (const message of data.errors[key]) {
                            errorArray.push(message)
                            clearSignUpForm();
                        }
                    }
                    setSignUpErrors(data.errors);
                })
            }
        })
    }

    function clearSignUpForm(){
        setSignUpForm({
            "name": "",
            "email": "",
            "password": "",
            "password_confirmation": ""
        })
    }

    // Log In
    function handleLogInForm(e){
        const targetName = e.target.name;
        const targetValue = e.target.value;
        const newForm = {...logInForm}
        newForm[targetName] = targetValue
        setLogInForm(newForm)
    }
    function submitLogInForm(submitEvent){
        submitEvent.preventDefault();
        fetch('/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(logInForm)
        }).then(r=>{
            if(r.ok){
                r.json().then(data=>{
                    setUser(data);
                })
            }
            else{
                r.json().then(data=>{
                    setLogInErrors(data);
                })
            }
        })
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
                <br />
                {successfulSignup ? <div>Signed Up Successfully.<br />Please log in below :</div> : ""}
                <ErrorList errors={signUpErrors} />
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
                <ErrorList errors={logInErrors} />
            </form>
        </div>
    )
}

export default SignUpLogIn;