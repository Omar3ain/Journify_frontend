import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import Toast from 'react-native-toast-message';



const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isRegisterSuccess: false,
    isLoading: false,
    message: "",
};

export const login = createAsyncThunk("/login", async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message = error.response.data.error
        return thunkAPI.rejectWithValue(message);
    }
});

export const register = createAsyncThunk("/register", async (user, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (error) {
        let message = "";
        const data = error.response.data;
        if (Object.keys(data).length > 0) {
            for (const field in data) {
              const errorMessages = data[field];
              for (const errorMessage of errorMessages) {
                message += `${errorMessage}`;
              }
            }
        }
        else {
            message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString();
        }
        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk("/logout", async () => {
    await authService.logout();
});

export const updateUserInfo = createAsyncThunk("/updateUserInfo", async (user, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const id = thunkAPI.getState().auth.user.id;
        return await authService.updateUserInfo(user, token, id);
    } catch (error) {
        let message = "";
        const data = error.response.data;
        if (Object.keys(data).length > 0) {
            for (const field in data) {
              const errorMessages = data[field];
              for (const errorMessage of errorMessages) {
                message += `${errorMessage}`;
              }
            }
        }
        else {
            message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString();
        }
        return thunkAPI.rejectWithValue(message);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.user = action.payload;
                Toast.show({
                    type: 'success',
                    text1: 'Login Status',
                    text2: 'Logged in successfully'
                });
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
                state.user = null;
                Toast.show({
                    type: 'error',
                    text1: 'Login Status',
                    text2: state.message
                });
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isRegisterSuccess = true;
                Toast.show({
                    type: 'success',
                    text1: 'Registration Status',
                    text2: 'Registered successfully'
                });
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.isRegisterSuccess = false;
                Toast.show({
                    type: 'error',
                    text1: 'Registration Status',
                    text2: state.message
                });
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(updateUserInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.user = { ...state.user, ...action.payload };
                Toast.show({
                    type: 'success',
                    text1: 'Update Status',
                    text2: 'Updated successfully'
                });
            })
            .addCase(updateUserInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                Toast.show({
                    type: 'error',
                    text1: 'Update Status',
                    text2: state.message
                });
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;