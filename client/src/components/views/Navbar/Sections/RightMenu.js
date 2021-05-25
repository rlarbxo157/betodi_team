/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Avatar } from 'antd';
import axios from 'axios';
// import { USER_SERVER } from '../../../Config';
import { withRouter, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import {
  HomeOutlined,
  WechatOutlined,
  FormOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';


function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get('/api/users/logout').then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">로그인</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">회원가입</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="chat" href="/messenger" icon={<WechatOutlined style={{ fontSize: '30px' }} />}>
          <a href="/messenger">채팅</a>
        </Menu.Item>
        <Menu.Item key="upload" icon={<FormOutlined style={{ fontSize: '20px' }} />}>
          <a href="/product/upload">게시물 작성</a>
        </Menu.Item>
        <Menu.SubMenu title={<Avatar size="large" icon={<UserOutlined style={{ fontSize: '20px' }} />} />}>
          <Menu.Item key="mypage" icon={<UserOutlined />}>
            마이페이지
            <Link to="/mypage"></Link>
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logoutHandler}>로그아웃</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

