import { Project } from 'screen/project-list/list';
import { useHttp } from './http';
import { useAsync } from './use-async';
/**
 *  列表编辑请求hook
 */
// react hook 只能放在顶层，不能放在回调函数中
export const useEditProject = ()=>{
    const {run, ...asyncRes} = useAsync()
    const client = useHttp()
    // Partial<Project> 表示可以取project类型中的一部分
    const mutate = (params: Partial<Project>)=>{
        return run(client([`projects/${params.id}`,{
            data: params,
            method: 'PATCH'
        }]))
    }

    return {
        mutate,
        ...asyncRes
    }
}

export const useAddProject = ()=>{
    const {run, ...asyncRes} = useAsync()
    const client = useHttp()
    // Partial<Project> 表示可以取project类型中的一部分
    const mutate = (params: Partial<Project>)=>{
        return run(client([`project/${params.id}`,{
            data: params,
            method: 'POST'
        }]))
    }
    return {
        mutate,
        ...asyncRes
    }
}