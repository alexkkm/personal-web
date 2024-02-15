import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import auth from "./utils/firebase"

const SigninPage = () => {
    const [selectedRegister, setSelectedRegister] = useState("login")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const BackToHome = () => {
        useNavigate("/");
    }

    function onSubmit() {
        if (selectedRegister === "register") {
            console.log("Start Register")
            createUserWithEmailAndPassword(auth, email, password).then(() => {
                console.log("registered")
                BackToHome()
            })
        } else if (selectedRegister === "login") {
            console.log("Start Login")
            signInWithEmailAndPassword(auth, email, password).then(() => {
                console.log("signined")
                BackToHome()
            })
        }
    }

    return (
        <div>
            <button title="Login" onClick={() => setSelectedRegister("login")}></button>
            <button title="Register" onClick={() => setSelectedRegister("register")}></button>

            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='please input email'></input>
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='please input password'></input>
            <button title={selectedRegister} onClick={onSubmit()}></button>
        </div>

    )
}

export default SigninPage