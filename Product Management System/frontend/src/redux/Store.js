import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import Reducer from './general/Reducer'

const store = createStore(combineReducers({
    products : Reducer
}), applyMiddleware(thunk))

export default store