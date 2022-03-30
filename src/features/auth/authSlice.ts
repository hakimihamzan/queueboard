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

export const checkIfUserCurrentlySignedIn = createAsyncThunk('auth/check', async (_, thunkAPI) => {
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

export const signInWithGoogle = createAsyncThunk('auth/signInGoogle', async (_, thunkAPI) => {
    try {
        return await authService.signInWithGoogle()
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
                .addCase(checkIfUserCurrentlySignedIn.fulfilled, (state, action) => {
                    state.user = action.payload
                    state.status = 'success'
                    state.isLoggedIn = true
                    state.isSuccess = true
                    state.isLoading = false
                })
                .addCase(checkIfUserCurrentlySignedIn.rejected, (state, action) => {
                    state.status = 'error'
                    state.isError = true
                    state.isLoading = false
                    state.message = action.payload
                })
                .addCase(checkIfUserCurrentlySignedIn.pending, (state) => {
                    state.isLoading = true
                })
                // -------------------------------------------------------------------------
                .addCase(signInWithDemoAccount.fulfilled, (state, action) => {
                    state.user = action.payload
                    state.status = 'success'
                    state.isLoggedIn = true
                    state.isSuccess = true
                    state.isLoading = false
                })
                .addCase(signInWithDemoAccount.rejected, (state, action) => {
                    state.status = 'error'
                    state.message = action.payload
                    state.isError = true
                    state.isLoading = false
                })
                .addCase(signInWithDemoAccount.pending, (state) => {
                    state.isLoading = true
                })
                // -------------------------------------------------------------------------
                .addCase(signInWithGoogle.fulfilled, (state, action) => {
                    state.user = action.payload
                    state.status = 'success'
                    state.isLoggedIn = true
                    state.isSuccess = true
                    state.isLoading = false
                })
                .addCase(signInWithGoogle.rejected, (state, action) => {
                    state.status = 'error'
                    state.message = action.payload
                    state.isError = true
                    state.isLoading = false
                })
                .addCase(signInWithGoogle.pending, (state) => {
                    state.isLoading = true
                })
                // -------------------------------------------------------------------------
                .addCase(signOutAll.fulfilled, (state) => {
                    state.user = null
                    state.status = 'success'
                    state.isLoggedIn = false
                    state.isLoading = false
                    state.isSuccess = true
                })
                .addCase(signOutAll.rejected, (state) => {
                    state.status = 'error'
                    state.isError = true
                    state.isLoading = false
                })
                .addCase(signOutAll.pending, (state) => {
                    state.isLoading = true
                })
        }
    }
)

export const { authStateReset } = authSlice.actions

export default authSlice.reducer
