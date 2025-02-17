import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const getProductsWishlistThunk = createAsyncThunk("wishlist/getProdcuts", async () => {
    const response = await axios.get("http://localhost:5500/wishlist")
    return response.data
})

export const deleteProductsFromWishlistThunk = createAsyncThunk("wishlist/deleteProdcuts", async (id) => {
    const response = await axios.delete(`http://localhost:5500/wishlist/${id}`)
    return id
})


export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState:{
        wishlist:[],
    },
    reducer:[],
    extraReducers:builder => {
        builder


        //get products
        .addCase(getProductsWishlistThunk.fulfilled, (state, action) => {
            state.loading = false
            state.wishlist = action.payload
        })
        .addCase(getProductsWishlistThunk.pending, (state) => {
            state.loading = true
        })
        .addCase(getProductsWishlistThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

        //delete products
        .addCase(deleteProductsFromWishlistThunk.fulfilled, (state, action) => {
            state.loading = false
            state.wishlist = state.wishlist.filter((item) => item._id !== action.payload)
        })
        .addCase(deleteProductsFromWishlistThunk.pending, (state) => {
            state.loading = true
        })
        .addCase(deleteProductsFromWishlistThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default wishlistSlice.reducer