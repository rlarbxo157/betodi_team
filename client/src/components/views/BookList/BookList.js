import React,{useState} from 'react'

function BookList(props) {

    const [loadData, setloadData] = useState([]);

    setloadData(props);
    console.log(loadData);
   
    return(
        <div>
            {loadData.map((data)=>(
                <div>
                    {data}
                </div>
            ))}
        </div>
    );
}

export default BookList