import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Menu, Form, Container, Message } from 'semantic-ui-react'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import auth from "./utils/firebase"

const SigninPage = () => {
    const [selectedRegister, setSelectedRegister] = useState("login")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    const BackToHome = () => {
        navigate("/")
    }

    const onSubmit = () => {
        // when button is clicked, activate is loading
        setIsLoading(true);

        if (selectedRegister === "register") {
            console.log("Start Register")
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    console.log("registered")
                    BackToHome()
                    setIsLoading(false)
                })
                .catch((error) => {
                    setErrorMessage(error.code);
                    setIsLoading(false)
                })
        } else if (selectedRegister === "login") {
            console.log("Start Login")
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    console.log("signined");
                    BackToHome();
                    setIsLoading(false);
                })
                .catch((error) => {
                    setErrorMessage(error.code);
                    setIsLoading(false);
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
                {errorMessage && <Message negative /* "negative" make errorMessage be red color*/>{errorMessage}</Message>}
                <Form.Button onClick={() => onSubmit()} loading={isLoading}>
                    {selectedRegister === 'login' && 'Login'}   {/* if (selectedRegister is 'login', then return true) is true, then this line becomes {'Login'} */}
                    {selectedRegister === 'register' && 'Register'}
                </Form.Button>
            </Form>
        </Container>

    )
}

export default SigninPage