/**
 *  错误边界组件
 */
import React, { ReactNode } from "react";

type FallbackRender = (props:{error: Error|null})=>React.ReactElement
// 第一个参数 props，第二个state
export class ErrorBoundary extends React.Component<{children:ReactNode, fallbackRender:FallbackRender}, {error: Error | null}>{
    state = {error: null}

    // 子组件出现错误时调用，error传给state
    static getDerivedStateFromError(error:Error){
        return {error}
    }

    // eslint-disable-next-line react/require-render-return
    render(){
        const {error} = this.state
        const {fallbackRender, children} = this.props
        if(error){
            return fallbackRender({error})
        }
        return children
    }
}