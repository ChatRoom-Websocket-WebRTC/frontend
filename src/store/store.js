import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import rootReducer from './reducers';
import thunk from "redux-thunk"

const composedEnhancer = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__? window.__REDUX_DEVTOOLS_EXTENSION__(): f => f)
const store = createStore(rootReducer,composedEnhancer);

export default store;