import React,{useState} from 'react'
import axios from 'axios'
import { Drawer, Button,Input} from 'antd';
import BookList from '../BookList/BookList';
import {Table} from 'react-bootstrap';
import { Col,Card,Row,Carousel, Result} from 'antd';

function BookCrawling() {

    const [book_title,setBook_title] = useState('');
    const [ListData, setListData] = useState([]);
    const [yesData,setYesData] = useState([]);
    
    const onChange = (e) => {
        setBook_title(e.target.value);
    }
    const onSearchClick= () => {
        let data = {
            searchData:book_title
        }
        const getData = async () =>{
            const datas = await axios.post('http://localhost:8000/craw',data)
                .then(response => setListData(response.data))
        }
        getData();
  

    }
    console.log(ListData);



    return(
        <div style={{width:'75%', margin:'3rem auto'}}>
        <Row gutter={[16,16]}>
            <Col lg={24} xs={24}>
        <div style={{display:'flex',flexDirection:'column' ,justifyContent:'center'}}>
            <h1 style={{textAlign:'center'}}>외부 사이트 중고서적</h1>
            <Input onChange={onChange} name={book_title} value={book_title} /> 
            <Button onClick={onSearchClick}>검색</Button>
            {/* 여기서 listdata가 null 이 아니면 bookList를 보여줘야함 */}
            {ListData.length===0? 
                  <h1>...</h1>
                :
                <div className="book_list">
                    {ListData.map((data,index)=> (
                        <div style={{display:'flex',justifyContent:'center', alignItems:'center',height:'100%'}}>
                            <img src={data.imgEl} />
                            <div className="book_list_detail" key={index} style={{width:'100%', height:'100%', display:'flex', flexDirection:'column',justifyContent:'space-between',alignItems:'center',
                            }} >
                                    <Table striped bordered hover size="sm" >
                                        <tbody>
                                            <tr>
                                                <td><a href={data.link} style={{padding:'3px 0', color:'blue',fontSize:'1rem'}}>사이트</a></td>
                                                <td><p style={{padding:'3px 0'}}>{data.platform}</p></td>
                                            </tr>
                                            <tr>
                                                <td><p style={{padding:'3px 0'}}>도서 제목</p></td>
                                                <td><p style={{padding:'3px 0'}}>{data.title}</p></td>
                                            </tr>
                                            <tr>
                                                <td><p style={{padding:'3px 0'}}>가격</p></td>
                                                <td><p style={{padding:'3px 0'}}>{data.price}</p></td>
                                            </tr>
                                            {/* <p>{data.link}</p> */}
                                        </tbody>
                                     
                                    </Table>
                                   
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
        </Col>
        </Row>
        </div>
    );
}

export default BookCrawling

// 크롤링한 외부데이터 클릭시 해당게시물로 바로 참조할수있도록 링크 걸어주면 좋을듯

     {/* <p style={{padding:'3px 0'}}>{data.platform}</p>
        <p style={{padding:'3px 0'}}>{data.title}</p>
        <p style={{padding:'3px 0'}}>{data.price}</p> */}