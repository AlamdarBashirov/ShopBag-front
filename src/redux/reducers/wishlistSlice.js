import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Axios instance yarat
const axiosInstance = axios.create({
    baseURL: "http://localhost:5500",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

// Wishlist-i əldə etmə (İstifadəçisiz)
export const getProductsWishlistThunk = createAsyncThunk(
    "wishlist/getProducts",
    async () => {
        const response = await axiosInstance.get("/wishlist");
        return response.data;
    }
);

// Wishlist-dən silmə (İstifadəçisiz)
export const deleteProductsFromWishlistThunk = createAsyncThunk(
    "wishlist/deleteProduct",
    async (id) => {
        await axiosInstance.delete(`/wishlist/${id}`);
        return id;
    }
);

// Wishlist-ə əlavə etmə (İstifadəçisiz)
export const postProductsToWishlistThunk = createAsyncThunk(
    "wishlist/addProduct",
    async (item) => {
        const response = await axiosInstance.post("/wishlist", item);
        return response.data;
    }
);

// Toggle funksiyası (İstifadəçisiz)
export const toggleWishlistThunk = createAsyncThunk(
    "wishlist/toggleProduct",
    async (item, { getState, dispatch }) => {
        const { wishlist = [] } = getState().wishlist || {};
        const itemId = item?._id;

        if (!itemId) {
            console.error("Məhsulun ID-si tapılmadı!");
            return;
        }

        const isInWishlist = wishlist.some((wishItem) => wishItem._id === item._id);

        try {
            if (isInWishlist) {
                await dispatch(deleteProductsFromWishlistThunk(itemId));
                return itemId;
            } else {
                const response = await dispatch(postProductsToWishlistThunk(item));
                return response.payload;
            }
        } catch (error) {
            console.error("Xəta:", error.response?.data || "Xəta baş verdi!");
            throw error;
        }
    }
);

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
            .addCase(postProductsToWishlistThunk.fulfilled, (state, action) => {
                state.wishlist.push(action.payload);
            })
            .addCase(postProductsToWishlistThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(postProductsToWishlistThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteProductsFromWishlistThunk.fulfilled, (state, action) => {
                state.wishlist = state.wishlist.filter((item) => item._id !== action.payload);
            })
            .addCase(toggleWishlistThunk.fulfilled, (state, action) => {
                const itemId = action.payload?._id || action.payload;
                if (!itemId) return;
            
                const exists = state.wishlist.some((item) => item._id === itemId);
                if (exists) {
                    state.wishlist = state.wishlist.filter((item) => item._id !== itemId);
                } else {
                    state.wishlist.push(action.payload);
                }
            });
    },
});

export default wishlistSlice.reducer;
