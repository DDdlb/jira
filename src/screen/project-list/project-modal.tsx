import styled from "@emotion/styled";
import { Button, Drawer, Form, Input, Select, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import { useAddProject, useEditProject } from "utils/project";
import { useUsers } from "utils/use-users";
import { useProjectModal } from "./util";

export const ProjectModal = ()=>{
    const {projectModalOpen, close, editingProject, isLoading} = useProjectModal()
    const {data: users} = useUsers()
    const title = editingProject?'编辑项目':'创建项目'
    const useMutateProject = editingProject? useEditProject: useAddProject 
    const {mutateAsync, isLoading: mutateLoading} = useMutateProject()
    const [form] = useForm()
    const onFinish = (values: any)=>{
        mutateAsync({...editingProject, ...values}).then(()=>{
            form.resetFields()
            close()
        })
    }

    useEffect(()=>{
        form.setFieldsValue(editingProject)
    }, [editingProject, form])
    return <Drawer forceRender={true} width={'100%'} visible={projectModalOpen} onClose={close} >
        <Container>
        {
            isLoading ? <Spin size={'large'}/>: <>
                <h1>{title}</h1>
                <Form form={form} layout={'vertical'} style={{width: '40rem'}} onFinish={onFinish}>
                    <Form.Item label={'名称'} name={'name'} rules={[{required:true, message:'请输入项目名称'}]}>
                        <Input placeholder="请输入项目名称" />
                    </Form.Item>
                    <Form.Item label={'部门'} name={'organization'} rules={[{required:true, message:'请输入部门名称'}]}>
                        <Input placeholder="请输入部门名称" />
                    </Form.Item>

                    <Form.Item label={'负责人'} name={'personId'} >
                        <Select value={editingProject?editingProject.id:0}>
                            {
                                users?.map(user => 
                                    <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>
                                )
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button loading={mutateLoading} type={'primary'} htmlType={'submit'}>提交</Button>
                    </Form.Item>
                </Form>
            </>
        }
        </Container>
    </Drawer>
}

const Container = styled.div`
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`