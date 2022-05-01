import { useState } from "react"
import { LoginScreen } from "./login"
import { RegisterScreen } from "./register"
import styled from "@emotion/styled"
// import { Container } from "react-dom"
import { Card, Divider } from "antd"
import logo from 'assets/logo192.png'
import { useDocumentTitle } from "utils"

export const UnauthenticatedApp = ()=>{
    const [register, setRegister] = useState(false)
    useDocumentTitle('请登录注册')
    return <Container>
        <Header />
        
        <ShadowCard>
            <Title>Welcome To Jira</Title>
            {
            register? <RegisterScreen /> : <LoginScreen />
        }
        <Divider />
        <a onClick={()=>setRegister(!register)}>{register?'已经有账号了？直接登录':'没有账号？注册新账号'}</a>
        </ShadowCard>
        
    </Container>
}

// emotion， CSS-in-JS
// React 组件用strled(Components)
const Header = styled.header`
    background: url(${logo}) no-repeat center;
    width: 100%;
    padding: 5rem 0;
    background-size: 8rem;
`

const Title = styled.h2`
    margin-bottom: 2.4rem;
    color: rgb(94, 108, 132)
`

const ShadowCard = styled(Card)`
    width: 40rem;
    min-height: 56rem;
    padding: 3.2rem 4rem;
    border-radius: 0.3rem;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
    text-align: center;
    margin: auto;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-item: center;
    min-height: 100vh;
    justify-content: center;
    margin:auto;
`