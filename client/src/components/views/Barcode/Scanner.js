import Quagga from "quagga";
import React, { useState, useEffect } from "react";
import {
    BarcodeOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';

const Scanner = props => {
    const { onDetected } = props;
    // const [detected, setDetected] = useState(props);
    const [source, setSource] = useState("");

    const handleCapture = (target) => {
        if (target.files) {
            if (target.files.length !== 0) {
                const file = target.files[0];
                const newUrl = URL.createObjectURL(file);
                setSource(newUrl);
            }
        }
    };

    useEffect(() => {
        Quagga.decodeSingle(
            {
                src: source,
                numOfWorkers: 0, // Needs to be 0 when used within node
                locate: true,
                inputStream: {
                    size: 1280 // restrict input-size to be 800px in width (long-side)
                },
                decoder: {
                    readers: [
                        "ean_reader",
                    ]
                }
            },
            function (result) {
                if (result) {
                    if (result.codeResult != null) {
                        onDetected(result.codeResult.code);
                    } else {
                        alert("not detected");
                        onDetected("");
                    }
                } else {
                    alert("not detected");
                    onDetected("");
                }
                // setSource("");
            }
        );
    }, [source]);

    return (
        <div>
            <Tooltip title="바코드 검색" color='cyan'>
                <label>
                    <BarcodeOutlined className="camera" theme="outlined" style={{ margin: '8px', fontSize: '35px' }} />
                    <input id="inputId" style={{ display: 'none' }} type="file" capture="camera" accept="image/*" onChange={(e) => handleCapture(e.target)}>
                    </input>
                </label>
            </Tooltip>
        </div>
    );
};

export default Scanner;
