import {AsyncStorage, Alert} from 'react-native'
const axios = require('axios')
const baseUrl = 'http://192.168.1.12:3000'
let access_token;

async function getToken() {
    const response = await AsyncStorage.getItem('dataLogin',async (error, result)=> {
        if(result){
            const parsedResult = JSON.parse(result)
            access_token = await parsedResult.access_token
        }
        })
    return response
}

export default function setIsLogin(data) {
    return((dispatch)=> {
        axios({
            method: 'POST',
            url: baseUrl+'/login',
            data
        })
        .then(({data: result}) => {
            const dataLogin = {
                isLogin: true,
                access_token: result.access_token,
                email: result.email
            }
            AsyncStorage.setItem('dataLogin', JSON.stringify(dataLogin))
        })
        .catch((error)=>{
            console.log(error)
        })
    })    
}

export function register(data) {
    return((dispatch)=> {
        axios({
            method: 'POST',
            url: baseUrl+'/register',
            data
        })
        .then((res) => {
            console.log('berhasil register')
        })
        .catch((error) => {
            console.log(error.message)
        })
    })    
}

export function getFoods() {
    return((dispatch) => {
        axios({
            method: 'GET',
            url: baseUrl+'/foods',
        })
        .then(({data: foods}) => {
            dispatch({
                type: 'GET_FOODS',
                payload: {
                    foods
                }
            })
        }).catch((err) => {
            console.log(err)
        });
    })
}

export function getCarts() {
    return(async (dispatch)=> {
        await getToken()
        axios({
            method: 'GET',
            url: baseUrl+'/carts',
            headers: {
                access_token
            }
        })
        .then(({data: carts}) => {
            dispatch({
                type: 'GET_CARTS',
                payload: {
                    carts
                }
            })
        }).catch((err) => {
            console.log(err)
        });
    })
}

export function addCarts(data) {
    return(async (dispatch)=> {
        await getToken()
        axios({
            method: 'POST',
            url: baseUrl+'/carts',
            headers: {
                access_token
            }, 
            data
        })
        .then(({data: newCart}) => {
            dispatch({
                type: 'ADD_CART',
                payload: {
                    newCart
                }
            })
        }).catch((err) => {
            console.log(err)
        });
    })
}

export function updateCart(id, data) {
    return(async (dispatch)=> {
        await getToken()
        axios({
            method: 'PUT',
            url: baseUrl+'/carts/'+id,
            headers: {
                access_token
            }, 
            data
        })
        .then(() => {
            console.log('berhasil update')
        }).catch((err) => {
            console.log(err)
        });
    })
}

export function setSaldo(currentSaldo) {
    return((dispatch)=> {
        dispatch({
            type: 'SET_SALDO',
            payload: {
                currentSaldo
            }
        })
    })
}