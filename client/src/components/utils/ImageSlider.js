import React from 'react'
import { Carousel } from 'antd';
import "./imageslider.css"

function ImageSlider(props) {
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