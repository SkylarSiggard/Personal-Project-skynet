import {createStore} from 'redux'

const initialState = {
    listOfEvents: [],
    login: false
}

export const ADD_EVENT = "ADD_EVENT"
export const GET_EVENTS = 'GET_EVENTS'
export const DELETE_EVENT = 'DELETE_EVENT'
export const LOGIN_USER = 'LOGIN_USER'

function reducer(state = initialState, action) {
    switch(action.type)  {
        case LOGIN_USER:
            return {...state, login: action.payload}

        case ADD_EVENT: 
            state.listOfEvents.push(action.payload)
            return {...state}

        case GET_EVENTS: 
            // console.log('here',{...state, listOfEvents: action.payload})
            return {...state, listOfEvents: action.payload}

        case DELETE_EVENT: 
            state.listOfEvents.splice(action.payload, 1)
            return {...state}
        
        default: 
            return state
    }
}

export default createStore(reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
