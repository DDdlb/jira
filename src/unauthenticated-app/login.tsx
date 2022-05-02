import { useAuth } from "context/auth-context"
import { Form, Input, Button } from "antd"
import { useDispatch } from "react-redux"

// import { FormEvent } from "react"

export const LoginScreen = () => {
    const dispatch = useDispatch()
    const {login} = useAuth()
    // HTMLFormElement类型dom包含event.target.elements, 不用HTMLFormElement默认为Element，普通dom对象
    const handleSubmit = (value: {username:string, password:string}) =>{
        // 原始form，不用antd
        // event.preventDefault()
        // const username = (event.currentTarget.elements[0] as HTMLFormElement).value
        // const password = (event.currentTarget.elements[1] as HTMLFormElement).value
        // login({username, password})

        login(value)
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
            <Button type={'primary'} htmlType={"submit"}>登录</Button>
        </Form.Item>
        
    </Form>
}