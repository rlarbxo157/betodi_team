import { Descriptions, Button, Empty } from 'antd'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Item from '../../BookUploadPage/Item';
import { Link } from "react-router-dom";
import { addToCart } from '../../../../_actions/user_action';
import Axios from "axios";
import axios from "axios";

function ProductInfo(props) {
    const dispatch = useDispatch();
    const clickHandler = () => {
        //필요한 정보를 카트필드에 넣어준다.
        dispatch(addToCart(props.detail._id));
        alert('등록되었습니다.');
    }


    const [items, setItems] = useState([]);
    let user = useSelector(state => state.user);
    const [seller, setSeller] = useState(null);

    const newchatroomHandler = () => {
        const writer = props.detail.writer;
        const body = {
            senderId: user.userData._id,
            receiverId: writer._id
        }

        if (body.receiverId !== body.senderId) {
            Axios.post('/api/conversations', body)
                .then(response => {
                    if (response) {
                    } else {
                        alert('채팅방 생성 실패')
                        console.log(response)
                    }
                })
        }
        else
            alert('채팅방 생성 실패')
    }


    useEffect(() => {
        setItems(props.detail.selectedbooks);
        const writer = props.detail.writer;
        const getUser = async () => {
            try {
                const res = await axios("../api/users?_id=" + writer._id);
                console.log(res.data);
                setSeller(res.data);
                console.log(seller);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
        console.log(seller);
    }, [props.detail]);

    return (
        <div>
            <Descriptions title="도서 정보" bordered>
                <Descriptions.Item label="Price">{props.detail.price}</Descriptions.Item>
                <br />
                <br />
                <Descriptions.Item label="Description">{props.detail.description}</Descriptions.Item>
                <Descriptions.Item label="view">{props.detail.views}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />

            {/* <Descriptions title="판매자 정보" bordered>
                <Descriptions.Item label="이름">{ }</Descriptions.Item>
                <br />
                <br />
                <Descriptions.Item label="Description">{props.detail.description}</Descriptions.Item>
                <Descriptions.Item label="view">{props.detail.views}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br /> */}


            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link to='/messenger'>
                    <Button size="large" shape="round" type="danger" onClick={newchatroomHandler}>
                        구매 문의하기
                    </Button>
                </Link>
                <Button size="large" shape="round" type="danger" style={{ marginLeft: '30px' }} onClick={clickHandler}>
                    장바구니 담기
                </Button>
            </div>
            <br /><br />


            {items && items.length > 0 ? items.map((selectedBook, index) => (
                <Item
                    key={index}
                    thumbnail={selectedBook.thumbnail}
                    title={selectedBook.title}
                    price={selectedBook.price}
                    isbn={selectedBook.isbn}
                    publisher={selectedBook.publisher}
                    price={selectedBook.price}
                    authors={selectedBook.authors}
                    //contents={book.contents}
                    url={selectedBook.url}
                />
            )) : <Empty description={'등록된 도서 정보가 없습니다'} />}
        </div>
    )
}

export default ProductInfo