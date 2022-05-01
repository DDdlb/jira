import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

/**
 *  返回url中指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[])=>{
    const [searchParams, setSearchParam] = useSearchParams()
    // obj 返回引用，导致每次obj都在变化，产生无限循环
    // t obj = {}
    // // eslint-disable-next-line array-callback-return
    // keys.map(item => {
    //     Object.assign(obj, {[item]: searchParams.get(item)} || '')
    // })
    // return [obj as {[key in K]: string}, setSearchParam] as constle

    // 非组件的对象不能放到依赖中，会无限循环
    return [
        useMemo(
        ()=> {
            let obj = {}
            // eslint-disable-next-line array-callback-return
            keys.map(item => {
                Object.assign(obj, {[item]: searchParams.get(item)} || '')
            })
            return obj as {[key in K]: string}
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [searchParams]
        ),
        setSearchParam
    ] as const
}