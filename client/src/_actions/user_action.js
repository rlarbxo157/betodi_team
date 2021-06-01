import ActionButton from 'antd/lib/modal/ActionButton';
import axios from 'axios'
import {LOGIN_USER,REGISTER_USER,AUTH_USER,ADD_TO_CART,GET_CART_ITEMS,REMOVE_CART_ITEM} from './types';


export function loginUser(dataToSubmit){

const request = axios.post('/api/users/login', dataToSubmit)
    .then(response=> response.data)
    return {
        type:LOGIN_USER,
        payload:request
    }

}

export function registerUser(dataToSubmit){

    const request = axios.post('/api/users/register', dataToSubmit)
    .then(response=> response.data)
    return {
        type:REGISTER_USER,
        payload:request
    }

}

export function auth(){

    const request = axios.get('/api/users/auth')
    .then(response=> response.data)
    return {
        type:AUTH_USER,
        payload:request
    }

}

export function addToCart(id){

    let body ={
        productId:id
    }
    
    const request = axios.post('/api/users/addToCart',body)
        .then(response=>response.data);
        // console.log(request);
        return {
            type:ADD_TO_CART,
            payload:request
        }
}

export function getCartItems(cartItems, userCart){
    
    const request = axios.get(`/api/product/product_by_id?id=${cartItems}&type=array`)
        .then(response=>{
            //cartitem들에 해당하는 정보들을 product collection에서 가져온후에 정보넣어준다.
            userCart.forEach(cartItem=> {
                response.data.product.forEach((productDetail,index)=>{
                    if(cartItem.id ===productDetail.id) {
                        response.data.product[index].quantity =cartItem.quantity
                    }
                })
            })
            return response.data;
        });

    return {
        type:GET_CART_ITEMS,
        payload:request

    }
}

export function removeCartItem(productId) {   //id 는 상품아이디

    const request = axios.get(`/api/users/removeFromCart?id=${productId}`)
        .then(response =>{
            //productInfo, cart 정보가져와서 cartDetail 만들어야함

            response.data.cart.forEach(item => {
                response.data.productInfo.forEach((product,index)=> {
                    if(item.id===product._id){
                        response.data.productInfo[index].quantity= item.quantity
                    }
                })
            })
            return response.data;
        })

    return {
        type:REMOVE_CART_ITEM,
        payload:request
    }
}