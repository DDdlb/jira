/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react"

/**
 * 
 * @param {*} val 
 * @returns 去除val == 0的情况
 */
export const isFalsy = (val: unknown) => val === 0 ? false : !val

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''
/**
 * 
 * @param {*} obj 
 * @returns obj去除空对象后的值，不改变原始对象
 */
// object广义对象，包含函数，json对象等，建值对用[key:string]:unknown表示
export const cleanObject = (obj: {[key: string]: unknown})=>{
    const result = {...obj}
    Object.keys(result).forEach(key=>{
        const val = result[key]
        if(isVoid(val)){
            delete result[key]
        }
    })
    return result
}
/**
 * @param {*} callback 
 * | useMount(()=>{}),  onMounted函数
 */
export const useMount = (callback: ()=>void) => {
    useEffect(()=>{
        callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

/**
 *  包装state变量，防止变量一直变化，一直执行回调函数
 *  实现变量经过delay时间后执行回调函数，value转化为debouncedValue
 * @param {*} value 监听变量
 * @param {*} delay 延迟时间
 * @returns 包装后变量
 */
// ?:表示可有可无
export const useDebounce = <T>(value: T, delay?: number): T=>{
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(()=>{
        // value 变化后， 经过delay后在改变debouncedValue
        const timeout = setTimeout(()=> setDebouncedValue(value), delay)
        // 上一个useEffect后清理上一次的useEffect
        return () => clearTimeout(timeout)
    }, [value, delay])
    return debouncedValue
}
// 修改标题hook， keepOnUnmounted表示组件卸载时标题是否继续保持
export const useDocumentTitle = (title: string, keepOnUnmounted: boolean = true)=>{
    const oldTitle = useRef(document.title).current
    // useRef在组件生命周期内保持不变
    useEffect(()=>{
        document.title = title
    }, [title])
    useEffect(()=>{
        return ()=>{
            if(!keepOnUnmounted){
                document.title = oldTitle
            }
        }
    }, [])
}

//重置路由
export const resetRoute = ()=> window.location.href = window.location.origin

/**
 *  返回组件的挂载状态， 如果还没有挂载或者已经卸载，返回false，否则返回true
 */
export const useMountedRef = () =>{
    const mountedRef = useRef(false)

    useEffect(()=>{
        // 挂载时执行
        mountedRef.current = true
        // 卸载时之行
        return ()=>{
            mountedRef.current = false
        }
    })

    return mountedRef
}