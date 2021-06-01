import React,{useEffect} from 'react'
import {useDispatch} from 'react-redux';
import {getCartItems,removeCartItem} from '../../../_actions/user_action';
import UserCartBlock from './Sections/UserCartBlock';

const CartPage =(props) => {
    console.log(props);
    const dispatch = useDispatch();
    
    useEffect(() => {

        let detailItem =[];

        if(props.user.userData && props.user.userData.cart){
            if(props.user.userData.cart.length>0){
                props.user.userData.cart.forEach(item=> {
                    detailItem.push(item.id)
                })
                dispatch(getCartItems(detailItem,props.user.userData.cart))
            }
        }
     
    }, [props.user.userData])

    let removeFromCart =(id) => {
        dispatch(removeCartItem(id))
            .then(response=> {
                console.log(response);
            })
    }

    return(
        <div style={{width:'85%', margin:'3rem auto'}}>
            <div>
                <h1 style={{textAlign:'center'}}>찜</h1>
            </div>
            <div>
                <UserCartBlock products={props.user.cartDetail && props.user.cartDetail.product}  removeItem={removeFromCart}  />
                
            </div>
        </div>
    )
}

export default CartPage;