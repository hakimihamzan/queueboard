import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authService } from "./authService"

export interface AuthState {
    user: any
    isSignedIn: boolean
    isError: boolean
    isSuccess: boolean
    isLoading: boolean
    message: string | unknown
}


const initialState: AuthState = {
    user: null,
    isSignedIn: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const checkIfUserCurrentlySignedIn = createAsyncThunk('auth/check', async (userOut, thunkAPI) => {
    try {
        return await authService.checkIfUserCurrentlySignedIn()
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const signInWithDemoAccount = createAsyncThunk('auth/signInDemo', async (_, thunkAPI) => {
    try {
        return await authService.signInWithDemoAccount()
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const signOutAll = createAsyncThunk('auth/signOut', async (_, thunkAPI) => {
    try {
        return await authService.signOutAll()
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice(
    {
        name: 'auth',
        initialState,
        reducers: {
            reset: (state) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = false
                state.message = ''
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(checkIfUserCurrentlySignedIn.fulfilled, (state, action) => {
                    state.user = action.payload
                    state.isSignedIn = true
                    state.isSuccess = true
                    state.isLoading = false
                })
                .addCase(checkIfUserCurrentlySignedIn.rejected, (state, action) => {
                    state.isError = true
                    state.isLoading = false
                    state.message = action.payload
                })
                .addCase(checkIfUserCurrentlySignedIn.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(signInWithDemoAccount.fulfilled, (state, action) => {
                    state.user = action.payload
                    state.isSignedIn = true
                    state.isSuccess = true
                    state.isLoading = false
                })
                .addCase(signInWithDemoAccount.rejected, (state) => {
                    state.isError = true
                    state.isLoading = false
                })
                .addCase(signInWithDemoAccount.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(signOutAll.fulfilled, (state) => {
                    state.user = null
                    state.isSignedIn = false
                    state.isLoading = false
                    state.isSuccess = true
                })
                .addCase(signOutAll.rejected, (state) => {
                    state.isError = true
                    state.isLoading = false
                })
                .addCase(signOutAll.pending, (state) => {
                    state.isLoading = true
                })
        }
    }
)

export const { reset } = authSlice.actions

export default authSlice.reducer
