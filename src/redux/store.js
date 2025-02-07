import { configureStore } from "@reduxjs/toolkit";
import  productSlice  from "./reducers/productSlice";
import  basketSlice  from "./reducers/basketSlice";
import manSlice from "./reducers/manSlice";

export const store = configureStore({
    reducer:{
        products:productSlice,
        basket:basketSlice,
        manCollegtion: manSlice
    }
})