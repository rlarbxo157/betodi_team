import React,{useState} from 'react'
import axios from 'axios'
import {Button,Input} from 'antd';
import { Col,Row} from 'antd';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

function BookCrawling() {

    const [book_title,setBook_title] = useState('');
    const [ListData, setListData] = useState([]);
    const [kListData,setKListData] = useState([]);
    const [nListData,setNListData] = useState([]);
    
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

        const getData1  = async () => {
            const datas = await axios.post('http://localhost:8000/kraw',data)
                .then(response => setKListData(response.data.filter(x=>x.title)))
        }
        getData();
        getData1();
        setNListData(ListData.concat(kListData))
    }

    const columns = [{
        Header:'Name',
        accessor:'name'
    }]

    return(
        <div style={{width:'75%', margin:'3rem auto'}}>
        <Row gutter={[16,16]}>
            <Col lg={24} xs={24}>
        <div style={{display:'flex',flexDirection:'column' ,justifyContent:'center'}}>
            <h1 style={{textAlign:'center'}}>외부 사이트 중고서적</h1>
            <Input onChange={onChange} name={book_title} value={book_title} /> 
            <Button onClick={onSearchClick}>검색</Button>
            {nListData.length===0? 
                  <h1>...</h1>
                :
                <div>
                    <ReactTable
                    className="crawling-table"
                    data={nListData}
                    columns={[
                        {
                            Header:"이미지",
                            accessor:"imgEl",
                            Cell:row => (
                                <div>
                                    <img className="img" src={row.row.imgEl} />
                                </div>
                            )
                            
                        },
                        {
                            Header:"책 제목",
                            accessor:"title",
                        },
                        {
                            Header:"가격",
                            id:"price",
                            accessor:"price"
                        },
                    ]} 
                    >
                    </ReactTable>
                </div>
            }
        </div>
        </Col>
        </Row>
        </div>
    );
}
export default BookCrawling
