import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductsAdminPanelThunk = createAsyncThunk("adminpanel/getProduts", async () => {
    const response = await axios.get("http://localhost:5500/products")
    return response.data
})


export const deleteItemFromAdminPanelThunk = createAsyncThunk("adminPanel/DeleteItem", async (id) => {
    const response = await axios.delete(`http://localhost:5500/products/${id}`)
    return id
})

export const addToPageFromAdminThunk = createAsyncThunk("adminPanel/",  async (data) => {
    const response = await axios.post("http://localhost:5500/products", data)
    return data
})

export const getUsersAdminThunk = createAsyncThunk("users/getUsers", async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:5500/userAdmin");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });
  
  // ✅ İstifadəçini sil (Admin üçün)
  export const deleteUserforAdminThunk = createAsyncThunk("users/deleteUser", async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5500/userAdmin/${userId}`);
      return userId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

  export const getOrdersAdminThunk = createAsyncThunk("orders/getAll", async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:5500/orders", { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });



export const createOrderThunk = createAsyncThunk(
  "orders/create",
  async (orderData, { rejectWithValue }) => {
      console.log(orderData);
    try {
      const response = await axios.post("http://localhost:5500/orders", orderData, {
        // withCredentials: true, // Əgər cookies lazımdırsa saxla, yoxsa sil
      });
      
      return response.data; // Düzgün məlumat qaytar
    } catch (error) {
      return rejectWithValue(error.response?.data || "Server error");
    }
  }
);


export const adminSlice = createSlice({
    name:"admin",
    initialState:{
        admin:[]
    },
    reducer:[],
    extraReducers:builder =>
        builder


    //get  products

    .addCase(getProductsAdminPanelThunk.fulfilled, (state, action) => {
        state.loading = false
        state.admin = action.payload
    })
    .addCase(getProductsAdminPanelThunk.pending, (state) => {
        state.loading = true
    })
    .addCase(getProductsAdminPanelThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
    })



    //add products
    .addCase(addToPageFromAdminThunk.fulfilled, (state, action) => {
        state.loading = false
        // state.admin = action.payload
    })
    .addCase(addToPageFromAdminThunk.pending, (state) => {
        state.loading = true
    })
    .addCase(addToPageFromAdminThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
    })


    //delete products
    .addCase(deleteItemFromAdminPanelThunk.fulfilled, (state, action) => {
        state.loading = false
        state.admin = state.admin.filter(item => item._id !== action.payload)
    })
    .addCase(deleteItemFromAdminPanelThunk.pending, (state) => {
        state.loading = true
    })
    .addCase(deleteItemFromAdminPanelThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
    })

    //get users admin
    .addCase(getUsersAdminThunk.fulfilled, (state, action) => {
        state.loading = false
        state.admin = action.payload
    })
    .addCase(getUsersAdminThunk.pending, (state) => {
        state.loading = true
    })
    .addCase(getUsersAdminThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
    })


    //delete users width admin
    .addCase(deleteUserforAdminThunk.fulfilled, (state, action) => {
        state.loading = false
        state.admin = state.admin.filter(item => item._id !== action.payload)
    })
    .addCase(deleteUserforAdminThunk.pending, (state) => {
        state.loading = true
    })
    .addCase(deleteUserforAdminThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
    })


    //get orders
    .addCase(getOrdersAdminThunk.fulfilled, (state, action) => {
        state.loading = false
        state.admin = action.payload
    })
    .addCase(getOrdersAdminThunk.pending, (state) => {
        state.loading = true
    })
    .addCase(getOrdersAdminThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
    })


    //create order
    .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.loading = false
        // state.admin = action.payload
    })
    .addCase(createOrderThunk.pending, (state) => {
        state.loading = true
    })
    .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
    })
})

export default  adminSlice.reducer