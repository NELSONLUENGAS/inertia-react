/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthState, Credentials } from '@/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../config/axios';

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

// Thunk para login
export const login = createAsyncThunk(
    'auth/login',
    async (credentials: Credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/login', credentials);
            return response.data.user;
        } catch (error: any) {
            return rejectWithValue(
                error.response.data.message || 'Login failed',
            );
        }
    },
);

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                login.fulfilled,
                (state, action: PayloadAction<AuthState['user']>) => {
                    state.loading = false;
                    state.user = action.payload;
                },
            )
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
