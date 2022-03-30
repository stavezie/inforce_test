import {combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {productsReducer} from "../reducers/productsReducer";

const rootReducer = (combineReducers({
    products: productsReducer
}))

export const store = createStore(rootReducer, composeWithDevTools());