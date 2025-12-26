import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    status: boolean;
    userData: any;
}

const initialState: AuthState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }

    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;