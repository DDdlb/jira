import { Button, Drawer } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectListActions, selectProjectModalOpen } from "./project-list.slice";

export const ProjectModal = ()=>{
    const dispatch = useDispatch()
    // 读取root state
    const projectModalOpen = useSelector(selectProjectModalOpen)
    return <Drawer width={'100%'} visible={projectModalOpen} onClose={()=>dispatch(projectListActions.closeProjectModal())} >
        <h1>Project Modal</h1>
        <Button onClick={()=>dispatch(projectListActions.closeProjectModal())}>关闭</Button>
    </Drawer>
}