import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import Toast from "react-native-toast-message";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isRegisterSuccess: false,
  isLoading: false,
  message: "",
  isLoggedIn: false,
};

export const login = createAsyncThunk("/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message = error.response.data.error;
    return thunkAPI.rejectWithValue(message);
  }
});

export const loginOAuth = createAsyncThunk(
  "/loginOAuth",
  async (token, thunkAPI) => {
    try {
      return await authService.loginOAuth(token);
    } catch (error) {
      const message = error.response.data.error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  "/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
        let message = "";
        const data = error.response.data;
        if (Object.keys(data).length > 0) {
            for (const key in data) {
                const value = data[key];
                message += `${key}: ${value} `;
            }
        }
        else {
            message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString();
        }
        return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("/logout", async () => {
  await authService.logout();
});

export const updateUserInfo = createAsyncThunk(
  "/updateUserInfo",
  async (user, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const id = thunkAPI.getState().auth.user.user.id;
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
      } else {
        message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "/updatePassword",
  async (user, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const id = thunkAPI.getState().auth.user.user.id;
      return await authService.updatePassword(user, token, id);
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
      } else {
        message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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
        state.isLoggedIn = true;
        Toast.show({
          type: "success",
          text1: "Login Status",
          text2: "Logged in successfully",
        });
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isLoggedIn = false;
        state.message = action.payload;
        state.user = null;
        Toast.show({
          type: "error",
          text1: "Login Status",
          text2: state.message,
        });
      })
      .addCase(loginOAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginOAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        Toast.show({
          type: "success",
          text1: "Login Status",
          text2: "Logged in successfully",
        });
      })
      .addCase(loginOAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isLoggedIn = false;
        state.message = action.payload;
        state.user = null;
        Toast.show({
          type: "error",
          text1: "Login Status",
          text2: state.message,
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
          type: "success",
          text1: "Registration Status",
          text2: "Registered successfully",
        });
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isRegisterSuccess = false;
        Toast.show({
          type: "error",
          text1: "Registration Status",
          text2: state.message,
        });
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = { token: state.user.token, user: { ...action.payload } };
        Toast.show({
          type: "success",
          text1: "Update Status",
          text2: "Updated successfully",
        });
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        Toast.show({
          type: "error",
          text1: "Update Status",
          text2: state.message,
        });
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        Toast.show({
          type: "success",
          text1: "Update Status",
          text2: "Password Updated successfully",
        });
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        Toast.show({
          type: "error",
          text1: "Update Status",
          text2: state.message,
        });
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
