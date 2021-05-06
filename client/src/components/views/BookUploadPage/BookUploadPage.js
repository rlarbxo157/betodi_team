import React, { useEffect, useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import { bookSearch } from '../../utils/KakaoApi';
import Axios from 'axios';
import CardActionArea from '@material-ui/core/CardActionArea';
import Item from './Item';
const { TextArea } = Input;


const Continents = [
    { key: 1, value: "상" },
    { key: 2, value: "중" },
    { key: 3, value: "하" },

]

function BookUploadPage(props) {
    console.log(props);
    const [books, setBooks] = useState([]);
    const [searchData, setSearchData] = useState("");
    const [selectedBooks, setSelectedBooks] = useState([]);

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])

    useEffect(() => {
        setBooks([]);
    }, [searchData]);

    const onTextUpdate = e => {
        setSearchData(e.target.value);
    };

    const bookSearchHandler = async (e) => {
        const params = {
            query: searchData,
            sort: "accuracy", // accuracy | recency 정확도 or 최신
            page: 1, // 페이지번호
            size: 15 // 한 페이지에 보여 질 문서의 개수
        };
        const { data } = await bookSearch(params);
        setBooks(books.concat(data.documents));
    };

    const bookSelectHandler = index => {
        setSelectedBooks(selectedBooks.concat(books[index]));
        setSearchData("");
    }

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const continentChangeHandler = (event) => {
        setContinent(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (!Title || !Description || !Price || !Continent || Images.length === 0) {
            return alert(" 모든 값을 넣어주셔야 합니다.")
        }


        const body = {
            //로그인 된 사람의 ID 
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            continents: Continent,
            selectedbooks: selectedBooks
        }

        Axios.post('/api/product', body)
            .then(response => {
                if (response.data.success) {
                    alert('상품 업로드에 성공 했습니다.')
                    props.history.push('/')
                } else {
                    alert('상품 업로드에 실패 했습니다.')
                }
            })
    }


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1>도서 정보입력</h1>
            </div>
            <Form >
                <Input
                    placeholder="검색어를 입력 하세요..."
                    onChange={onTextUpdate} // change
                    value={searchData} // view
                />
                <button type="submit" onClick={bookSearchHandler}>
                    책검색
                </button>
                <div>
                    {books.map((book, index) => (
                        <CardActionArea
                            key={index}
                            onClick={() => bookSelectHandler(index)}>
                            <Item
                                key={index}
                                thumbnail={book.thumbnail}
                                title={book.title}
                                price={book.price}
                                isbn={book.isbn}
                                publisher={book.publisher}
                                price={book.price}
                                blogname={book.authors}
                                //contents={book.contents}
                                url={book.url}
                            />
                        </CardActionArea>
                        // 
                    ))}
                </div>
                <br />
                <FileUpload refreshFunction={updateImages} />
                <br />
                <br />
                {selectedBooks.map((selectedBook, index) => (
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
                ))}
                <label>제목</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description} />
                <br />
                <br />
                <label>가격($)</label>
                <Input type="number" onChange={priceChangeHandler} value={Price} />
                <br />
                <br />
                <select onChange={continentChangeHandler} value={Continent}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}> {item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <button type="submit" onClick={submitHandler}>
                    확인
                </button>
            </Form>
        </div>
    )
}

export default BookUploadPage
