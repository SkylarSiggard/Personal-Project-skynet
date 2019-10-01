import {createStore} from 'redux'

const initialState = {
    listOfEvents: []
}

export const ADD_EVENT = "ADD_EVENT"

function reducer(state = initialState, action) {
    switch(action.type)  {
        case ADD_EVENT: 
            

        default: 
        return state
    }
}

export default createStore(reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())