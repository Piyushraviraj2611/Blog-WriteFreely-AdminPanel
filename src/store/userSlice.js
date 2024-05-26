// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload.user;
        },
        deleteUser: (state) => {
            state.user = null;
            localStorage.clear("blogapp")
        },
        me: (state, action) => {
            const user = localStorage.getItem('blogapp');
            const obj = JSON.parse(user);
            console.log('user', user);
            state.user = obj?.user;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const { addUser, deleteUser, me, clearUser } = userSlice.actions;

export default userSlice.reducer;

