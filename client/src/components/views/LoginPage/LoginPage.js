import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { Form, Button, Input } from 'antd';
function LoginPage(props) {

    const dispatch = useDispatch();

    const [inputData, setInputData] = useState({
        Email: '',
        Password: ''
    })

    const { Email, Password } = inputData;


    const onDataHandleChange = (e) => {
        const { value, name } = e.target
        setInputData({
            ...inputData,
            [name]: value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        let body = {
            email: Email,
            password: Password
        }
        dispatch(loginUser(body)) //loginUser 액션에 데이터보냄
            .then(response => {
                if (response.payload.loginSuccess) {
                    props.history.push('/')  //react 에서 페이지 이동시킬떄 props.history
                } else {
                    alert('Error')
                }
            })
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <Form style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Email</label>
                <Input type="email" name="Email" value={Email} onChange={onDataHandleChange} />
                <label>Password</label>
                <Input type="password" name="Password" value={Password} onChange={onDataHandleChange} />

                <br />
                <Button htmlType="submit" type="primary" onClick={onSubmitHandler}>
                    Login
                </Button>
            </Form>
        </div>
    )
}
export default withRouter(LoginPage)