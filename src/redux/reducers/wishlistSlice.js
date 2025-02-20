import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Wishlist-i əldə etmə
export const getProductsWishlistThunk = createAsyncThunk("wishlist/getProducts", async () => {
    const response = await axios.get("http://localhost:5500/wishlist");
    return response.data;
});

// Wishlist-dən silmə
export const deleteProductsFromWishlistThunk = createAsyncThunk("wishlist/deleteProduct", async (id) => {
    await axios.delete(`http://localhost:5500/wishlist/${id}`);
    return id;
});

// Wishlist-ə əlavə etmə
export const postProductsToWishlistThunk = createAsyncThunk("wishlist/addProduct", async (item) => {
    const response = await axios.post("http://localhost:5500/wishlist", item);
    return response.data;
});

// Toggle funksiyası
export const toggleWishlistThunk = createAsyncThunk("wishlist/toggleProduct", async (item, { getState, dispatch }) => {
    const { wishlist } = getState().wishlist;
    const isInWishlist = wishlist.some((wishItem) => wishItem._id === item._id);

    if (isInWishlist) {
        dispatch(deleteProductsFromWishlistThunk(item._id)); // Əgər wishlist-dəsə sil
        return item._id;
    } else {
        const response = await axios.post("http://localhost:5500/wishlist", item);
        return response.data;
    }
});

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlist: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Wishlist-i alma
            .addCase(getProductsWishlistThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = action.payload;
            })
            .addCase(getProductsWishlistThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductsWishlistThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Wishlist-ə əlavə etmə
            .addCase(postProductsToWishlistThunk.fulfilled, (state, action) => {
                state.wishlist.push(action.payload);
            })
            // Wishlist-dən silmə
            .addCase(deleteProductsFromWishlistThunk.fulfilled, (state, action) => {
                state.wishlist = state.wishlist.filter((item) => item._id !== action.payload);
            })
            // Toggle Wishlist
            .addCase(toggleWishlistThunk.fulfilled, (state, action) => {
                const exists = state.wishlist.some((item) => item._id === action.payload._id);
                if (exists) {
                    state.wishlist = state.wishlist.filter((item) => item._id !== action.payload._id);
                } else {
                    state.wishlist.push(action.payload);
                }
            });
    },
});

export default wishlistSlice.reducer;
