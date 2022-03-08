import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    pages: []
}

const authState = createSlice({
    name: 'authState',
    initialState,
    reducers: {
        setCurrUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.pages = action.payload.pages;
        },
        addPage: (state, action) => {
            state.pages.push(action.payload);
        },
        setPageContent: (state, action) => {
            state.pages[action.payload.index].content = action.payload.content;
        }
    }
});

export const {
    setCurrUser,
    addPage,
    setPageContent
} = authState.actions

export const selectAuthState = state => state.authState

export default authState.reducer