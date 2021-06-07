import { Card, Layout, Statistic, Skeleton, PageHeader, Tag, message, Button, Row, Descriptions, Menu, Breadcrumb, Space, Divider } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./mypage.css";
import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;

export default function MyPage() {
    const [products, setProducts] = useState([]);
    let user = useSelector(state => state.user.userData);

    const getProducts = async () => {
        try {
            const res = await axios.get('/api/product/user/' + user._id);
            console.log(res);
            setProducts(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const toggleisSold = async (id) => {
        try {
            const update = await axios.put('/api/product/update/' + id);
            console.log(update);
            getProducts();
            message.success('판매 완료 처리되었습니다.');
            // message.success({ content: 'Loaded!', key, duration: 2 });
        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {

        getProducts();

    }, [user]);



    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <Layout className="site-layout">
                    {/* <Header className="site-layout-background" style={{ paddingLeft: 20 }}>마이 페이지</Header> */}
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>{user ? user.name : '...'}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {products && products.length > 0 ? products.map((product, index) => (
                                <PageHeader
                                    key={product._id}
                                    className="site-page-header"
                                    style={{ marginBottom: '15px', borderRadius: 20, borderWidth: '1.5px', borderStyle: 'solid' }}
                                    title={product.title}
                                    tags={!product.isSold ? <Tag color="blue">판매중</Tag> : <Tag color="red">판매완료</Tag>}
                                    extra={[
                                        <Link to={`/product/${product._id}`}>
                                            <Button key="2" size="large">상세페이지</Button>
                                        </Link>,
                                        !product.isSold ? <Button key="1" size="large" type="primary" onClick={() => toggleisSold(product._id)}>판매완료</Button> : ''
                                    ]}
                                >

                                    <Descriptions size="small" column={3}>
                                        <Descriptions.Item label="Description">{product.description}</Descriptions.Item>
                                        <Descriptions.Item label="Price">
                                            $ {product.price}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Creation Time">{product.createdAt}</Descriptions.Item>
                                    </Descriptions>
                                </PageHeader>
                            )) : '...'}
                        </div>
                    </Content>
                </Layout>
            </Layout>

        </>
    )

}