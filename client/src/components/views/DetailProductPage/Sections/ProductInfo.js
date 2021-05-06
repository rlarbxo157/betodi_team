import { Descriptions, Button } from 'antd'
import React, { useState, useEffect } from 'react'
import Item from '../../BookUploadPage/Item';

function ProductInfo(props) {

    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(props.detail.selectedbooks);
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


            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger" onClick>
                    구매 문의하기
                </Button>
            </div>


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
            )) : "Loading..."}
        </div>
    )
}

export default ProductInfo