import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode} style={{ display: "flex", alignItems: "right" }}>
      <Menu.Item key="mail">
        <a href="/">홈</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu