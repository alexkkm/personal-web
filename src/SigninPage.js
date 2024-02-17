import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Menu, Form, Container } from 'semantic-ui-react'

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import auth from "./utils/firebase"

const SigninPage = () => {
    const [selectedRegister, setSelectedRegister] = useState("login")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const BackToHome = () => {
        navigate("/")
    }

    const onSubmit = () => {
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
        <Container>
            <Menu widths={2}>
                <Menu.Item active={selectedRegister === "login"} onClick={() => setSelectedRegister("login")}>Login</Menu.Item>
                <Menu.Item active={selectedRegister === 'register'} onClick={() => setSelectedRegister("register")}>Register</Menu.Item>
            </Menu>
            <Form>
                <Form.Input label="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='please input email'></Form.Input>
                <Form.Input label="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='please input password'></Form.Input>
                <Form.Button onClick={() => onSubmit()}>
                    {selectedRegister === 'login' && 'Login'}   {/* if (selectedRegister is 'login', then return true) is true, then this line becomes {'Login'} */}
                    {selectedRegister === 'register' && 'Register'}
                </Form.Button>
            </Form>
        </Container>

    )
}

export default SigninPage