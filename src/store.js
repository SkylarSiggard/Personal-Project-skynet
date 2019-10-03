import {createStore} from 'redux'

const initialState = {
    listOfEvents: []
}

export const ADD_EVENT = "ADD_EVENT"
export const GET_EVENTS = 'GET_EVENTS'

function reducer(state = initialState, action) {
    switch(action.type)  {

        case ADD_EVENT: 
            state.listOfEvents.push(action.payload)
            return {...state}

        case GET_EVENTS: 
            // console.log('here',{...state, listOfEvents: action.payload})
            return {...state, listOfEvents: action.payload}
        
        default: 
            return state
    }
}

export default createStore(reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
