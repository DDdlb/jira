// import { register, logout } from './../auth-provider';
import React, { ReactNode, useState } from "react"
import { User } from "screen/project-list/search-panel"
import * as auth from 'auth-provider'
import { http } from "utils/http"
import { useMount } from "utils"

interface AuthForm {
    username: string;
    password: string;
}
/**
 * 初始化User
 */
const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if(token){
        const data = await http('me', {token})
        user = data.user
    }
    return user
}

const AuthContext = React.createContext<{
    user: User | null,
    register: (form: AuthForm)=>Promise<void>,
    login: (form: AuthForm)=>Promise<void>,
    logout: ()=>Promise<void>
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User|null>(null)
    // user=>setUser(user)等价与setUser
    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(()=>setUser(null))

    // 初始化user
    useMount(()=>{
        bootstrapUser().then(setUser)
    })

    // https://stackoverflow.com/questions/63811601/react-said-can-not-find-namespace-in-creation-of-context
    // .ts 后缀报错 con't find namespace AuthContext
    return <AuthContext.Provider children={children} value={{user, login, register, logout}} />
}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if(!context){
        throw new Error('useAuth必须在authProvide中使用')
    }
    return context
}