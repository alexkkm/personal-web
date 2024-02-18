// react package
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// firebase package
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // now firebase suugest to import the functions directly form the library, instead of import the object Auth() as oldest version of firebase

// the "auth" is used for the functions from package "firebase/auth"
import auth from "./utils/firebase"

// Component of demonstration of firebase authentication functions
const AuthenticationArea = () => {
    // switch from "login" and "register"
    const [mode, setMode] = useState("login")
    // parameters for saving the input "email" and "password"
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // hook "useNavigate()" can only be used in functional componenet, but not in function, so we need to assign it into a constant
    const navigate = useNavigate();

    // Function for "submit" button 
    const onSubmit = () => {
        // if it is in "register" state, then create the account according to "email" and "password"
        if (mode === "register") {
            console.log("Start Register")
            // directly use the function "createUserWithEmailAndPassword()", while getting the "auth" from "firebase.js". So no need run the firebase.js directly when npm run
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    // if the "createUserWithEmailAndPassword()" success, navigate to "HomePage"
                    console.log("registered")
                    navigate("/")
                })
                .catch((error) => {
                    // if the "createUserWithEmailAndPassword()" fail, alert the error message
                    alert(error.code);  // "error.code" is provided in the field of "code" when error occurs
                })
        }
        // if it is in "login" state, then try login with the "email" and "password" provided
        else if (mode === "login") {
            console.log("Start Login")
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    // if the "signInWithEmailAndPassword()" success, navigate to "HomePage"
                    console.log("signined");
                    navigate("/");
                })
                .catch((error) => {
                    // if the "signInWithEmailAndPassword()" fail, alert the error message
                    alert(error.code);
                })
        }
    }

    return (
        <div>
            <button onClick={() => setMode("login")}>Login</button>
            <button onClick={() => setMode("register")}>Register</button>

            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='please input email'></input>
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='please input password'></input>
            <button
                onClick={
                    () => {
                        onSubmit(); {/** "onClick" must be defined as ()=>{}, or otherwise will be error, since "onSubmit()"" is the output of onSubmit() function while ()=>onSubmit() is to run the "onClick" function directly */ }
                    }}>{mode}</button>
        </div >

    )
}

// Page of tutorials of firebase functions
const FirebasePage = () => {
    return (
        <div>
            <AuthenticationArea />
        </div>
    );
}

export default FirebasePage