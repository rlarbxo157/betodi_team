import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
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
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" name="Email" value={Email} onChange={onDataHandleChange} />
                <label>Password</label>
                <input type="password" name="Password" value={Password} onChange={onDataHandleChange} />

                <br />
                <Button type="primary">
                    Login
                </Button>
            </form>
        </div>
    )
}
export default withRouter(LoginPage)