import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import BookCrawling from '../BookCrawling/BookCrawling';
import { Col, Card, Row, Tag, Result } from 'antd';
import Icon from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import SearchFeature from './Sections/SearchFeature';
import CheckBox from './Sections/CheckBox'
import { major, price } from './Sections/Datas';
import RadioBox from './Sections/RadioBox';

function LandingPage(props) {
    // useEffect(()=> {
    //     axios.get('/api/hello').then(response=>{
    //         console.log(response);
    //     })
    // },[])

    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(4);
    const [PostSize, setPostSize] = useState();
    const [productData, setProductData] = useState([]);
    const [SearchTerm, setSearchTerm] = useState("");

    const [Filters, setFilters] = useState({
        major: [],
        price: []
    })

    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }
        getProduct(body);
    }, [])

    const getProduct = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    if (body.loadMore) {
                        setProductData([...productData, ...response.data.productInfo])
                    } else {
                        setProductData(response.data.productInfo);
                    }

                    setPostSize(response.data.postSize)

                } else {
                    alert('상품을 가져오는데 실패하였습니다.')
                }
            })
    }

    const moreHandler = (e) => {

        let skip = Skip + Limit;
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }
        getProduct(body);
        setSkip(skip);
    }


    const onClickHandler = (e) => {
        axios.get(`/api/users/logout`)
            .then(response => {
                if (response.data.success) {
                    props.history.push("/login")
                } else {
                    alert('로그아웃실패')
                }
            })
    }

    const updateSearch = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);
        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProduct(body)
    }



    const renderCards = productData.map((data, index) => {
        console.log(data);


        return <Col lg={6} md={8} xs={24} key={index}>
            <Card hoverable cover={<a href={`/product/${data._id}`}><ImageSlider images={data.images} /></a>}>
                <Row>
                    <Col flex={4}>
                        <Meta
                            title={data.title}
                            description={data.price}
                        />
                    </Col>
                    <Col flex={1} >
                        {!data.isSold ? <Tag style={{ float: 'right' }} color="blue">판매중</Tag> : <Tag style={{ float: 'right' }} color="red">판매완료</Tag>}
                    </Col>
                </Row>
            </Card>
        </Col >


    })

    const showFilterResults = (filters) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }

        getProduct(body)
        setSkip(0)
    }

    const handleFilter = (filters, category) => {
        const newfilter = { ...Filters }
        newfilter[category] = filters

        showFilterResults(newfilter)
    }

    return (
        <>
            <div style={{ width: '75%', margin: '3rem auto' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1>판매중인 서적<Icon type="rocket" /></h1>
                </div>

                <Row gutter={[16, 16]}>
                    <Col lg={12} xs={24}>
                        <CheckBox list={major} handleFilter={filters => handleFilter(filters, 'major')} />
                    </Col>
                    <Col lg={12} xs={24}>
                        <RadioBox list={price} handleFilter={filters => handleFilter(filters, 'price')} />
                    </Col>
                </Row>


                <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                    <SearchFeature
                        refreshFunction={updateSearch}
                    />
                </div>

                <Row gutter={[16, 16]}>
                    {renderCards}
                </Row>

                <br />
                {PostSize >= Limit && <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={moreHandler}>더보기</button>
                </div>}
            </div>
            <div>
                {/* <h1>외부 사이트 중고서적</h1> */}
                <BookCrawling />
            </div>
        </>
    )
}

export default withRouter(LandingPage)


// 처음 시작페이지에 인풋값 받아놓고, 구역을 2개로 나눠서, 하나는 db에 저장되있는 게시물, 다른 곳에는 외부데이터 크롤링데이터를
// 가져오는 식으로 우선만들어야할듯