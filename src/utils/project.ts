import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Project } from 'screen/project-list/list';
import { useHttp } from './http';
/**
 *  列表编辑请求hook
 */
// react hook 只能放在顶层，不能放在回调函数中
export const useEditProject = ()=>{
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation((params: Partial<Project>)=> client([`projects/${params.id}`, {
        method: 'PATCH',
        data: params
    }]), {
        onSuccess: ()=> queryClient.invalidateQueries('projects')
    })
}

export const useAddProject = ()=>{
    const client = useHttp()
    const QueryClient = useQueryClient()
    // Partial<Project> 表示可以取project类型中的一部分
    return useMutation((params: Partial<Project>)=>client([`projects`,{
        data: params,
        method: 'POST'
    }]),{
        onSuccess: ()=>QueryClient.invalidateQueries('projects')
    })
}
// 获取project数据列表
export const useProjects = (param?: Partial<Project>) =>{
    const client = useHttp()
    return useQuery<Project[], Error>(['projects', param],()=>client(['projects', {data: param}]))
}

// 获取单个组件详情
export const useProject = (id?:number) =>{
    const client = useHttp()
    return useQuery<Project>(
        // {id}表示id改变时重新请求
        ['project', {id}], 
        ()=>client([`projects/${id}`]),
        {
            // id 不为undifined时执行
            enabled: Boolean(id)
        }
    )
}