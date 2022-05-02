import React from "react"
import { User } from "./search-panel"
import { Button, Table, TableProps } from "antd"
import dayjs from "dayjs"
import { Link } from "react-router-dom"
import { Pin } from "components/pin"
import { useEditProject } from "utils/project"
import { useProjectModal } from "./util"
interface ListProps extends TableProps<Project>{
    users: User[],
    refresh?: ()=>void,
}

export interface Project{
    id: number;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
    created?: number;
}

export const List = ({users, ...props}: ListProps)=>{
    const {mutate} = useEditProject()
    const {open} = useProjectModal()
    // const pinProject = (id: number, pin: boolean) => mutate({id, pin})
    // 柯里化写法
    const pinProject = (id:number) => (pin: boolean) => mutate({id, pin}).then(props.refresh)
    return <Table columns={[
        {
            title: <Pin checked={true} disabled={true} />,
            render: (value, item)=>{
                return <Pin checked={item.pin} onCheckedChange={pinProject(item.id)} />
            }
        },
        {
            title: '名称',
            render: (value, item)=>{
                return <Link to={String(item.id)}>{item.name}</Link>
            }
            // dataIndex: 'name'
            
        },{
            title: '部门',
            dataIndex: 'organization'
        },{
            title: '负责人',
            render: (value, item)=>{
                return <span>
                    {users.find(user=> user.id === item.personId)?.name || '未知'}
                </span>
            }
        },{
            title: '创建时间',
            render: (value, item)=>{
                return <span>
                    {item.created? dayjs(item.created).format('YYYY-MM-DD'):'无'}
                </span>
            }
        },{
            title: '操作',
            render: (value, item)=>{
                return <span>
                    <Button size={'small'} onClick={open} style={{marginRight:'10px'}}>编辑</Button>
                    <Button danger size={'small'}>删除</Button>
                </span>
            }
        }
    ]}
    {...props}>
    </Table>
}