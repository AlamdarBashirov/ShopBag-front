import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductsHomeThunk = createAsyncThunk("home/popularProducts", async () => {
  const response = await axios.get("http://localhost:5500/products")
  return response.data
})

export const postProductsToWishlistThunk = createAsyncThunk(
  "products/sendWishlist",
  async (data, { getState, rejectWithValue }) => {
    try {
      const userId = getState().profile.userId; 
      const token = getState().profile.token; // Redux-dan tokeni alırıq

      if (!userId || !token) {
        return rejectWithValue("User not authenticated.");
      }

      const response = await axios.post(
        "http://localhost:5500/wishlist",
        { ...data, userId },
        { headers: { Authorization: `Bearer ${token}` } } // Tokeni göndəririk
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Bir hata oluştu.");
    }
  }
);


export const postProductsToBasketThunk = createAsyncThunk(
  "home/products/sendBasket",
  async (data) => {
    try {
      const res = await axios.get("http://localhost:5500/basket");
      const currentProduct = res.data.find(item => item._id === data._id);

      if (currentProduct) {
        // Eğer ürün zaten sepette varsa, `PUT` ile count değerini güncelle
        await axios.put(`http://localhost:5500/basket/${currentProduct._id}`, {
          count: data.count,  // 1 veya -1 değerini gönderiyoruz
        });
      } else {
        // Ürün sepette yoksa yeni ekle
        await axios.post("http://localhost:5500/basket", {
          ...data,
          count: 1,
        });
      }
    } catch (error) {
      console.error("Hata oluştu:", error);
    }
  }
);

// export const postProductsToBasketThunk = createAsyncThunk(
//   "home/products/sendBasket",
//   async (data, { getState }) => {
//     try {
//       const token = getState().profile.token; // Tokeni Redux store-dan alırıq

//       if (!token) {
//         console.error("İstifadəçi daxil olmadan səbətə məhsul əlavə edilə bilməz.");
//         return;
//       }

//       // Sepetteki ürünleri al
//       const res = await axios.get("http://localhost:5500/basket");
//       const currentProduct = res.data.find(item => item._id === data._id);

//       if (currentProduct) {
//         // Eğer ürün zaten sepette varsa, `PUT` ile count değerini güncelle
//         await axios.put(`http://localhost:5500/basket/${currentProduct._id}`, {
//           count: currentProduct.count + data.count,  // count değerini artırıyoruz veya azaltıyoruz
//         }, {
//           headers: {
//             Authorization: `Bearer ${token}`, // Tokeni əlavə edirik
//           },
//         });
//       } else {
//         // Ürün sepette yoksa yeni ekle
//         await axios.post("http://localhost:5500/basket", {
//           ...data,
//           count: 1,
//         }, {
//           headers: {
//             Authorization: `Bearer ${token}`, // Tokeni əlavə edirik
//           },
//         });
//       }
//     } catch (error) {
//       console.error("Hata oluştu:", error);
//     }
//   }
// );





export const postProductsToBasketfromHomeThunk = createAsyncThunk(
  "home/products/sendBasket",
  async (data, { rejectWithValue }) => {
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
      // return rejectWithValue(error.response?.data?.message || "Ürün eklenirken hata oluştu.");
    }
  }

);




export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducer: [],
  extraReducers: builder =>
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

      //post wishlist
      .addCase(postProductsToWishlistThunk.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(postProductsToWishlistThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(postProductsToWishlistThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
})

export default productSlice.reducer