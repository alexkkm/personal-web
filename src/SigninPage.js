import { useState } from 'react'
import { Menu, Form, Container } from 'semantic-ui-react'

const SigninPage = () => {
    const [selectedRegister, setSelectedRegister] = useState("login")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <Container>
            {password}
            <Menu widths={2}>
                <Menu.Item active={selectedRegister === "login"} onClick={() => setSelectedRegister("login")}>Login</Menu.Item>
                <Menu.Item active={selectedRegister === 'register'} onClick={() => setSelectedRegister("register")}>Register</Menu.Item>
            </Menu>
            <Form>
                <Form.Input label="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='please input email'></Form.Input>
                <Form.Input label="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='please input password'></Form.Input>
                <Form.Button>
                    {selectedRegister === 'login' && 'Login'}   {/* if (selectedRegister is 'login', then return true) is true, then this line becomes {'Login'} */}
                    {selectedRegister === 'register' && 'Register'}
                </Form.Button>
            </Form>
        </Container>
    )
}

export default SigninPage