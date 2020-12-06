const initialState = {
    foods: [],
    carts: [],
    saldo: 2000000
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case 'GET_FOODS':
            return {...state, foods: action.payload.foods}
        case 'GET_CARTS':
            return {...state, carts: action.payload.carts}
        case 'ADD_CART':
            return {...state, carts: state.carts.concat(action.payload.newCart)}
        case 'SET_SALDO':
            return {...state, saldo: action.payload.currentSaldo}
        default:
            return state
    }
}