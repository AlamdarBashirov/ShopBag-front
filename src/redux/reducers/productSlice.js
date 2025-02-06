import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductsHomeThunk = createAsyncThunk("home/popularProducts", async () => {
    const response = await axios.get("http://localhost:5500/products")
    return response.data
})

export const productSlice = createSlice({
    name:"products",
    initialState:{
        products:[]
    },
    reducer:[],
    extraReducers:builder => 
        builder


    //get products
    .addCase(getProductsHomeThunk.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
    })
    .addCase(getProductsHomeThunk.pending, (state) => {
        state.loading = true
    })
    .addCase(getProductsHomeThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
    })
})

export default productSlice.reducer