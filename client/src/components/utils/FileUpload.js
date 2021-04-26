import React,{useState} from 'react'
import Dropzone from 'react-dropzone'
import Icon, { ConsoleSqlOutlined } from '@ant-design/icons';
import axios from 'axios';

import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined
    } from '@ant-design/icons';

function FileUpload(props) {

    console.log(props);
    const [Images, setImages] = useState([]);
    console.log(Images);
    const dropHandler = (files) => {

        let formData = new FormData();
        const config = {
            header:{'content-type':'multipart/form-data'}
        }

        formData.append('file',files[0])
        axios.post('/api/product/image', formData, config)
            .then(response=> {
                if(response.data.success){
                    console.log(response.data)

                    setImages([...Images,response.data.filePath ])
                    props.refreshFunction([...Images,response.data.filePath ])
                }else{
                    console.log(response.data);
                }
            })
    }

    const deleteHandler = (image) => {   //이미지 클릭시 이미지 삭제시키는기능
        const currentIndex = Images.indexOf(image)
        
        let newImages =[...Images]
        newImages.splice(currentIndex,1)
        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return(
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <Dropzone onDrop={dropHandler}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div
                        style={{width:300, height:240, border:'1px solid black',
                        display:'flex', alignItems:'center', justifyContent:'center'     
                    }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <PlusOutlined style={{fontSize:'3rem'}} />
                    </div>
                    </section>
                )}
            </Dropzone>

        
            
            <div style={{display:'flex', width:'350px',height:'240px',overflowX:'scroll'}}>
                    {Images.map((image,index)=> ( //와진짜 이걸 {, ( 이거잘못써서 5시간을찾았네
                        <div onClick={()=> deleteHandler(image)} key={index}>
                            <img 
                            src={`http://localhost:8000/${image}`}
                            style={{minWidth:'300px',width:'300px', height:'240px'}}
                            />    
                        </div>
                    ))}
            </div>
        </div>
        
    );
}
export default FileUpload;

// C:\웹\10(ui그리기)
// uploads
// C:\웹\10(ui그리기)\uploads