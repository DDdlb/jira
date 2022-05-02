import { useUrlQueryParam } from 'utils/url';

/**
 *  根据url管理projectModal
 */
export const useProjectModal = ()=>{
    // useUrlQueryParam 返回url中指定键的参数值
    const [{projectCreate}, setProjectCreate] = useUrlQueryParam([
        'projectCreate'
    ])

    const open = ()=> setProjectCreate({projectCreate: true})
    const close = ()=> setProjectCreate({projectCreate: undefined})

    return {
        projectModalOpen: projectCreate === 'true',
        open,
        close
    }
}