import axios from 'axios';

// import shop from '../api/shop'
// import * as types from '../constants/ActionTypes'
const GET_PRODUCTS = 'GET_PRODUCTS';
const ADD_TO_CART = 'ADD_TO_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const REMOVE_ITEM = 'REMOVE_ITEM';
const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST';


const initialState = {
    products:[],
    basket: [],
    checkedout: false
}

export function getProducts() {
    const products = axios.get('/products')
        .then((response) => { console.log(response.data); return response.data })

    return {
        type: GET_PRODUCTS,
        payload: products
    }
}

export function addToCart(sku) {

    return {
        type: ADD_TO_CART,
        payload: sku
    }
}

export function updateQuantity(quantity, sku) {
    return {
        type: UPDATE_QUANTITY,
        payload: {quantity, sku}
    }
}

export function removeItem(sku) {
    return {
        type: REMOVE_ITEM,
        payload: sku
    }
}

export function checkoutRequest(cardNumber, basket) {
    console.log({ "basket": basket, "cardNumber": cardNumber })
    const checkedout = axios.post('/checkout', {"basket":basket, "cardNumber":cardNumber})
        .then((response) => { console.log(response.data); return response.data }, (err) => console.log(err))

    return {
        type: CHECKOUT_REQUEST,
        payload: checkedout
    }
}


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS + '_FULFILLED':
            return Object.assign({}, state, { products: action.payload });
        
        case ADD_TO_CART:
            let bask = [...state.basket];
            console.log(bask)
            console.log(action.payload)
            let index = bask.findIndex(el => el.sku === action.payload);
            if(index === -1) {
                bask.push({ "sku": action.payload, "quantity": 1 })
            } else if(bask[index].quantity < 10) {
                bask[index].quantity = bask[index].quantity + 1;
            }
            return Object.assign({}, state, {basket: bask})
        case UPDATE_QUANTITY:
            bask = [...state.basket];
            index = bask.findIndex(el => el.sku === action.payload.sku);
            bask[index].quantity = action.payload.quantity;
            return Object.assign({}, state, { basket: bask });
        case REMOVE_ITEM:
            bask = [...state.basket];
            bask = bask.filter(el => el.sku !== action.payload);
            return Object.assign({}, state, { basket: bask });
        case CHECKOUT_REQUEST + '_FULFILLED':
            return Object.assign({}, state, {checkedout: true})
        default:
            return state;
    }
}