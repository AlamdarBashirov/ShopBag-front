import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductsHomeThunk = createAsyncThunk("home/popularProducts", async () => {
    const response = await axios.get("http://localhost:5500/products")
    return response.data
})

export const postProductsToBasketThunk = createAsyncThunk(
    "home/products/sendBasket",
    async (data) => {
      try {
        // Sepetteki ürünleri al
        const res = await axios.get("http://localhost:5500/basket");
        const currentProduct = res.data.find(item => item._id === data._id);
  
        if (currentProduct) {
  
          // Sadece 1 artış miktarını gönder
          await axios.put(`http://localhost:5500/basket/${currentProduct._id}`, {
            count: 1, // Artış miktarını 1 gönderiyoruz
          });
        } else {
          // Ürün yoksa yeni ürün ekle
          await axios.post("http://localhost:5500/basket", {
            ...data,
            count: 1, // Yeni ürün eklerken count: 1
          });
        }
      } catch (error) {
        console.error("Hata oluştu:", error);
      }
    }
  );
  
  



export const productSlice = createSlice({
    name:"products",
    initialState:{
        products:[],
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

    //post basket
    .addCase(postProductsToBasketThunk.fulfilled, (state, action) => {
        state.loading = false
    })
    .addCase(postProductsToBasketThunk.pending, (state) => {
        state.loading = true
    })
    .addCase(postProductsToBasketThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
    })
})

export default productSlice.reducer