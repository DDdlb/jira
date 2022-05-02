import { useCallback, useReducer } from 'react';

/**
 *  用来记录操作历史
 * @param initialPresent 
 */

const UNDO = 'UNDO'
const REDO = 'REDO'
const SET = 'SET'
const RESET = 'RESET'

type State<T> = {
    past: T[],
    present: T,
    future: T[]
}

type Action<T> = {newPresent?: T, type: typeof UNDO | typeof REDO | typeof SET | typeof RESET}

const undoReducer = <T>(state: State<T>, action: Action<T>) =>{
    const {past, present, future} = state
    const {newPresent} = action
    switch(action.type){
        case UNDO: {
            if(past.length === 0)return state

            const previous = past[past.length - 1]
            const newPast = past.slice(0, past.length - 1)

            return {
                past: newPast,
                present: previous,
                future: [present, ...future]
            }
        }

        case REDO: {
            if(future.length === 0) return state

            const next = future[0]
            const newFuture = future.slice(1)

            return {
                past: [...past, present],
                present: next,
                future: newFuture
            }
        }

        case SET: {
            if(newPresent === present) return state

            return {
                past: [...past, present],
                present: newPresent,
                future: []
            }
        }

        case RESET: {
            return {
                past: [],
                present: newPresent,
                future: []
            }
        }
    }
}
export const useUndo = <T>(initialPresent: T)=>{
    // // past 用来记录历史操作的合集（后退）
    // const [past, setPast] = useState<T[]>([])

    // const [present, setPresent] = useState(initialPresent)
    // // 未来操作(前进)
    // const [future, setFuture] = useState<T[]>([])

    // 状态合并
    // const [state, setState] = useState<{
    //     past: T[],
    //     present: T,
    //     future: T[]
    // }>({
    //     past: [],
    //     present: initialPresent,
    //     future: []
    // })

    // reducer实现
    const [state, dispatch] = useReducer(undoReducer, {
        past: [],
        present: initialPresent,
        future: []
    } as State<T>)
    // 是否可后退
    const canUndo = state.past.length !== 0
    // 是否可前进
    const canRedo = state.future.length !== 0
    // 后退操作  使用useCallback防止重复渲染死循环
    const undo = useCallback(()=> dispatch({type: UNDO}), [])
    // 前进操作
    const redo = useCallback(()=>dispatch({type: REDO}), [])
    // 改变当前值
    const set = useCallback((newPresent: T) => dispatch({newPresent, type: SET}), [])
    // 重制历史
    const reset = useCallback((newPresent: T)=> dispatch({newPresent, type: RESET}), [])

    return [
        state,
        {set, reset, undo, redo, canRedo, canUndo}
    ]
}