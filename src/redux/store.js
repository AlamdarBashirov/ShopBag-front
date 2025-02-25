import { configureStore } from "@reduxjs/toolkit";
import  productSlice  from "./reducers/productSlice";
import  basketSlice  from "./reducers/basketSlice";
import manSlice from "./reducers/manSlice";
import  profileSlice  from "./reducers/profileSlice";
import  paymentSlice  from "./reducers/paymentSlice";
import  wishlistSlice  from "./reducers/wishlistSlice";
import  themeSlice  from "./reducers/themeSlice";
import  categoriesSlice  from "./reducers/categoriesSlice";
import  adminSlice  from "./reducers/adminSlice";

export const store = configureStore({
    reducer:{
        products:productSlice,
        basket:basketSlice,
        profile: profileSlice,
        manCollegtion: manSlice,
        payment: paymentSlice,
        wishlist: wishlistSlice,
        theme: themeSlice,
        categories: categoriesSlice,
        admin: adminSlice
    }
})