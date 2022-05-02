/* eslint-disable react-hooks/exhaustive-deps */
import { List, Project } from "./list"
import { SearchPanel } from "./search-panel"
import { useState, useEffect } from "react"
import React from "react"
import { cleanObject, useDebounce, useDocumentTitle, useMount } from "utils"
import { useHttp } from "utils/http"
import styled from "@emotion/styled"
import { Typography } from "antd"
import { useAsync } from "utils/use-async"
import { useUrlQueryParam } from "utils/url"
import { Row } from "components/lib"
// npm start, 从.env.development读取，npm run build 从.env中读取

export const ProjectList = (props: {projectButton: JSX.Element, editButton: JSX.Element})=>{
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    const debouncedParam = useDebounce(param, 500)
    // const [list, setList] = useState([])
    const [users, setUsers] = useState([])
    const client = useHttp()
    const { run, isLoading, error, data:list, retry} = useAsync<Project[]>()

    const fetchProject = ()=>client(['projects', {data:cleanObject(debouncedParam)}])
    // 当param变化时执行, 变化后执行
    useEffect(()=>{
        run(fetchProject(), {
            retry: fetchProject
        })
    }, [debouncedParam])
    // 第二个参数为空，初始化时执行一次
    useMount(()=>{
        client(['users']).then(setUsers)
    })

    // console.log(useUrlQueryParam(['name']));
    
    useDocumentTitle('项目列表')
    return <Container>
        <Row between={true}>
            <h1>项目列表</h1>
            {props.projectButton}
        </Row>
        <SearchPanel param={param} setParam={setParam} users={users} />
        {error? <Typography.Text type={"danger"}>{error.message}</Typography.Text>:null}
        <List loading={isLoading} dataSource={list || []} users={users} refresh={retry} projectButton={props.editButton} />
    </Container>
}

ProjectList.whyDidYouRender = false

const Container = styled.div`
padding: 3.2rem;
`