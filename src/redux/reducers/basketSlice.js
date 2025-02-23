// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// export const getProductsBasketThunk = createAsyncThunk("basket/products", async () => {
//     const response = await axios.get("http://localhost:5500/basket")
//     return response.data
// })

// export const deleteProductsFromBasketThunk = createAsyncThunk("basket/products/deleteItem", async(id) => {
//     const response = await axios.delete(`http://localhost:5500/basket/${id}`)    
//     return id
// })

// export const basketSlice = createSlice({
//     name:"basket",
//     initialState:{
//         basket:[]
//     },
//     reducer:[],
//     extraReducers:builder => 
//         builder

//     //get products
//     .addCase(getProductsBasketThunk.fulfilled, (state, action) => {
//         state.loading = false
//         state.basket = action.payload
//     })
//     .addCase(getProductsBasketThunk.pending, (state) => {
//         state.loading = true
//     })
//     .addCase(getProductsBasketThunk.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.error.message
//     })


//     // delete Basket
//     .addCase(deleteProductsFromBasketThunk.fulfilled, (state, action) => {
//         state.loading = false
//         state.basket = state.basket.filter(item=> item._id != action.payload)
//     })
//     .addCase(deleteProductsFromBasketThunk.pending, (state) => {
//         state.loading = true
//     })
//     .addCase(deleteProductsFromBasketThunk.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.error.message
//     })
// })

// export default basketSlice.reducer



import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// API Base URL
const API_URL = "http://localhost:5500/basket";

// Axios'un her istekte cookie göndermesi için global ayar
axios.defaults.withCredentials = true;

// Kullanıcının kendi basketini çekme
export const getProductsBasketThunk = createAsyncThunk("basket/products", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(API_URL); // Token otomatik olarak cookie'den alınacak
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Sepet alınırken hata oluştu.");
    }
});

// Sepetten ürün silme
export const deleteProductsFromBasketThunk = createAsyncThunk("basket/products/deleteItem", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/${id}`); // Cookie tabanlı auth
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Ürün silinirken hata oluştu.");
    }
});

// Sepete ürün ekleme
export const postProductsToBasketThunk = createAsyncThunk("basket/products/addItem", async (product, { rejectWithValue }) => {
    try {
        const response = await axios.post(API_URL, product);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Ürün eklenirken hata oluştu.");
    }
});

export const basketSlice = createSlice({
    name: "basket",
    initialState: {
        basket: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(getProductsBasketThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductsBasketThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.basket = action.payload;
            })
            .addCase(getProductsBasketThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteProductsFromBasketThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProductsFromBasketThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.basket = state.basket.filter((item) => item._id !== action.payload);
            })
            .addCase(deleteProductsFromBasketThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(postProductsToBasketThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(postProductsToBasketThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.basket.push(action.payload);
            })
            .addCase(postProductsToBasketThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
});

export default basketSlice.reducer;
