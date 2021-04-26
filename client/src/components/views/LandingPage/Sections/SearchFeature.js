import React,{useState} from 'react'
import {Input} from 'antd'

const {Search} = Input;

function SearchFeature(props) {

    const [searchData, setSearchData] = useState(""); 

    const searchHandler =(e) => {
        setSearchData(e.target.value);
        props.refreshFunction(e.target.value);
    }
    
    return(
        <div>
            <Search
                placeholder="search"
                onChange={searchHandler}
                style={{width:200}}
                value={searchData}
            />
        </div>
    )
}

export default SearchFeature