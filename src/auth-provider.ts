// 使用firebase 不用开发本文件
import { User } from 'screen/project-list/search-panel'

const localStorageKey = '__author_provider_token__'

const apiUrl = process.env.REACT_APP_API_URL

export const getToken = ()=> window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({user}: {user: User})=>{
    window.localStorage.setItem(localStorageKey, user.token || '')
    return user
}

export const login = (data: {username:string, password:string})=>{
    return fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async (res)=>{
        if(res.ok){
            return handleUserResponse(await res.json())
        }else{
            return Promise.reject(data)
        }
    })
}

export const register = (data: {username:string, password:string})=>{
    return fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async (res)=>{
        if(res.ok){
            return handleUserResponse(await res.json())
        }else{
            return Promise.reject(data)
        }
    })
}

// 使用async后返回promise
export const logout = async () => window.localStorage.removeItem(localStorageKey)