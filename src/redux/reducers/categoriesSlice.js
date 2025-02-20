import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategoriesProductsThunk = createAsyncThunk("categories/getProducts", async () => {
    const response = await axios.get("http://localhost:5500/categories")
    return response.data
})

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        // status: null,
    },
    reducers: [],
    extraReducers: builder =>
        builder

    //get categories
    .addCase(getCategoriesProductsThunk.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload
    })
    .addCase(getCategoriesProductsThunk.pending, (state) => {
        state.loading = true
    })
    .addCase(getCategoriesProductsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
    })
})

export default categoriesSlice.reducer;