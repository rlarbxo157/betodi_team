import React from 'react'
import useDispatch from 'react-redux'
import './UserCart.css';

const UserCartBlock = (props) => {
    console.log(props);
    // console.log(product);
    // console.log(props.products.images);
    const renderCartImage= (images) => {
        if(images.length>0){
            let image = images[0];
            return `http://localhost:8000/${image}`
        }
    }

    const renderItems =() => (
        props.products && props.products.map(item=> (
            <tr > 
             {/* 1나의 게시글을 클릭하면, 그게시글의 상세페이지를 띄워줘야함. */}
                <td>
                    <img style={{width:'70px'}} alt="product"
                    src={renderCartImage(item.images)}
                    />
                </td>
                <td>
                    {item.description}
                </td>
                <td>
                    {item.price}
                </td>
                <td>
                
                    <button onClick={()=>props.removeItem(item._id)} >
                        삭제
                    </button>
                </td>
            </tr>
        ))
    )

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>image </th>
                        <th>title </th>
                        <th>price</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCartBlock;