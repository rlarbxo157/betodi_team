import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {auth} from '../_actions/user_action';


export default function (SpecificComponent,option,adminRoute=null){


    function AuthenticationCheck(props){
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
           dispatch(auth()).then(response=> {
                console.log(response);

                if(!response.payload.isAuth){  //로그인하지않은상태
                    if(option){
                        props.history.push('/login')
                    }    
                }else{
                            //로그인한상태
                    if(adminRoute&& !response.payload.isAdmin ){
                        props.history.push('/');
                    }else{
                        if(option===false){
                            props.history.push('/');
                        }
                    }
                }
           })
        }, [])
        return (
            <SpecificComponent {...props} user={user} />
        )
    }
    return AuthenticationCheck
}

    //option 종류
    //null -> 아무나
    //true -> 로그인해야함
    //false -> 로그인하면안됨  app.js에서 감싸서 적