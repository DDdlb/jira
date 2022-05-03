import { useProject } from 'utils/project';
import { useSetUrlSearchParam, useUrlQueryParam } from 'utils/url';

/**
 *  根据url管理projectModal
 */
export const useProjectModal = ()=>{
    // useUrlQueryParam 返回url中指定键的参数值
    const [{projectCreate}, setProjectCreate] = useUrlQueryParam([
        'projectCreate'
    ])
    // URl中editingProjectId表示编辑
    const [{editingProjectId}, setEditingProjectId] = useUrlQueryParam(['editingProjectId'])

    const {data: editingProject, isLoading} = useProject(Number(editingProjectId))

    const setUrlParams = useSetUrlSearchParam();

    const open = ()=> setProjectCreate({projectCreate: true})
    const close = ()=> {
        setUrlParams({editingProjectId: '', projectCreate: ''})
    }
    const startEdit = (id:number) => setEditingProjectId({editingProjectId: id})

    return {
        projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
        open,
        close,
        startEdit,
        editingProject,
        isLoading
    }
}