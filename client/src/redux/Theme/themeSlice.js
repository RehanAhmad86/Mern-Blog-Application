import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    theme:  "light",
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        themeReducer: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light'
        }
    }
})

export const { themeReducer } = themeSlice.actions
export default themeSlice.reducer