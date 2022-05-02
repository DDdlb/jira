import { useState, useCallback } from 'react';

/**
 *  用来记录操作历史
 * @param initialPresent 
 */
export const useUndo = <T>(initialPresent: T)=>{
    // // past 用来记录历史操作的合集（后退）
    // const [past, setPast] = useState<T[]>([])

    // const [present, setPresent] = useState(initialPresent)
    // // 未来操作(前进)
    // const [future, setFuture] = useState<T[]>([])

    // 状态合并
    const [state, setState] = useState<{
        past: T[],
        present: T,
        future: T[]
    }>({
        past: [],
        present: initialPresent,
        future: []
    })
    // 是否可后退
    const canUndo = state.past.length !== 0
    // 是否可前进
    const canRedo = state.future.length !== 0
    // 后退操作  使用useCallback防止重复渲染死循环
    const undo = useCallback(()=>{
        setState(currentState=> {
            const {past, present, future} = currentState
            if(past.length === 0)return currentState

            const previous = past[past.length - 1]
            const newPast = past.slice(0, past.length - 1)

            return {
                past: newPast,
                present: previous,
                future: [present, ...future]
            }
        })
    }, [])
    // 前进操作
    const redo = useCallback(()=>{
        setState(currentState=>{
            const {past, present, future} = currentState
            if(future.length === 0) return currentState

            const next = future[0]
            const newFuture = future.slice(1)

            return {
                past: [...past, present],
                present: next,
                future: newFuture
            }
        })
    }, [])
    // 改变当前值
    const set = useCallback((newPresent: T) => {
        setState(currentState=>{
            const {past, present} = currentState
            if(newPresent === present) return currentState

            return {
                past: [...past, present],
                present: newPresent,
                future: []
            }
        }) 
    }, [])
    // 重制历史
    const reset = useCallback((newPresent: T)=>{
        setState(currentState=>{
            return {
                past: [],
                present: newPresent,
                future: []
            }
        })
    }, [])

    return [
        state,
        {set, reset, undo, redo, canRedo, canUndo}
    ]
}