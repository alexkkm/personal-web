import { useState } from 'react'
import { Menu, Form, Container } from 'semantic-ui-react'

const SigninPage = () => {
    const [selectedRegister, setSelectedRegister] = useState("login")

    return (
        <Container>
            <Menu widths={2}>
                <Menu.Item active={selectedRegister === "login"} onClick={setSelectedRegister("login")}>Login</Menu.Item>
                <Menu.Item active={selectedRegister === 'signin'} onClick={setSelectedRegister("signin")}>Register</Menu.Item>
            </Menu>
            <Form>
                <Form.Input></Form.Input>
            </Form>
        </Container>
    )
}

export default SigninPage