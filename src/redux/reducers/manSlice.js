import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductsManCollegtion = createAsyncThunk("products/categories/man", async() => {
    const response  = await axios.get("http://localhost:5500/man/")
    return response.data
})

export const manSlice = createSlice({
    name:"manCollegtion",
    initialState:{
        manCollegtion:[]
    },
    reducer:[],
    extraReducers:builder => 
        builder

    //get products
    .addCase(getProductsManCollegtion.fulfilled, (state, action) => {
        state.loading = false
        state.manCollegtion = action.payload
    })
    .addCase(getProductsManCollegtion.pending, (state) => {
        state.loading = true
    })
    .addCase(getProductsManCollegtion.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
    })
})

export default manSlice.reducer