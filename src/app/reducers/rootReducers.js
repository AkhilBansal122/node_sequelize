import { combineReducers } from "@reduxjs/toolkit";
import { productData } from "./testingReducers";

const rootReducer = combineReducers({
    productData
});
export default rootReducer;