import { useAuth } from "context/auth-context"
import { FormEvent } from "react"
import {Form, Input, Button} from 'antd'

export const RegisterScreen = () => {

    const {user, register} = useAuth()
    // HTMLFormElement类型dom包含event.target.elements, 不用HTMLFormElement默认为Element，普通dom对象
    const handleSubmit = (value: {username:string, password:string}) =>{
        // 原始form，不用antd
        // event.preventDefault()
        // const username = (event.currentTarget.elements[0] as HTMLFormElement).value
        // const password = (event.currentTarget.elements[1] as HTMLFormElement).value
        // login({username, password})
        register(value)
        
        // console.log(context);
    }

    return <Form onFinish={handleSubmit}>
        <Form.Item name={'username'} rules={[{required: true, message: '请输入用户名'}]}>
            <Input placeholder="用户名" type="text" id="username" />
        </Form.Item>

        <Form.Item name={'password'} rules={[{required:true, message: '请输入密码'}]}>
            <Input placeholder="密码" type="text" id="password" />
        </Form.Item>
        <Form.Item>
            <Button type={'primary'} htmlType={"submit"}>注册</Button>
        </Form.Item>
        
    </Form>
}