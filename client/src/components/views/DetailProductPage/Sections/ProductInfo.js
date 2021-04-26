import { Descriptions,Button } from 'antd'
import React from 'react'


function ProductInfo(props) {
    return(
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

            
            <div style={{display:'flex', justifyContent:'center'}}>
                <Button size="large" shape="round" type="danger" onClick>
                    구매 문의하기
                </Button>
            </div>
            
        </div>
    )
}

export default ProductInfo