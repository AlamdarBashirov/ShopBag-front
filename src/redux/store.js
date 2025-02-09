import { configureStore } from "@reduxjs/toolkit";
import  productSlice  from "./reducers/productSlice";
import  basketSlice  from "./reducers/basketSlice";
import manSlice from "./reducers/manSlice";
import  profileSlice  from "./reducers/profileSlice";

export const store = configureStore({
    reducer:{
        products:productSlice,
        basket:basketSlice,
        profile: profileSlice,
        manCollegtion: manSlice,
    }
})