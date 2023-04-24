import { combineReducers } from "redux";
import reducers, { preducer } from "./amountReducer"

const reducers = combineReducers({
    amount : reducers,
    preduce : preducer
})

export default reducers