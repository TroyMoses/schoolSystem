import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gradesList: [],
    loading: false,
    error: null,
    response: null,
};

const gradeSlice = createSlice({
    name: 'grade',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.gradesList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError
} = gradeSlice.actions;

export const gradeReducer = gradeSlice.reducer;