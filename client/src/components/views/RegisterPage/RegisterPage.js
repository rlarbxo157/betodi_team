import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
function RegisterPage(props) {

    const dispatch = useDispatch();

    const [inputData, setInputData] = useState({
        Email: '',
        Name: '',
        Password: '',
        ConfirmPassword: ''
    })

    const { Email, Name, Password, ConfirmPassword } = inputData;

    const onDataHandleChange = (e) => {
        const { value, name } = e.target
        setInputData({
            ...inputData,
            [name]: value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert('비밀번호가 다릅니다.')
        }

        let body = {
            email: Email,
            name: Name,
            password: Password
        }

        dispatch(registerUser(body)) //loginUser 액션에 데이터보냄
            .then(response => {
                if (response.payload.success) {
                    props.history.push('/login')
                } else {
                    alert('error')
                }
            })
    }



    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <Form style={{ display: 'flex', flexDirection: 'column' }} >
                <label>Email</label>
                <Input type="email" name="Email" value={Email} onChange={onDataHandleChange} />

                <label>Name</label>
                <Input type="text" name="Name" value={Name} onChange={onDataHandleChange} />

                <label>Password</label>
                <Input type="password" name="Password" value={Password} onChange={onDataHandleChange} />

                <label>Confirm Password</label>
                <Input type="password" name="ConfirmPassword" value={ConfirmPassword} onChange={onDataHandleChange} />
                <br />
                <Button type="primary" htmlType="submit" onClick={onSubmitHandler}>
                    Sign_Up
                </Button>
            </Form>
        </div>
    )
}
export default withRouter(RegisterPage)