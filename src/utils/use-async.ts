import { useMountedRef } from './index';
import { useCallback, useState } from 'react';
interface State<D>{
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success' // 异步操作未发生是idle，正在发生为loading，成功为success， 失败为error
}

const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}
// useState 传入函数，页面加载时会直接运行函数， 传入函数会被当作惰性初始化。
// 惰性初始化：
// const [state, setState] = useState(() => {
//   const initialState = someExpensiveComputation(props);
//   return initialState;
// });
// 使用useState保存函数需要两层函数
// const [call, setCall] = useState(()=>()=>{})
// 
// 还可以用useRef存储函数, useRef值变化，组件不会更新
export const useAsync = <D>(initialState?: State<D>)=>{
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })

    const mountedRef = useMountedRef()

    const [retry, setRetry] = useState(()=>()=>{})
    // 成功
    const setData = useCallback((data: D) => setState({
        data,
        stat: 'success',
        error: null
    }), [])
    // 失败
    const setError = (error: Error) =>setState({
        error,
        stat: 'error',
        data: null
    })
    // 用来触发异步请求, 防止run放到依赖中导致无限循环（每次创建的run视为不同函数）
    // const run = (promise: Promise<D>, runConfig?: {retry: ()=>Promise<D>}) =>{
    //     if(!promise || !promise.then){
    //         throw new Error('请传入Promise')
    //     }
    //     setState({
    //         ...state,
    //         stat: 'loading'
    //     })
    //     setRetry(()=>()=>{
    //         if(runConfig?.retry){
    //             run(runConfig?.retry(), runConfig)
    //         }
    //     })
    //     // 请求成功,返回请求数据
    //     return promise
    //         .then(data=>{
    //             if(mountedRef.current){
    //                 setData(data)
    //             }
    //             return data
    //         })
    //         .catch(error=>{
    //             setError(error)
    //             return error
    //         })
    //     // 
    // }

    // 使用 useCallBack 重写run
    const run = useCallback((promise: Promise<D>, runConfig?: {retry: ()=>Promise<D>}) =>{
            if(!promise || !promise.then){
                throw new Error('请传入Promise')
            }
            setState({
                ...state,
                stat: 'loading'
            })
            setRetry(()=>()=>{
                if(runConfig?.retry){
                    run(runConfig?.retry(), runConfig)
                }
            })
            // 请求成功,返回请求数据
            return promise
                .then(data=>{
                    if(mountedRef.current){
                        setData(data)
                    }
                    return data
                })
                .catch(error=>{
                    setError(error)
                    return error
                })
            // 
        }, [mountedRef, setData, state])
    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        setData,
        setError,
        run,
        retry,
        ...state
    }
}