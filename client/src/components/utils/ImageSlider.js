import React from 'react'
import { Col, Card, Row, Carousel } from 'antd';
import Icon from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import "./imageslider.css"

function ImageSlider(props) {
    console.log(props);
    return (
        <div>
            <Carousel autoplay>
                {props.images.map((data, index) => (
                    <div key={index}>
                        <img className="thumbnail" src={`http://localhost:8000/${data}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default ImageSlider;