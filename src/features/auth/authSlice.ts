import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authService } from "./authService"
export interface AuthState {
    user: any
    isLoggedIn: boolean
    status: 'success' | 'error' | ''
    isSuccess: boolean
    isLoading: boolean
    isError: boolean
    message: string | unknown
}

const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
    status: '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const checkIfUserCurrentlyLoggedIn = createAsyncThunk('auth/check', async (_, thunkAPI) => {
    try {
        return await authService.checkIfUserCurrentlyLoggedIn()
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const logInWithDemoAccount = createAsyncThunk('auth/logInDemo', async (_, thunkAPI) => {
    try {
        return await authService.logInWithDemoAccount()
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const logInWithGoogle = createAsyncThunk('auth/logInGoogle', async (_, thunkAPI) => {
    try {
        return await authService.logInWithGoogle()
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const logOutAll = createAsyncThunk('auth/logOut', async (_, thunkAPI) => {
    try {
        return await authService.logOutAll()
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
            authStateReset: (state) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = false
                state.message = ''
                state.status = ''
            }
        },
        extraReducers: (builder) => {
            builder
                // -------------------------------------------------------------------------
                .addCase(checkIfUserCurrentlyLoggedIn.fulfilled, (state, action) => {
                    state.user = action.payload
                    state.status = 'success'
                    state.isLoggedIn = true
                    state.isSuccess = true
                    state.isLoading = false
                })
                .addCase(checkIfUserCurrentlyLoggedIn.rejected, (state, action) => {
                    state.status = 'error'
                    state.isError = true
                    state.isLoading = false
                    state.message = action.payload
                })
                .addCase(checkIfUserCurrentlyLoggedIn.pending, (state) => {
                    state.isLoading = true
                })
                // -------------------------------------------------------------------------
                .addCase(logInWithDemoAccount.fulfilled, (state, action) => {
                    state.user = action.payload
                    state.status = 'success'
                    state.isLoggedIn = true
                    state.isSuccess = true
                    state.isLoading = false
                })
                .addCase(logInWithDemoAccount.rejected, (state, action) => {
                    state.status = 'error'
                    state.message = action.payload
                    state.isError = true
                    state.isLoading = false
                })
                .addCase(logInWithDemoAccount.pending, (state) => {
                    state.isLoading = true
                })
                // -------------------------------------------------------------------------
                .addCase(logInWithGoogle.fulfilled, (state, action) => {
                    state.user = action.payload
                    state.status = 'success'
                    state.isLoggedIn = true
                    state.isSuccess = true
                    state.isLoading = false
                })
                .addCase(logInWithGoogle.rejected, (state, action) => {
                    state.status = 'error'
                    state.message = action.payload
                    state.isError = true
                    state.isLoading = false
                })
                .addCase(logInWithGoogle.pending, (state) => {
                    state.isLoading = true
                })
                // -------------------------------------------------------------------------
                .addCase(logOutAll.fulfilled, (state) => {
                    state.user = null
                    state.status = 'success'
                    state.isLoggedIn = false
                    state.isLoading = false
                    state.isSuccess = true
                })
                .addCase(logOutAll.rejected, (state) => {
                    state.status = 'error'
                    state.isError = true
                    state.isLoading = false
                })
                .addCase(logOutAll.pending, (state) => {
                    state.isLoading = true
                })
        }
    }
)

export const { authStateReset } = authSlice.actions

export default authSlice.reducer
