        import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
        import axios from "axios";

        // Kullanıcı bilgilerini API'den çek
        export const fetchUserProfile = createAsyncThunk("profile/fetchUser", async (_, { rejectWithValue }) => {
            try {
                const response = await fetch("http://localhost:5500/users/getuser", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}` // Token ekleniyor
                    }
                });

                if (!response.ok) {
                    throw new Error("Yetkisiz giriş (401)");
                }

                return await response.json();
            } catch (error) {
                return rejectWithValue(error.message);
            }
        });


        export const logOutThunk = createAsyncThunk("user/logoutUser", async (_, { rejectWithValue }) => {
            try {
                await axios.post("http://localhost:5500/users/logout", {}, { withCredentials: true });

                // LocalStorage temizle
                localStorage.removeItem("user");

                return null; // Redux store'daki kullanıcıyı sıfırlıyoruz
            } catch (error) {
                return rejectWithValue(error.response.data);
            }
        });

        export const deleteAccountThunk = createAsyncThunk("profile/deleteAccount", async (id) => {
            const response = await axios.delete(`http://localhost:5500/users/${id}`, { withCredentials: true })

            localStorage.removeItem("user");
            return null
        })

        const profileSlice = createSlice({
            name: "profile",
            initialState: {
                // user: null, loading: false, error: null 
                profile: []
            },
            reducers: [],
            extraReducers: builder =>
                builder

                    //get profile infos
                    .addCase(fetchUserProfile.fulfilled, (state, action) => {
                        state.loading = false;
                        state.profile = action.payload;
                        state.isAdmin = action.payload.isAdmin; 
                    })
                    .addCase(fetchUserProfile.pending, (state) => {
                        state.loading = true;
                    })
                    .addCase(fetchUserProfile.rejected, (state, action) => {
                        state.loading = false;
                        state.error = action.error.message;
                    })

                    //log out
                    .addCase(logOutThunk.fulfilled, (state, action) => {
                        state.loading = false;
                        state.profile = action.payload;
                    })
                    .addCase(logOutThunk.pending, (state) => {
                        state.loading = true;
                    })
                    .addCase(logOutThunk.rejected, (state, action) => {
                        state.loading = false;
                        state.error = action.error.message;
                    })

                    //delete Account

                    .addCase(deleteAccountThunk.fulfilled, (state, action) => {
                        state.loading = false;
                        state.profile = state.profile.filter(item => item._id !== action.payload);
                    })
                    .addCase(deleteAccountThunk.pending, (state) => {
                        state.loading = true;
                    })
                    .addCase(deleteAccountThunk.rejected, (state, action) => {
                        state.loading = false;
                        state.error = action.error.message;
                    })
        });

        export default profileSlice.reducer;