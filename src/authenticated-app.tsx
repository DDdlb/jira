import { ProjectList } from "screen/project-list"
import { Dropdown, Menu } from "antd"
import { useAuth } from "context/auth-context"
import styled from "@emotion/styled"
import {Row} from 'components/lib'
import logo from 'assets/logo192.png'
import { Routes, Route, Navigate } from 'react-router'
import { BrowserRouter as Router } from "react-router-dom"
import { ProjectScreen } from "screen/project"
import { resetRoute } from "utils"
import { useState } from "react"
import { ProjectModal } from "screen/project-list/project-modal"
import { ProjectPopover } from "components/project-popover"


export const AuthenticatedApp = ()=>{
    const [projectModalOpen, setProjectModalOpen] = useState(false)
    return <div>
        <PageHeader setProjectModalOpen={setProjectModalOpen} />
        <Main>
            <Router>
                <Routes>
                    <Route path={'/projects'} element={<ProjectList setProjectModalOpen={setProjectModalOpen} />} />
                    <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
                    <Route path={'*'} element={<Navigate to={'/projects'} />}></Route>
                </Routes>
            </Router>
            
        </Main>
        <ProjectModal projectModalOpen={projectModalOpen} onClose={()=>setProjectModalOpen(false)} ></ProjectModal>
    </div>
}

// AuthenticatedApp运用了 PageHeader,但是PageHeader还未定义？
// PageHeader为temporal dead zone(暂时性死区)
const PageHeader = (props:{setProjectModalOpen: (isOpen: boolean)=>void})=>{
    const { user, logout } = useAuth()
    return <Header between={true}>
    <HeaderLeft gap={true}>
        {/* <Button type={'link'} onClick={resetRoute}> */}
        <Logo onClick={resetRoute} /> 

        <ProjectPopover setProjectModalOpen={props.setProjectModalOpen}></ProjectPopover>
        <h2>管理</h2>
    </HeaderLeft>
    <HeaderRight>
        <Dropdown overlay={<Menu>
            <Menu.Item key={'logout'}>
                {/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/} 
                <a onClick={logout}>登出</a>
            </Menu.Item>
        </Menu>}>
            {/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
            <a onClick={e=> e.preventDefault()}>Hi, {user?.name}</a>
        </Dropdown>
    </HeaderRight>
</Header>
}

const Header = styled(Row)`
    height: 6rem;
    width: 100%;
    line-height: 6rem;
`
const HeaderLeft = styled(Row)`
cursor:pointer;
`;

const Logo = styled.h2`
    width: 5rem;
    background: url(${logo}) no-repeat center;
    background-size: 3rem;
`


const HeaderRight = styled.div``
const Main = styled.main`
    height: calc(100vh - 6rem)
`