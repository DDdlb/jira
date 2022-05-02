import { Popover, Typography, List, Divider, Button } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Project } from "screen/project-list/list";
import { projectListActions } from "screen/project-list/project-list.slice";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";


export const ProjectPopover = ()=>{
    const dispatch = useDispatch()

    const client = useHttp()
    const { run, data:projects} = useAsync<Project[]>()
    const fetchProject = ()=>client(['projects', {}])
    useEffect(()=>{
        run(fetchProject(), {
            retry: fetchProject
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const pinnedProjects = projects?.filter(project=>project.pin)
    const content = <div>
        <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
        <List>
            {
                pinnedProjects?.map(project=><List.Item>
                    <List.Item.Meta title={project.name} />
                </List.Item>)
            }
        </List>
        <Divider style={{margin: 0}} />
        <Button type={'link'} onClick={()=>dispatch(projectListActions.openProjectModal())}>创建项目</Button>
    </div>
    return <Popover placement={"bottom"} content={content}>
        项目
    </Popover>
}